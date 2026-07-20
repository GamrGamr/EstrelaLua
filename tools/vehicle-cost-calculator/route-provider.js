export const TOLL_STATES = Object.freeze({
  PROVIDER_ESTIMATE: "provider_estimate",
  CASH_ESTIMATE: "cash_estimate",
  PASS_ESTIMATE: "pass_estimate",
  MANUAL: "manual",
  MANUAL_OVERRIDE: "manual_override",
  DETECTED_NO_PRICE: "detected_no_price",
  NO_TOLLS: "no_tolls",
  UNKNOWN: "unknown",
  PROVIDER_UNAVAILABLE: "provider_unavailable",
});

export const TOLL_LABELS = Object.freeze({
  [TOLL_STATES.PROVIDER_ESTIMATE]: "Provider-estimated toll amount",
  [TOLL_STATES.CASH_ESTIMATE]: "Cash or card toll estimate",
  [TOLL_STATES.PASS_ESTIMATE]: "Toll-pass or transponder estimate",
  [TOLL_STATES.MANUAL]: "Manual toll amount",
  [TOLL_STATES.MANUAL_OVERRIDE]: "Manual override",
  [TOLL_STATES.DETECTED_NO_PRICE]: "Toll road detected but price unavailable",
  [TOLL_STATES.NO_TOLLS]: "No toll road detected",
  [TOLL_STATES.UNKNOWN]: "Toll status unknown",
  [TOLL_STATES.PROVIDER_UNAVAILABLE]: "Provider unavailable",
});

export class RouteProviderError extends Error {
  constructor(message, code = "provider_error", status = 0) {
    super(message);
    this.name = "RouteProviderError";
    this.code = code;
    this.status = status;
  }
}

export class RouteProvider {
  async calculateRoute() {
    throw new RouteProviderError("No online route provider is configured.", "not_configured");
  }

  async estimateTolls(request) {
    return this.calculateRoute(request);
  }

  supportsTolls() {
    return false;
  }

  getProviderName() {
    return "Manual mode";
  }
}

function validateLocation(value, field) {
  const text = String(value || "").trim();
  if (!text) throw new RouteProviderError(`${field} is required for online routing.`, "invalid_request");
  if (text.length > 300) throw new RouteProviderError(`${field} is too long.`, "invalid_request");
  return text;
}

function validateEndpoint(value) {
  let endpoint;
  try {
    endpoint = new URL(String(value || ""));
  } catch {
    throw new RouteProviderError("Enter a valid secure proxy URL in Settings.", "invalid_configuration");
  }
  if (endpoint.protocol !== "https:" || endpoint.username || endpoint.password) {
    throw new RouteProviderError("The route proxy must use a credential-free HTTPS URL.", "invalid_configuration");
  }
  return endpoint.href;
}

function normaliseToll(toll = {}) {
  const state = Object.values(TOLL_STATES).includes(toll.state) ? toll.state : TOLL_STATES.UNKNOWN;
  const amount = Number(toll.amount);
  return {
    state,
    label: TOLL_LABELS[state],
    amount: Number.isFinite(amount) && amount >= 0 ? amount : null,
    currency: String(toll.currency || "").toUpperCase().slice(0, 3),
    cashAmount: Number.isFinite(Number(toll.cashAmount)) ? Number(toll.cashAmount) : null,
    passAmount: Number.isFinite(Number(toll.passAmount)) ? Number(toll.passAmount) : null,
    warnings: Array.isArray(toll.warnings) ? toll.warnings.map(String) : [],
  };
}

function normaliseRoute(route, index) {
  const distanceKm = Number(route.distanceKm);
  const durationSeconds = Number(route.durationSeconds);
  if (!(distanceKm > 0) || !(durationSeconds >= 0)) throw new RouteProviderError("The provider returned an incomplete route.", "invalid_response");
  return {
    id: String(route.id || `route-${index + 1}`),
    name: String(route.name || (index ? `Alternative ${index + 1}` : "Recommended route")),
    distanceKm,
    durationSeconds,
    toll: normaliseToll(route.toll),
    notices: Array.isArray(route.notices) ? route.notices.map(String) : [],
  };
}

export class ProxyRouteProvider extends RouteProvider {
  constructor(endpoint, { fetchImpl = globalThis.fetch, timeoutMs = 15000 } = {}) {
    super();
    this.endpoint = validateEndpoint(endpoint);
    this.fetchImpl = fetchImpl;
    this.timeoutMs = timeoutMs;
  }

  supportsTolls() {
    return true;
  }

  getProviderName() {
    return "HERE Routing API v8 via secure proxy";
  }

  async calculateRoute(request = {}) {
    const payload = {
      origin: validateLocation(request.origin, "Origin"),
      destination: validateLocation(request.destination, "Destination"),
      stops: (Array.isArray(request.stops) ? request.stops : []).map((stop) => validateLocation(stop, "Stop")).slice(0, 10),
      travelMode: "car",
      avoidTolls: Boolean(request.avoidTolls),
      alternatives: Boolean(request.alternatives),
      currency: String(request.currency || "EUR").toUpperCase().slice(0, 3),
      tollPreference: ["standard", "transponder", "compare"].includes(request.tollPreference) ? request.tollPreference : "standard",
      vehicle: {
        category: String(request.vehicle?.category || "passenger-car"),
        energyType: String(request.vehicle?.energyType || "petrol"),
        emissionsCategory: String(request.vehicle?.emissionsCategory || ""),
        registrationCountry: String(request.vehicle?.registrationCountry || ""),
        axleCount: Number(request.vehicle?.axleCount) || 2,
        tollPasses: Array.isArray(request.vehicle?.tollPasses) ? request.vehicle.tollPasses.map(String).slice(0, 10) : [],
      },
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
    let response;
    try {
      response = await this.fetchImpl(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-VCC-Client": "1" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } catch (error) {
      if (error?.name === "AbortError") throw new RouteProviderError("The route provider timed out. Your entries were kept; continue in manual mode or try again.", "timeout");
      throw new RouteProviderError("The route provider is unavailable. Your entries were kept; continue in manual mode.", globalThis.navigator?.onLine === false ? "offline" : "unavailable");
    } finally {
      clearTimeout(timeout);
    }

    let data;
    try {
      data = await response.json();
    } catch {
      throw new RouteProviderError("The route provider returned an unreadable response.", "invalid_response", response.status);
    }
    if (!response.ok) {
      const knownMessages = {
        400: "The route request was incomplete or unsupported.",
        401: "The secure proxy is not configured correctly.",
        403: "This website is not allowed to use the configured route proxy.",
        429: "The routing quota or rate limit was reached. Continue in manual mode and try again later.",
      };
      throw new RouteProviderError(data?.message || knownMessages[response.status] || "The route provider could not calculate this route.", data?.code || "provider_error", response.status);
    }

    if (!Array.isArray(data.routes) || !data.routes.length) throw new RouteProviderError("No supported driving route was found. Enter the distance manually.", "no_route");
    return {
      provider: String(data.provider || this.getProviderName()),
      routes: data.routes.map(normaliseRoute),
      warnings: Array.isArray(data.warnings) ? data.warnings.map(String) : [],
      requestedAt: data.requestedAt || new Date().toISOString(),
      cached: false,
    };
  }

  async calculateJourneyRoutes(request = {}) {
    const outbound = await this.calculateRoute(request);
    let inbound = null;
    if (Number(request.tripMultiplier) === 2) {
      inbound = await this.calculateRoute({
        ...request,
        origin: request.destination,
        destination: request.origin,
        stops: [...(request.stops || [])].reverse(),
      });
    }
    return { outbound, inbound };
  }
}

export class MockRouteProvider extends RouteProvider {
  constructor(result, shouldFail = false) {
    super();
    this.result = result;
    this.shouldFail = shouldFail;
  }

  supportsTolls() { return true; }
  getProviderName() { return "Mock provider"; }
  async calculateRoute() {
    if (this.shouldFail) throw new RouteProviderError("Mock provider failure.", "mock_failure");
    return structuredClone(this.result);
  }
}
