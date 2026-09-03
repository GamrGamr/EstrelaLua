# EstrelaLuaApps

This repository contains the official website for **EstrelaLuaApps**, an independent collection of practical Windows desktop applications and browser tools.

The website gives every app one clear home where visitors can:

- Discover what each application is designed to do
- Compare its main features and system requirements
- Understand how it handles privacy and local data
- Open the application's GitHub repository
- Download the latest official release
- Use the complete website and every browser app in Portuguese or English

## Apps featured on the website

### Allin1APP

A lightweight Windows app launcher for organizing applications and shortcuts into categories, keeping favourites close, and reducing desktop clutter.

### Foculume

A private, local study timer with customizable focus and rest cycles, an always-on-top compact timer, long breaks, and seven-day statistics.

### MacroAPP

A portable macro recorder and player for capturing keyboard events and mouse clicks, saving reusable macros, and controlling playback with configurable hotkeys.

### Pixevra

A local image utility for converting, resizing, cropping, trimming, creating ICO files, and cleaning up image backgrounds without uploading files anywhere.

### Halvynox

A lightweight Windows shutdown scheduler with countdown warnings, limited delay attempts, optional password protection, and local configuration.

### Vehicle Cost Calculator

A fully manual browser-based journey calculator for fuel, electricity, tolls, parking, ferries, maintenance, custom costs, and passenger sharing. It supports local vehicle profiles, measured full-tank consumption, saved journey snapshots, and backups.

### Home Energy Calculator

A private browser-based household electricity calculator. Enter energy and daily contracted-power prices, then fill in the appliance values you know. A measured monthly kWh value is used directly; when it is empty, the calculator estimates from power and running time. It calculates energy, contracted-power, and optional fixed costs by day, month, and year while storing the household setup only in the current browser.

### Road Trip Roulette

An interactive Portugal road-trip idea generator with 135 destinations and 283 starting localities researched across official tourism pages, independent travel guides, and community recommendations. Choose a starting district and locality, distance or travel-time range, and mood—or leave the choices to chance—to receive a sourced destination, approximate distance and duration, compass direction, map preview, and a Mini, Medium, or destination-aware Full guide. Trips can be saved, marked completed, shared with a link, or opened in Google Maps for exact road directions.

### Map Link Switcher

A private browser-based navigation link converter. Paste a supported full map link, place name, address, or coordinates, then open the destination in Google Maps, Waze, Apple Maps, Bing Maps, or OpenStreetMap. Parsing happens only in the current browser and the app does not store a history.

### GTA Online Timer Reference

A sourced browser reference and live tracker for GTA Online activity cooldowns, mission time limits, passive production, supply deliveries, and daily or weekly resets. Every record identifies its trigger, scope, whether other work remains available, conditions or exceptions, evidence source, and last verification date. Fixed-duration records can be started as persistent device-local countdowns.

### Fair Share

A private browser calculator for couples who want to compare an equal 50/50 expense split with contributions proportional to each person&rsquo;s monthly income. It supports unlimited shared expenses, live income-share percentages, payment suggestions, remaining monthly balances, a side-by-side comparison, and device-local persistence.

### Media Inspector

A privacy-first browser inspector for photo and video metadata. Files are parsed locally with a human-readable report for camera details, capture settings, dates, GPS, video and audio streams, plus a deterministic privacy scan and a searchable raw-metadata explorer. Maps are never loaded without explicit consent.

## About the project

EstrelaLuaApps is created and maintained by one independent developer. The applications focus on useful everyday tools, straightforward interfaces, local data storage, and avoiding unnecessary accounts, cloud services, and telemetry.

This repository contains the public website and its browser-based calculators. Each desktop application's downloads, documentation, release history, and repository link are available from its dedicated page. Browser apps open directly from their information page.

## Website structure

- `index.html` - Main EstrelaLuaApps homepage and app collection
- `apps/` - Dedicated information page for each application
- `assets/` - Brand artwork, favicons, and official app icons
- `assets/i18n-core.js` and `site-i18n.js` - Shared Portuguese/English preference, controls, and website translations
- `tools/vehicle-cost-calculator/` - Browser calculator, calculation and storage modules, and tests
- `tools/home-energy-calculator/` - Household electricity calculator, calculation module, and tests
- `tools/road-trip-roulette/` - Interactive trip generator, curated destination data, route engine, and browser tests
- `tools/map-link-switcher/` - Local map-link parser, provider URL generator, minimal interface, and browser tests
- `tools/gta-online-timers/` - Searchable GTA Online timer records, evidence links, filters, and persistent live countdowns
- `tools/partilha-justa/` - Couples expense calculator with proportional and 50/50 comparison modes
- `tools/media-inspector/` - Local photo/video metadata inspector, privacy scanner, raw explorer, tests, and browser dependencies
- `docs/vehicle-cost-calculator.md` - Calculator operation, formulas, privacy, storage, and tests
- `styles.css` - Shared responsive design and page styling
- `script.js` - Navigation, scrolling, and reveal interactions
- `.audit/bilingual-audit.mjs` - Automated structural, catalogue, link-generation, and calculation checks for the bilingual release

## Hosting

The website is static and is published through GitHub Pages from the `main` branch. It uses relative paths and does not require a build process, package manager, database, or web server framework.

The shared Portuguese/English choice is remembered on the current device and can also be selected explicitly with `?lang=pt` or `?lang=en`. The browser tools work without a backend, account, or build step. Calculator data and saved trips stay in the current browser. Road Trip Roulette uses local curated data for its suggestions and only sends the selected origin and destination to Google Maps when the user chooses to open exact driving directions. Map Link Switcher processes pasted text locally and sends the extracted destination only to the map provider the user chooses to open. GTA Online Timer Reference stores its researched catalogue and active countdowns locally in the browser and sends no gameplay data anywhere. Fair Share stores names, incomes, expenses, and the selected split method only in the current browser. Media Inspector analyses the selected file locally, retains no upload history, and contacts OpenStreetMap only after the user explicitly asks to load a GPS map.
