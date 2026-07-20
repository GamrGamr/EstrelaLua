# Vehicle Cost Calculator

Vehicle Cost Calculator is a static browser application integrated into the EstrelaLuaApps GitHub Pages website. It estimates the real cost of a vehicle journey without requiring an account or installing software.

Public pages:

- Information: `https://gamrgamr.github.io/EstrelaLua/apps/vehicle-cost-calculator.html`
- Calculator: `https://gamrgamr.github.io/EstrelaLua/tools/vehicle-cost-calculator/`
- Tests: `https://gamrgamr.github.io/EstrelaLua/tools/vehicle-cost-calculator/tests.html`

## Files

- `apps/vehicle-cost-calculator.html` — EstrelaLua information page and Calculate action
- `assets/vehicle-cost-calculator-icon.svg` — original repository-owned icon
- `tools/vehicle-cost-calculator/index.html` — accessible calculator interface
- `tools/vehicle-cost-calculator/calculator.css` — responsive application design
- `tools/vehicle-cost-calculator/calculator.js` — interface, records, exports, and provider coordination
- `tools/vehicle-cost-calculator/calculations.js` — journey and measured-consumption formulas
- `tools/vehicle-cost-calculator/storage.js` — IndexedDB, settings, cache, backup, and restore
- `tools/vehicle-cost-calculator/route-links.js` — safe Google Maps, Apple Maps, and Waze URL parsing
- `tools/vehicle-cost-calculator/route-provider.js` — replaceable provider interface and proxy client
- `tools/vehicle-cost-calculator/tests.html` and `tests.js` — dependency-free browser tests
- `tools/vehicle-cost-calculator/proxy/cloudflare-worker.js` — optional secure HERE proxy
- `tools/vehicle-cost-calculator/proxy/wrangler.toml.example` — Worker configuration example

## Manual mode

Manual mode is always available and requires no API, account, build step, or backend. Enter:

1. One-way distance
2. One-way, return, or custom trip multiplier
3. Vehicle energy type and consumption
4. Fuel or electricity price
5. Optional tolls, ferry, parking, maintenance, and custom costs
6. Passenger count

The calculator keeps higher precision internally and displays currency values to two decimal places. It rejects negative values, invalid numbers, infinity, and passenger counts below one.

For a normal manual journey:

```text
total distance = one-way distance × trip multiplier + additional kilometres
```

When the online provider calculates outbound and return routes separately, their two actual distances are added instead because the return route can differ.

## Vehicle profiles and measured consumption

Vehicle profiles can be created, edited, duplicated, archived, and deleted. Deleting a vehicle also deletes its fill-up records after confirmation; saved journeys remain unchanged snapshots.

Measured liquid-fuel consumption uses the full-tank method. Between two full-tank records, all partial-fill litres are included:

```text
consumption (L/100 km) = accumulated litres ÷ kilometres travelled × 100
```

A partial fill alone never creates a valid interval. The calculator reports the latest interval, overall weighted average, weighted latest-three average, driving-type averages, minimum, maximum, count, and date range.

## Browser storage

IndexedDB stores:

- Vehicles
- Fill-ups
- Saved journey snapshots
- Route cache entries
- Recent energy prices

`localStorage` stores only small preferences such as theme, currency, cache lifetime, and the public proxy endpoint.

Data belongs to the current browser profile and device. Clearing browser data can remove it. Use **Export JSON backup** to preserve a copy.

The data tools support:

- Full JSON backup
- Validated JSON import with preview
- Merge or replace import
- Automatic safety export before replacement
- Vehicle, fill-up, and journey CSV exports
- Deleting only Vehicle Cost Calculator local data

Imports are limited to 5 MB, version-checked, structurally validated, and never evaluated as code.

## Shared map links

The safe URL parser recognises Google Maps, Apple Maps, and Waze links. It permits only HTTP and HTTPS, decodes route values, and never loads or executes pasted content.

Map providers encode shared routes differently. Some links contain only a destination or search location. Shortened links commonly cannot be expanded from a GitHub Pages browser because of cross-origin restrictions. In those cases, the provider is identified where possible and the user completes origin, destination, stops, and distance manually.

Imported locations must be confirmed. The calculator does not claim that a parsed link recreates the exact route previously displayed by another service.

## Automatic online routing mode

The implemented provider is **HERE Routing API v8** behind the included Cloudflare Worker. The browser never receives the HERE API key.

When configured, the calculator can request:

- Driving distance and duration
- Outbound and return routes separately
- Up to two alternatives when there are no intermediate stops
- Toll-road information and estimated toll fares where HERE supplies them
- Standard cash/card fares, transponder fares, or a comparison request
- A route that prefers to avoid toll roads

The application shows a visible privacy notice before contacting the proxy. It sends only the origin, destination, stops, route options, currency, and limited toll-relevant vehicle settings. Fill-up history and saved journeys are not sent.

The proxy validates the origin, method, JSON structure, sizes, locations, stop count, currency, and options. It applies a per-isolate request limit, uses request timeouts, filters the HERE response, and does not intentionally log or store journey content.

### Toll states

The interface distinguishes:

- Provider-estimated toll amount
- Cash/card toll estimate
- Toll-pass/transponder estimate
- Manual toll amount
- Manual override
- Toll road detected but price unavailable
- No toll road detected
- Toll status unknown
- Provider unavailable

An unknown or unavailable price is never presented as confirmed `€0.00`. Manual outbound and return tolls remain available in every mode.

### Coverage and pricing limitations

HERE toll coverage varies by country, road, vehicle, payment method, time, currency, and subscription. A route may contain a toll without a price. Avoid-toll requests are preferences and can be violated where no reasonable alternative exists. Alternative routes are unavailable when intermediate stops are used. Toll queries are billable additional transactions under HERE pricing, and comparing standard and transponder fares makes two routing requests.

Fuel and electricity prices are user-entered. The route provider supplies toll data only; it is not used as a live fuel-price source.

## Deploying the secure Cloudflare Worker

The Worker is optional. Manual mode works before and after deployment.

1. Create a HERE developer project and enable access to Geocoding and Search API v7 and Routing API v8.
2. Review HERE pricing, billing, toll availability, and quotas. Set account or project limits suitable for a public website.
3. Copy `proxy/wrangler.toml.example` to `proxy/wrangler.toml` locally. Do not commit a key.
4. Confirm `ALLOWED_ORIGINS = "https://gamrgamr.github.io"`. Browser CORS origins do not contain paths, so origin checking protects the GitHub Pages host rather than only `/EstrelaLua/`.
5. From the `proxy` folder, authenticate Wrangler and add the secret:

```text
npx wrangler login
npx wrangler secret put HERE_API_KEY
```

6. Deploy:

```text
npx wrangler deploy
```

7. Copy the resulting HTTPS Worker URL.
8. Open Calculator → Settings → **Secure route proxy URL**, paste the Worker URL, and save.

The key must exist only as the Cloudflare `HERE_API_KEY` secret. Do not put it in HTML, JavaScript, JSON, GitHub Actions output, browser storage, or `wrangler.toml`.

For stronger production rate limiting across Worker isolates, configure Cloudflare's account-level rate-limiting feature in addition to the included in-memory limit. Review logs and disable request-body logging. Restrict the HERE key to the required HERE APIs and use separate credentials for unrelated applications.

## Route cache

Online route results can be cached in IndexedDB for a user-selected lifetime (12 hours by default). Cache keys include normalised locations, stops, provider, route options, toll preference, and currency. Credentials and sensitive headers are never cached.

The interface labels cached route results and includes **Clear route cache**. Cache expiry is intentionally limited because traffic and toll data can change.

## Privacy

Manual calculations run entirely in the browser. No accounts, analytics, telemetry, advertising, tracking pixels, or cloud synchronisation are included.

When online routing is enabled, route locations and options pass through the deployed Worker to HERE. HERE privacy and service terms apply. The Worker source is designed not to retain route data, but platform-level operational logs and provider processing must be reviewed by the deployer.

## Running locally

No build is required. Because the calculator uses browser ES modules, serve the repository through any static development server rather than opening `file://` directly.

Examples include the Visual Studio Code **Live Server** extension or, if Node is already available:

```text
npx serve .
```

Open the path printed by the static server, then `/tools/vehicle-cost-calculator/`. Do not hard-code the local URL in source files.

## Tests

Open `tools/vehicle-cost-calculator/tests.html` through GitHub Pages or a static development server. The suite covers calculation types, journey options, costs, passengers, numeric validation, full-tank measurement, IndexedDB CRUD, backups, map links, toll states, provider success/failure, and `/EstrelaLua/` relative paths.

Normal tests use mock provider data and make no live paid calls.

After deploying the Worker, perform a clearly labelled real test:

1. Save the Worker endpoint in Settings.
2. Enter a known origin and destination covered by HERE.
3. Read the visible external-provider notice.
4. Select **Calculate route**.
5. Confirm the returned distance and duration against a trusted route source.
6. If tolls are returned, confirm the source label and compare the amount with the relevant toll operator.
7. Repeat as a return journey and confirm the outbound and return requests were calculated separately.
8. Test an unsupported or unavailable toll route and confirm the UI requests manual entry instead of showing a confirmed zero.

Record the date, HERE plan, route, currency, returned toll state, and independent comparison when documenting a real provider test.

## GitHub Pages deployment

The site is published directly from `main`. All calculator links are relative and remain under `/EstrelaLua/`; there are no root-relative asset paths, server-side database dependencies, Python files, or build artifacts.
