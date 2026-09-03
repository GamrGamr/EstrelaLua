import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { calculateHomeEnergy } from "../tools/home-energy-calculator/calculations.js";
import { buildProviderUrl, parseLocation } from "../tools/map-link-switcher/parser.js";
import { calculateSplit } from "../tools/partilha-justa/partilha-justa-calculator.js";
import { buildDestinationGuide, sourceLanguage } from "../tools/road-trip-roulette/guide-data.js";
import { destinations, districts, findCandidates, googlePlaceUrl, starts, stopMapPoints, stopMapQueries } from "../tools/road-trip-roulette/engine.js";
import { timerRecords } from "../tools/gta-online-timers/timer-data.js";
import { timerTranslationsPt } from "../tools/gta-online-timers/timer-translations-pt.js";
import { translations as mediaInspectorTranslations } from "../tools/media-inspector/dist/translations.js";
import { buildJourneySummary, calculateJourney } from "../tools/vehicle-cost-calculator/calculations.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const results = [];
const check = (name, condition, detail = "") => results.push({ name, ok: Boolean(condition), detail });
const close = (actual, expected, tolerance = 1e-9) => Math.abs(actual - expected) <= tolerance;

const walk = (folder) => readdirSync(folder).flatMap((name) => {
  const full = join(folder, name);
  return statSync(full).isDirectory() && ![".git", ".agents", ".codex"].includes(name) ? walk(full) : [full];
});

const htmlFiles = walk(root).filter((file) => extname(file) === ".html");
const publicHtml = htmlFiles.filter((file) => !file.endsWith("tests.html"));
const localMissing = [];
for (const file of htmlFiles) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(/(?:href|src)=["']([^"'#?]+)(?:\?[^"']*)?["']/g)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|tel:|data:)/i.test(target)) continue;
    let resolved = resolve(dirname(file), target);
    if (target.endsWith("/") || (!extname(resolved) && existsSync(resolved) && statSync(resolved).isDirectory())) resolved = join(resolved, "index.html");
    if (!existsSync(resolved)) localMissing.push(`${relative(root, file)} -> ${target}`);
  }
}
check("All local HTML assets and links resolve", localMissing.length === 0, localMissing.join("; "));

const presentationPages = ["index.html", "apps.html", "legal.html", ...readdirSync(join(root, "apps")).filter((name) => name.endsWith(".html")).map((name) => `apps/${name}`)];
check("All presentation pages load the shared bilingual runtime", presentationPages.every((name) => readFileSync(join(root, name), "utf8").includes("site-i18n.js")));

const webapps = ["home-energy-calculator", "road-trip-roulette", "map-link-switcher", "gta-online-timers", "vehicle-cost-calculator", "partilha-justa", "media-inspector"];
check("Every public webapp exposes Portuguese and English controls", webapps.every((name) => {
  const html = readFileSync(join(root, "tools", name, "index.html"), "utf8");
  const toolRoot = join(root, "tools", name);
  const scriptFiles = readdirSync(toolRoot).filter((file) => file.endsWith(".js")).map((file) => join(toolRoot, file));
  const compiledApp = join(toolRoot, "dist", "app.js");
  if (existsSync(compiledApp)) scriptFiles.push(compiledApp);
  const scripts = scriptFiles.map((file) => readFileSync(file, "utf8")).join("\n");
  return html.includes("language-switch") && ((html.includes(">PT<") && html.includes(">EN<")) || scripts.includes("createLanguageSwitch"));
}));

const mediaInspectorHtml = readFileSync(join(root, "tools", "media-inspector", "index.html"), "utf8");
const mediaInspectorKeys = [...mediaInspectorHtml.matchAll(/data-i18n(?:-[a-z-]+)?="([^"]+)"/g)].map((match) => match[1]);
check("Every Media Inspector interface key exists in Portuguese and English", mediaInspectorKeys.every((key) => mediaInspectorTranslations.en[key] && mediaInspectorTranslations.pt[key]));
check("Media Inspector is linked from both catalogues and its detail page", ["index.html", "apps.html"].every((name) => readFileSync(join(root, name), "utf8").includes("apps/media-inspector.html")) && existsSync(join(root, "apps", "media-inspector.html")));
check("Media Inspector uses its dedicated icon throughout the site", ["index.html", "apps.html", "apps/media-inspector.html", "tools/media-inspector/index.html"].every((name) => readFileSync(join(root, name), "utf8").includes("media-inspector-icon.ico")) && existsSync(join(root, "assets", "media-inspector-icon.ico")));

const fairSharePages = ["index.html", "apps.html", "apps/partilha-justa.html", "tools/partilha-justa/index.html"];
check("Fair Share is the displayed English brand name everywhere", fairSharePages.every((name) => readFileSync(join(root, name), "utf8").includes("Fair Share")) && !publicHtml.some((file) => readFileSync(file, "utf8").includes("Partilha Justa")));

const split = calculateSplit(1000, 1500, [700, 60, 40, 40, 160]);
check("Fair split example is 40/60 and totals €1,000", split.shareA === 0.4 && split.shareB === 0.6 && split.proportional.paymentA === 400 && split.proportional.paymentB === 600 && split.totalExpenses === 1000);

const energy = calculateHomeEnergy({ pricePerKwh: "0.25", billingDays: "30", appliances: [{ name: "TV", watts: "100", quantity: "1", hoursPerDay: "4", daysPerMonth: "30" }] });
check("Home energy calculation remains correct", close(energy.monthlyKwh, 12) && close(energy.monthlyCost, 3));

const parsed = parseLocation("Castelo de Almourol, Portugal");
check("Map switcher preserves a named destination", parsed.query === "Castelo de Almourol, Portugal");
check("Map switcher builds Google and Waze links", new URL(buildProviderUrl("google", parsed)).searchParams.get("query") === parsed.query && new URL(buildProviderUrl("waze", parsed)).searchParams.get("q") === parsed.query);

const vehicleResult = calculateJourney({ oneWayDistance: 100, tripMultiplier: 1, passengerCount: 1, energyType: "petrol", fuelConsumption: 6, fuelPrice: 1.8, currency: "EUR" });
const enSummary = buildJourneySummary({ name: "Test", vehicleName: "Test car", consumptionSourceLabel: "Manual consumption" }, vehicleResult, "en");
const ptSummary = buildJourneySummary({ name: "Teste", vehicleName: "Carro de teste", consumptionSourceLabel: "Consumo manual" }, vehicleResult, "pt");
check("Vehicle calculation remains correct", close(vehicleResult.totalCost, 10.8));
check("Vehicle summaries include the energy price in both languages", enSummary.includes("Fuel price:") && ptSummary.includes("Preço do combustível:"));

check("GTA timer catalogue has 61 unique records", timerRecords.length === 61 && new Set(timerRecords.map(({ id }) => id)).size === 61);
check("Every GTA timer has a complete Portuguese translation", timerRecords.every(({ id }) => {
  const item = timerTranslationsPt[id];
  return item && ["activity", "trigger", "scopeLabel", "parallelLabel", "conditions"].every((key) => typeof item[key] === "string" && item[key].trim());
}));
check("Every GTA source uses HTTPS", timerRecords.every((record) => record.sources.every((source) => source.url.startsWith("https://"))));

check("Road catalogue covers all mainland districts", districts.length === 18 && districts.every((district) => starts.some((start) => start.districtId === district.id)));
check("Road catalogue retains broad origin and destination coverage", starts.length >= 280 && destinations.length >= 135);
check("Every origin has candidates in all distance bands", starts.every((origin) => [[0, 90], [90, 180], [180, 360]].every(([minDistance, maxDistance]) => findCandidates({ origin, minDistance, maxDistance }).length > 0)));
check("Every origin has candidates in all time bands", starts.every((origin) => [[0, 90], [90, 180], [180, 360]].every(([minDuration, maxDuration]) => findCandidates({ origin, minDuration, maxDuration }).length > 0)));
check("Every road destination has bilingual content and exact map anchors", destinations.every((item) => item.copy?.en && item.copy?.pt && item.stops?.en?.length === 3 && item.stops?.pt?.length === 3 && stopMapQueries[item.id]?.length === 3 && stopMapPoints[item.id]?.length === 3));
check("Every full guide item has a source and Google Maps query", destinations.every((destination) => buildDestinationGuide(destination, stopMapQueries[destination.id], stopMapPoints[destination.id]).full.every((item) => {
  const map = new URL(googlePlaceUrl(item.query, item.point, "pt"));
  return item.sourceUrl.startsWith("https://") && map.hostname === "www.google.com" && map.searchParams.get("query") === `${item.query}, Portugal`;
})));
check("Road source language badges are valid", destinations.every((item) => ["PT", "EN", "ORIGINAL"].includes(sourceLanguage(typeof item.source === "object" ? (item.source.original || item.source.pt || item.source.en || Object.values(item.source)[0]) : item.source))));

const failed = results.filter((result) => !result.ok);
for (const result of results) console.log(`${result.ok ? "PASS" : "FAIL"} — ${result.name}${result.detail ? `: ${result.detail}` : ""}`);
console.log(`\n${results.length - failed.length}/${results.length} audit checks passed`);
if (failed.length) process.exitCode = 1;
