const DATABASE_VERSION = 1;
export const DATABASE_NAME = "estrela-lua-vehicle-cost-calculator";
export const BACKUP_VERSION = 1;
export const STORE_NAMES = ["vehicles", "fillups", "journeys", "routeCache", "fuelPrices"];

export class StorageError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "StorageError";
    this.cause = cause;
  }
}

function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new StorageError("Browser storage operation failed.", request.error));
  });
}

function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(new StorageError("Browser storage transaction failed.", transaction.error));
    transaction.onabort = () => reject(new StorageError("Browser storage transaction was cancelled.", transaction.error));
  });
}

export class CalculatorStorage {
  constructor(databaseName = DATABASE_NAME, settingsPrefix = "vcc:") {
    this.databaseName = databaseName;
    this.settingsPrefix = settingsPrefix;
    this.database = null;
  }

  async open() {
    if (this.database) return this.database;
    if (!("indexedDB" in globalThis)) throw new StorageError("IndexedDB is not available in this browser.");
    const request = indexedDB.open(this.databaseName, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      STORE_NAMES.forEach((name) => {
        if (!database.objectStoreNames.contains(name)) database.createObjectStore(name, { keyPath: "id" });
      });
    };
    this.database = await requestResult(request);
    this.database.onversionchange = () => {
      this.database.close();
      this.database = null;
    };
    return this.database;
  }

  async put(storeName, value) {
    if (!STORE_NAMES.includes(storeName)) throw new StorageError(`Unsupported store: ${storeName}`);
    if (!value?.id) throw new StorageError(`An id is required for ${storeName}.`);
    const database = await this.open();
    const transaction = database.transaction(storeName, "readwrite");
    transaction.objectStore(storeName).put(structuredClone(value));
    await transactionDone(transaction);
    return structuredClone(value);
  }

  async get(storeName, id) {
    const database = await this.open();
    const transaction = database.transaction(storeName, "readonly");
    return requestResult(transaction.objectStore(storeName).get(id));
  }

  async getAll(storeName) {
    const database = await this.open();
    const transaction = database.transaction(storeName, "readonly");
    return requestResult(transaction.objectStore(storeName).getAll());
  }

  async remove(storeName, id) {
    const database = await this.open();
    const transaction = database.transaction(storeName, "readwrite");
    transaction.objectStore(storeName).delete(id);
    await transactionDone(transaction);
  }

  async clearStore(storeName) {
    const database = await this.open();
    const transaction = database.transaction(storeName, "readwrite");
    transaction.objectStore(storeName).clear();
    await transactionDone(transaction);
  }

  async clearRouteCache() {
    await this.clearStore("routeCache");
  }

  async getRouteCache(id) {
    const entry = await this.get("routeCache", id);
    if (!entry) return null;
    if (Number(entry.expiresAt) <= Date.now()) {
      await this.remove("routeCache", id);
      return null;
    }
    return entry;
  }

  async setRouteCache(id, value, ttlHours = 12) {
    const now = Date.now();
    return this.put("routeCache", {
      id,
      ...structuredClone(value),
      createdAt: now,
      expiresAt: now + Math.max(1, Number(ttlHours) || 12) * 60 * 60 * 1000,
    });
  }

  getSetting(key, fallback = null) {
    try {
      const value = localStorage.getItem(`${this.settingsPrefix}${key}`);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  setSetting(key, value) {
    try {
      localStorage.setItem(`${this.settingsPrefix}${key}`, JSON.stringify(value));
    } catch (error) {
      throw new StorageError("This browser could not save the preference.", error);
    }
  }

  clearSettings() {
    try {
      Object.keys(localStorage).filter((key) => key.startsWith(this.settingsPrefix)).forEach((key) => localStorage.removeItem(key));
    } catch {
      // IndexedDB data can still be cleared even when localStorage is unavailable.
    }
  }

  async exportAll() {
    const data = {};
    for (const storeName of STORE_NAMES) data[storeName] = await this.getAll(storeName);
    return {
      application: "Vehicle Cost Calculator",
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      data,
      settings: {
        currency: this.getSetting("currency", "EUR"),
        theme: this.getSetting("theme", "light"),
        routeCacheHours: this.getSetting("routeCacheHours", 12),
        providerEndpoint: this.getSetting("providerEndpoint", ""),
      },
    };
  }

  validateBackup(backup) {
    if (!backup || typeof backup !== "object" || Array.isArray(backup)) throw new StorageError("The backup is not a valid JSON object.");
    if (backup.application !== "Vehicle Cost Calculator") throw new StorageError("This file is not a Vehicle Cost Calculator backup.");
    if (backup.version !== BACKUP_VERSION) throw new StorageError(`Backup version ${backup.version ?? "unknown"} is not supported.`);
    if (!backup.data || typeof backup.data !== "object") throw new StorageError("The backup does not contain calculator data.");
    STORE_NAMES.forEach((name) => {
      if (!Array.isArray(backup.data[name] || [])) throw new StorageError(`The ${name} collection is invalid.`);
      (backup.data[name] || []).forEach((item) => {
        if (!item || typeof item !== "object" || Array.isArray(item) || typeof item.id !== "string" || item.id.length > 200) {
          throw new StorageError(`The ${name} collection contains an invalid record.`);
        }
      });
    });
    return {
      version: backup.version,
      exportedAt: backup.exportedAt || "Unknown",
      vehicles: (backup.data.vehicles || []).length,
      fillups: (backup.data.fillups || []).length,
      journeys: (backup.data.journeys || []).length,
    };
  }

  async importAll(backup, mode = "merge") {
    this.validateBackup(backup);
    if (!['merge', 'replace'].includes(mode)) throw new StorageError("Choose merge or replace before importing.");
    const database = await this.open();
    const transaction = database.transaction(STORE_NAMES, "readwrite");
    if (mode === "replace") STORE_NAMES.forEach((name) => transaction.objectStore(name).clear());
    STORE_NAMES.forEach((name) => {
      (backup.data[name] || []).forEach((item) => transaction.objectStore(name).put(structuredClone(item)));
    });
    await transactionDone(transaction);
    if (backup.settings && typeof backup.settings === "object") {
      Object.entries(backup.settings).forEach(([key, value]) => this.setSetting(key, value));
    }
  }

  async deleteAll() {
    if (this.database) {
      this.database.close();
      this.database = null;
    }
    await new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(this.databaseName);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new StorageError("The calculator database could not be deleted.", request.error));
      request.onblocked = () => reject(new StorageError("Close other calculator tabs and try deleting again."));
    });
    this.clearSettings();
  }
}

export function normaliseRouteCacheKey(request, providerName = "manual") {
  const stable = {
    provider: providerName,
    origin: String(request.origin || "").trim().toLowerCase(),
    destination: String(request.destination || "").trim().toLowerCase(),
    stops: (request.stops || []).map((item) => String(item).trim().toLowerCase()).filter(Boolean),
    avoidTolls: Boolean(request.avoidTolls),
    tollPreference: request.tollPreference || "standard",
    currency: request.currency || "EUR",
    alternatives: Boolean(request.alternatives),
  };
  let hash = 2166136261;
  for (const character of JSON.stringify(stable)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `route-${(hash >>> 0).toString(36)}`;
}
