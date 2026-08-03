import { bearingDegrees, compassDirection, destinations, districts, estimateTrip, findCandidates, formatDuration, haversineKm, localizeSourceUrl, pickDestination, starts, stopMapQueries } from "./engine.js?v=10";

const results = [];
const assert = (condition, message = "Assertion failed") => { if (!condition) throw new Error(message); };
const test = (name, run) => { try { run(); results.push({ name, passed: true }); } catch (error) { results.push({ name, passed: false, error: error.message }); } };
const lisbon = starts.find((start) => start.id === "lisbon");
const porto = starts.find((start) => start.id === "porto");

test("All 18 mainland districts are available", () => assert(districts.length === 18, districts.length));
test("Every starting locality belongs to a known district", () => assert(starts.every((start) => districts.some((district) => district.id === start.districtId))));
test("Santarém includes Torres Novas and detailed locality choices", () => { const localities = starts.filter((start) => start.districtId === "santarem"); assert(localities.length >= 10); assert(localities.some((start) => start.id === "torres-novas")); });
test("Expanded destination collection has at least 60 options", () => assert(destinations.length >= 60, destinations.length));
test("Every destination has bilingual content and a source", () => assert(destinations.every((item) => item.source && item.copy?.en && item.copy?.pt && item.stops?.en?.length === 3 && item.stops?.pt?.length === 3)));
test("Every mini-plan stop has a curated map target", () => assert(destinations.every((item) => stopMapQueries[item.id]?.length === 3 && stopMapQueries[item.id].every(Boolean))));
test("Portinho da Arrábida uses its exact place target", () => assert(stopMapQueries.arrabida[2] === "Portinho da Arrábida"));
test("Destination sources include official, independent, and community ideas", () => { const types = new Set(destinations.map((item) => item.sourceType ?? "official")); assert(["official", "independent", "community"].every((type) => types.has(type))); });
test("Visit Portugal source links use the correct Portuguese locale", () => { const source = "https://www.visitportugal.com/en/node/135553"; assert(localizeSourceUrl(source, "pt") === "https://www.visitportugal.com/pt-pt/node/135553"); assert(localizeSourceUrl(source, "en") === source); });
test("Destination-specific Portuguese source links are supported", () => { const source = destinations.find((item) => item.id === "arrabida").source; assert(localizeSourceUrl(source, "pt", "arrabida") === "https://www.visitportugal.com/pt-pt/content/serra-da-arrabida-e-estuario-do-sado"); });
test("Bilingual source objects select an exact language page", () => { const source = destinations.find((item) => item.id === "monsanto").source; assert(localizeSourceUrl(source, "pt") === "https://www.visitportugal.com/pt-pt/regioes-e-localidades/monsanto"); });
test("Lisbon to Porto straight-line distance is plausible", () => { const distance = haversineKm(lisbon, porto); assert(distance > 260 && distance < 290, distance); });
test("Porto is north of Lisbon", () => assert(compassDirection(bearingDegrees(lisbon, porto)) === "N"));
test("Trip estimates exceed straight-line distance", () => assert(estimateTrip(lisbon, porto).distanceKm > haversineKm(lisbon, porto)));
test("Trip duration is positive", () => assert(estimateTrip(lisbon, porto).durationMinutes > 0));
test("English duration is formatted", () => assert(formatDuration(135, "en") === "2h 15"));
test("Portuguese duration is formatted", () => assert(formatDuration(60, "pt") === "1h"));
test("History filter returns matching destinations", () => assert(findCandidates({ origin: lisbon, maxDistance: 180, vibe: "history" }).every((item) => item.vibes.includes("history"))));
test("Random picker honours deterministic random", () => { const result = pickDestination({ origin: lisbon, maxDistance: 180, random: () => 0 }); assert(Boolean(result?.id)); });
test("Excluded destination is avoided when alternatives exist", () => { const first = pickDestination({ origin: lisbon, maxDistance: 180, random: () => 0 }); const second = pickDestination({ origin: lisbon, maxDistance: 180, excludeId: first.id, random: () => 0 }); assert(first.id !== second.id); });

const passed = results.filter((result) => result.passed).length;
document.querySelector("#test-count").textContent = `${results.length} tests`;
document.querySelector("#passed-count").textContent = `${passed} passed`;
document.querySelector("#failed-count").textContent = `${results.length - passed} failed`;
document.querySelector("#test-results").innerHTML = results.map((result) => `<li class="${result.passed ? "pass" : "fail"}"><strong>${result.passed ? "PASS" : "FAIL"}</strong> ${result.name}${result.error ? `<small>${result.error}</small>` : ""}</li>`).join("");
