import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { destinations, originalSourceUrl } from "../tools/road-trip-roulette/engine.js";
import { timerRecords } from "../tools/gta-online-timers/timer-data.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const walk = (folder) => readdirSync(folder).flatMap((name) => {
  const full = join(folder, name);
  return statSync(full).isDirectory() && ![".git", ".agents", ".codex"].includes(name) ? walk(full) : [full];
});

const urls = new Set();
for (const file of walk(root).filter((file) => extname(file) === ".html")) {
  for (const match of readFileSync(file, "utf8").matchAll(/href=["'](https?:\/\/[^"']+)["']/g)) urls.add(match[1]);
}
for (const destination of destinations) urls.add(originalSourceUrl(destination.source));
for (const record of timerRecords) for (const source of record.sources) urls.add(source.url);

const list = [...urls].map((url) => url.split("#")[0]).filter(Boolean);
const results = [];
let cursor = 0;

async function request(url, method) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    return await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 EstrelaLuaApps link audit",
        ...(method === "GET" ? { Range: "bytes=0-1023" } : {}),
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function inspect(url) {
  try {
    let response = await request(url, "HEAD");
    if (!response.ok || [403, 405, 429].includes(response.status)) response = await request(url, "GET");
    return { url, ok: response.ok, status: response.status, finalUrl: response.url };
  } catch (error) {
    return { url, ok: false, status: 0, error: error.name === "AbortError" ? "timeout" : error.message };
  }
}

async function worker() {
  while (cursor < list.length) {
    const index = cursor++;
    results[index] = await inspect(list[index]);
    if ((index + 1) % 25 === 0) console.log(`Checked ${index + 1}/${list.length}`);
  }
}

await Promise.all(Array.from({ length: 6 }, worker));
const failed = results.filter((result) => !result.ok);
const blocked = failed.filter((result) => [401, 403, 429].includes(result.status));
const broken = failed.filter((result) => ![401, 403, 429].includes(result.status));

console.log(`\n${results.length} unique external URLs checked`);
console.log(`${results.length - failed.length} reachable, ${blocked.length} blocked/inconclusive, ${broken.length} broken or unavailable`);
for (const result of failed) console.log(`${result.status || "ERR"} ${result.url}${result.error ? ` — ${result.error}` : ""}`);
if (broken.length) process.exitCode = 1;
