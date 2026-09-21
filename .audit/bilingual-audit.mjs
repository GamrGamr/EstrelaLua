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

const webapps = ["home-energy-calculator", "road-trip-roulette", "map-link-switcher", "gta-online-timers", "vehicle-cost-calculator", "partilha-justa", "media-inspector", "training-atlas"];
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

const trainingAtlasHtml = readFileSync(join(root, "tools", "training-atlas", "index.html"), "utf8");
const trainingAtlasScript = readFileSync(join(root, "tools", "training-atlas", "training-atlas.js"), "utf8");
const trainingAtlasKeys = [...trainingAtlasHtml.matchAll(/data-i18n(?:-[a-z-]+)?="([^"]+)"/g)].map((match) => match[1]);
const trainingAtlasTranslationBlocks = trainingAtlasScript.match(/const translations = \{\s*en:\s*\{([\s\S]*?)\n\s*\},\s*pt:\s*\{([\s\S]*?)\n\s*\}\s*\};/);
const hasTrainingAtlasKey = (block, key) => new RegExp(`(?:^|[\\s,])${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:\\s*"`, "m").test(block);
check("Training Atlas is linked from both catalogues and its detail page", ["index.html", "apps.html"].every((name) => readFileSync(join(root, name), "utf8").includes("apps/training-atlas.html")) && existsSync(join(root, "apps", "training-atlas.html")));
check("Every Training Atlas interface key exists in Portuguese and English", Boolean(trainingAtlasTranslationBlocks) && trainingAtlasKeys.every((key) => hasTrainingAtlasKey(trainingAtlasTranslationBlocks[1], key) && hasTrainingAtlasKey(trainingAtlasTranslationBlocks[2], key)));
check("Training Atlas uses its dedicated supplied icon throughout", existsSync(join(root, "assets", "training-atlas-icon.ico")) && existsSync(join(root, "assets", "training-atlas-icon.png")) && ["index.html", "apps.html", "apps/training-atlas.html", "tools/training-atlas/index.html"].every((name) => readFileSync(join(root, name), "utf8").includes("training-atlas-icon.")));
check("Training Atlas remains local-only", !/https?:\/\//i.test(trainingAtlasHtml + trainingAtlasScript) && trainingAtlasScript.includes("indexedDB") && trainingAtlasScript.includes("localStorage"));
check("Training Atlas schedules workouts by week and day", trainingAtlasHtml.includes('id="calendar-view"') && trainingAtlasHtml.includes('id="week-days"') && trainingAtlasScript.includes("renderCalendar") && trainingAtlasScript.includes("sessionsForDate") && trainingAtlasScript.includes("completed"));
const scheduleSubmitBlock = trainingAtlasScript.match(/function handleScheduleSubmit\(event\) \{([\s\S]*?)\n\}/)?.[1] || "";
check("Scheduling preserves the current Training Atlas view", scheduleSubmitBlock.includes("scheduleDialog.close()") && !scheduleSubmitBlock.includes('activeView = "calendar"'));
check("A new Training Atlas workout can be scheduled immediately", trainingAtlasHtml.includes('name="scheduleEnabled"') && trainingAtlasHtml.includes('name="scheduleDate"') && trainingAtlasScript.includes('values.scheduleEnabled === "on"') && trainingAtlasScript.includes("workoutSavedAndScheduled"));
check("Every Training Atlas date field explains the displayed order", (trainingAtlasHtml.match(/type="date"/g) || []).length === (trainingAtlasHtml.match(/month\/day\/year/g) || []).length && trainingAtlasScript.includes('date: "Date (month/day/year)"') && trainingAtlasScript.includes('date: "Data (mês/dia/ano)"'));
check("Training Atlas calendar offers one combined scheduling planner", !trainingAtlasHtml.includes('data-action="new-session"') && trainingAtlasHtml.includes('id="planner-dialog"') && trainingAtlasHtml.includes('data-action="quick-plan"') && trainingAtlasScript.includes("handlePlannerSubmit") && trainingAtlasScript.includes("plannerExerciseDraft"));
check("Removing a planner-created calendar entry also removes its private library plan", trainingAtlasScript.includes("plannerCreatedWorkout") && trainingAtlasScript.includes("sessionRemovalScope") && trainingAtlasScript.includes("trashSessionAndOwnedPlan") && trainingAtlasScript.includes("confirmDeleteOwnedPlan"));
check("Training Atlas goals support automatic and manual progress", trainingAtlasHtml.includes('data-view="goals"') && trainingAtlasHtml.includes('id="goal-dialog"') && trainingAtlasScript.includes("syncGoalsWithSession") && trainingAtlasScript.includes("setGoalProgress") && trainingAtlasScript.includes("completedSessionIds"));
check("Clicking any filled Training Atlas goal circle removes only one", trainingAtlasScript.includes("clicked <= current ? current - 1 : clicked"));
check("Training Atlas goals are included in backups and recoverable trash", trainingAtlasScript.includes("goals: []") && trainingAtlasScript.includes('version: 7, exportedAt') && trainingAtlasScript.includes('addTrashItem("goal"') && trainingAtlasScript.includes('entry.type === "goal"') && trainingAtlasScript.includes("sanitiseGoal"));
check("Training Atlas has a simple bilingual progress profile", trainingAtlasHtml.includes('data-view="progress"') && trainingAtlasHtml.includes('id="progress-profile-dialog"') && trainingAtlasScript.includes("sanitiseProgressProfile") && trainingAtlasScript.includes("renderProgressProfile") && trainingAtlasScript.includes('progress: "Progress"') && trainingAtlasScript.includes('progress: "Progresso"'));
check("Training Atlas progress measurements are dated, custom, and recoverable", trainingAtlasHtml.includes('id="progress-metric-dialog"') && trainingAtlasHtml.includes('name="label"') && trainingAtlasHtml.includes('name="value"') && trainingAtlasHtml.includes('name="unit"') && trainingAtlasScript.includes("sanitiseProgressMetric") && trainingAtlasScript.includes('addTrashItem("progressMetric"') && trainingAtlasScript.includes('addTrashItem("progressEntry"') && trainingAtlasScript.includes('entry.type === "progressMetric"') && trainingAtlasScript.includes('entry.type === "progressEntry"'));
check("Training Atlas safely compares two backups and prompts for new measurements", trainingAtlasHtml.includes('id="compare-backup-before"') && trainingAtlasHtml.includes('id="compare-backup-after"') && trainingAtlasScript.includes("loadComparisonBackup") && trainingAtlasScript.includes("comparisonMeasurementFound") && trainingAtlasScript.includes("addToMyProgress") && trainingAtlasScript.includes("compareOnly") && trainingAtlasScript.includes("decideComparisonMetric") && !/progressComparison[\s\S]{0,300}importBackup/.test(trainingAtlasScript));
check("Training Atlas matches renamed or misspelled measurements without changing saved data", trainingAtlasScript.includes("matchComparisonMetrics") && trainingAtlasScript.includes("availableBeforeMatches") && trainingAtlasScript.includes("availableAfterMatches") && trainingAtlasScript.includes("comparisonMatchSafeCopy") && trainingAtlasScript.includes("unmatchComparisonMetric") && trainingAtlasScript.includes('comparisonAction: "Action"') && trainingAtlasScript.includes('comparisonAction: "Ação"'));
check("Training Atlas exercise details are custom for every sport", trainingAtlasHtml.includes('id="custom-detail-template"') && trainingAtlasHtml.includes('id="exercise-details"') && trainingAtlasHtml.includes("planner-custom-details") && !trainingAtlasHtml.includes('name="plannerSets"') && trainingAtlasScript.includes("readCustomDetails"));
check("Training Atlas preserves legacy fixed exercise details", trainingAtlasScript.includes("legacyExerciseDetails") && trainingAtlasScript.includes('["repetitions","reps"]') && trainingAtlasScript.includes("sanitiseDetail"));
check("Training Atlas has a reusable bilingual meal library", trainingAtlasHtml.includes('data-view="meals"') && trainingAtlasHtml.includes('id="meal-dialog"') && trainingAtlasScript.includes("sanitiseMeal") && trainingAtlasScript.includes("renderMeals") && trainingAtlasScript.includes('meals: "Meals"') && trainingAtlasScript.includes('meals: "Refeições"'));
check("Training Atlas navigation starts with Workouts, Meals, then Supplements", trainingAtlasHtml.includes('data-view="library"><svg class="ui-icon"') && trainingAtlasHtml.includes('data-view="library"><svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 8v8') && trainingAtlasHtml.includes('data-i18n="workouts">Workouts</span>') && trainingAtlasHtml.indexOf('data-view="library"') < trainingAtlasHtml.indexOf('data-view="meals"') && trainingAtlasHtml.indexOf('data-view="meals"') < trainingAtlasHtml.indexOf('data-view="supplements"') && trainingAtlasHtml.indexOf('data-view="supplements"') < trainingAtlasHtml.indexOf('data-view="calendar"') && trainingAtlasHtml.indexOf('data-view="calendar"') < trainingAtlasHtml.indexOf('data-view="goals"'));
check("Training Atlas meals integrate with the shared calendar", trainingAtlasHtml.includes('id="meal-schedule-dialog"') && trainingAtlasScript.includes("calendarItemsForDate") && trainingAtlasScript.includes("handleMealScheduleSubmit") && trainingAtlasScript.includes("toggle-meal-entry") && trainingAtlasScript.includes("mealEntriesForDate"));
check("Training Atlas meals and dates are recoverable from Trash", trainingAtlasScript.includes('addTrashItem("meal"') && trainingAtlasScript.includes('addTrashItem("mealEntry"') && trainingAtlasScript.includes('entry.type === "meal"') && trainingAtlasScript.includes('entry.type === "mealEntry"'));
check("Training Atlas has a reusable bilingual supplement library", trainingAtlasHtml.includes('data-view="supplements"') && trainingAtlasHtml.includes('id="supplement-dialog"') && trainingAtlasScript.includes("sanitiseSupplement") && trainingAtlasScript.includes("renderSupplements") && trainingAtlasScript.includes('supplements: "Supplements"') && trainingAtlasScript.includes('supplements: "Suplementos"'));
check("Training Atlas supplements integrate with the shared calendar", trainingAtlasHtml.includes('id="supplement-schedule-dialog"') && trainingAtlasScript.includes("supplementEntriesForDate") && trainingAtlasScript.includes("handleSupplementScheduleSubmit") && trainingAtlasScript.includes("toggle-supplement-entry") && trainingAtlasScript.includes('kind: "supplement"'));
check("Training Atlas supplements and dates are recoverable from Trash", trainingAtlasScript.includes('addTrashItem("supplement"') && trainingAtlasScript.includes('addTrashItem("supplementEntry"') && trainingAtlasScript.includes('entry.type === "supplement"') && trainingAtlasScript.includes('entry.type === "supplementEntry"'));
check("Training Atlas supports recurring workout, meal, and supplement schedules", trainingAtlasScript.includes("setupRecurrenceForm") && trainingAtlasScript.includes("recurrenceDates") && trainingAtlasScript.includes("addRecurringEntries") && trainingAtlasScript.includes('recurrenceDates(elements.scheduleForm,"date")') && trainingAtlasScript.includes('recurrenceDates(elements.mealScheduleForm,"date")') && trainingAtlasScript.includes('recurrenceDates(elements.supplementScheduleForm,"date")'));
check("Training Atlas supports daily, interval, and custom-weekday recurrence", trainingAtlasScript.includes('[["once","once"],["daily","daily"],["interval","everyXDays"],["weekdays","customDays"]]') && trainingAtlasScript.includes('name = "recurrenceWeekday"') && trainingAtlasScript.includes("end > addDays(start,366)") && trainingAtlasScript.includes("seriesId"));
check("Daily Training Atlas schedules support multiple entries per day", trainingAtlasScript.includes('dailyInput.name = "timesPerDay"') && trainingAtlasScript.includes('mode === "daily" ? timesPerDay : 1') && trainingAtlasScript.includes("completedCounts"));
check("New library items and the combined planner can use recurring schedules", trainingAtlasScript.includes('recurrenceDates(elements.workoutForm,"scheduleDate")') && trainingAtlasScript.includes('recurrenceDates(elements.mealForm,"scheduleDate")') && trainingAtlasScript.includes('recurrenceDates(elements.supplementForm,"scheduleDate")') && trainingAtlasScript.includes('recurrenceDates(form,"date")'));
check("Editing a recurring Training Atlas item replaces its unfinished series", trainingAtlasScript.includes("prepareRecurrenceEdit") && trainingAtlasScript.includes("replaceRecurringSeries") && trainingAtlasScript.includes("collection.filter((item) => !relatedIds.has(item.id))") && trainingAtlasScript.includes("recurrenceEditHint"));
check("Training Atlas supplement cards edit and consolidate active recurring schedules", trainingAtlasScript.includes("recurringSupplementSchedule") && trainingAtlasScript.includes("replaceSeriesIds") && trainingAtlasScript.includes("replaceSeriesIds.size > 1") && trainingAtlasScript.includes('t(currentSchedule ? "editRecurringSchedule" : "scheduleSupplement")'));
check("Recurring supplements can remove one day or this and all future days", trainingAtlasHtml.includes('id="supplement-remove-dialog"') && trainingAtlasHtml.includes('data-scope="day"') && trainingAtlasHtml.includes('data-scope="future"') && trainingAtlasScript.includes("openSupplementRemovalDialog") && trainingAtlasScript.includes("confirmSupplementRemoval") && trainingAtlasScript.includes("trashSupplementEntries"));
check("Training Atlas has dependency-aware recoverable trash", trainingAtlasHtml.includes('id="trash-dialog"') && trainingAtlasScript.includes("state.trash") && trainingAtlasScript.includes("restoreWithParents") && trainingAtlasScript.includes("restoreWorkoutById") && trainingAtlasScript.includes("cleanupOrphanMedia"));

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
