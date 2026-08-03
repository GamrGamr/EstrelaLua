import { bearingDegrees, compassDirection, estimateTrip, findCandidates, formatDuration, haversineKm, pickDestination, starts } from "./engine.js?v=1";

const results = [];
const assert = (condition, message = "Assertion failed") => { if (!condition) throw new Error(message); };
const test = (name, run) => { try { run(); results.push({ name, passed: true }); } catch (error) { results.push({ name, passed: false, error: error.message }); } };
const lisbon = starts.find((start) => start.id === "lisbon");
const porto = starts.find((start) => start.id === "porto");

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
