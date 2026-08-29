import { buildProviderUrl, LocationParseError, parseLocation } from "./parser.js";

const tests = [];
const test = (name, run) => tests.push({ name, run });
const assert = (condition, message = "Assertion failed") => { if (!condition) throw new Error(message); };

test("Plain place name", () => {
  const location = parseLocation("Castelo de Almourol, Portugal");
  assert(location.query === "Castelo de Almourol, Portugal");
  assert(location.coordinates === null);
});

test("Raw coordinates", () => {
  const location = parseLocation("38.7223, -9.1393");
  assert(location.coordinates.text === "38.7223,-9.1393");
});

test("Google Maps search URL", () => {
  const location = parseLocation("https://www.google.com/maps/search/?api=1&query=Lisbon%20Oceanarium");
  assert(location.label === "Lisbon Oceanarium");
});

test("Google Maps place URL preserves exact coordinates", () => {
  const location = parseLocation("https://www.google.com/maps/place/Castelo+de+Almourol/data=!3d39.4621!4d-8.3832");
  assert(location.label === "Castelo de Almourol");
  assert(location.coordinates.text === "39.4621,-8.3832");
});

test("Google Maps directions destination", () => {
  const location = parseLocation("https://www.google.com/maps/dir/?api=1&origin=Torres+Novas&destination=Lisbon");
  assert(location.query === "Lisbon");
});

test("Google Maps path directions use the final stop, not the viewport", () => {
  const location = parseLocation("https://www.google.com/maps/dir/Torres+Novas/Lisbon/@39.0243535,-9.2482771,10z/data=!4m2!4m1!3e0");
  assert(location.query === "Lisbon");
  assert(location.coordinates === null);
});

test("Apple Maps pin", () => {
  const location = parseLocation("https://maps.apple.com/?q=Lisbon&ll=38.7223,-9.1393");
  assert(location.label === "Lisbon");
  assert(location.coordinates.text === "38.7223,-9.1393");
});

test("Apple Maps shared place", () => {
  const location = parseLocation("https://maps.apple.com/place?name=Ocean%C3%A1rio+de+Lisboa&coordinate=38.7635,-9.0937");
  assert(location.label === "Oceanário de Lisboa");
  assert(location.coordinates.text === "38.7635,-9.0937");
});

test("Waze deep link", () => {
  const location = parseLocation("https://waze.com/ul?ll=38.7223%2C-9.1393&navigate=yes");
  assert(location.coordinates.text === "38.7223,-9.1393");
});

test("Bing Maps center point", () => {
  const location = parseLocation("https://www.bing.com/maps?cp=38.7223~-9.1393&lvl=17");
  assert(location.coordinates.text === "38.7223,-9.1393");
});

test("OpenStreetMap marker", () => {
  const location = parseLocation("https://www.openstreetmap.org/?mlat=38.7223&mlon=-9.1393#map=18/38.7223/-9.1393");
  assert(location.coordinates.text === "38.7223,-9.1393");
});

test("Short Google links are rejected clearly", () => {
  try { parseLocation("https://maps.app.goo.gl/abc123"); }
  catch (error) { assert(error instanceof LocationParseError && error.code === "short-link"); return; }
  throw new Error("Short link was accepted");
});

test("Out-of-range coordinates are rejected", () => {
  try { parseLocation("100, 200"); }
  catch (error) { assert(error instanceof LocationParseError && error.code === "invalid-coordinates"); return; }
  throw new Error("Invalid coordinates were accepted");
});

test("Google destination URL", () => {
  const url = new URL(buildProviderUrl("google", parseLocation("38.7223,-9.1393")));
  assert(url.hostname === "www.google.com");
  assert(url.searchParams.get("api") === "1");
  assert(url.searchParams.get("query") === "38.7223,-9.1393");
});

test("Waze coordinate navigation URL", () => {
  const url = new URL(buildProviderUrl("waze", parseLocation("38.7223,-9.1393")));
  assert(url.hostname === "waze.com");
  assert(url.searchParams.get("ll") === "38.7223,-9.1393");
  assert(url.searchParams.get("navigate") === "yes");
});

test("Apple Maps place search URL", () => {
  const url = new URL(buildProviderUrl("apple", parseLocation("Lisbon Oceanarium")));
  assert(url.hostname === "maps.apple.com");
  assert(url.searchParams.get("q") === "Lisbon Oceanarium");
});

test("Bing Maps coordinate URL", () => {
  const url = new URL(buildProviderUrl("bing", parseLocation("38.7223,-9.1393")));
  assert(url.hostname === "www.bing.com");
  assert(url.searchParams.get("cp") === "38.7223~-9.1393");
});

test("OpenStreetMap place search URL", () => {
  const url = new URL(buildProviderUrl("osm", parseLocation("Lisbon Oceanarium")));
  assert(url.hostname === "www.openstreetmap.org");
  assert(url.searchParams.get("query") === "Lisbon Oceanarium");
});

const results = document.querySelector("#results");
let passed = 0;
for (const { name, run } of tests) {
  const item = document.createElement("li");
  try {
    await run();
    passed += 1;
    item.textContent = `PASS — ${name}`;
  } catch (error) {
    item.className = "fail";
    item.textContent = `FAIL — ${name}: ${error.message}`;
  }
  results.append(item);
}
document.querySelector("#summary").textContent = `${passed}/${tests.length} tests passed`;
document.body.dataset.testsPassed = String(passed === tests.length);
