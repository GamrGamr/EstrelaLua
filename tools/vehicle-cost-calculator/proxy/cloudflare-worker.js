const MAX_BODY_BYTES = 20_000;
const REQUEST_TIMEOUT_MS = 8_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_REQUESTS = 30;
const rateLimits = new Map();

function json(body, status, origin = "") {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Vary": "Origin",
  };
  if (origin) headers["Access-Control-Allow-Origin"] = origin;
  return new Response(JSON.stringify(body), { status, headers });
}

function allowedOrigins(env) {
  return String(env.ALLOWED_ORIGINS || "https://gamrgamr.github.io")
    .split(",")
    .map((value) => value.trim().replace(/\/$/, ""))
    .filter(Boolean);
}

function corsOrigin(request, env) {
  const origin = request.headers.get("Origin") || "";
  return allowedOrigins(env).includes(origin.replace(/\/$/, "")) ? origin : "";
}

function limited(request) {
  const address = request.headers.get("CF-Connecting-IP") || "unknown";
  const now = Date.now();
  for (const [key, value] of rateLimits) if (value.resetAt <= now) rateLimits.delete(key);
  const current = rateLimits.get(address);
  if (!current || current.resetAt <= now) {
    rateLimits.set(address, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT_REQUESTS;
}

function text(value, field, maximum = 300) {
  const result = String(value || "").trim();
  if (!result) throw new Error(`${field} is required.`);
  if (result.length > maximum) throw new Error(`${field} is too long.`);
  return result;
}

function validatePayload(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("The route request must be a JSON object.");
  const currency = String(value.currency || "EUR").toUpperCase();
  if (!/^[A-Z]{3}$/.test(currency)) throw new Error("Currency must be a three-letter code.");
  return {
    origin: text(value.origin, "Origin"),
    destination: text(value.destination, "Destination"),
    stops: (Array.isArray(value.stops) ? value.stops : []).slice(0, 10).map((stop) => text(stop, "Stop")),
    avoidTolls: Boolean(value.avoidTolls),
    alternatives: Boolean(value.alternatives),
    currency,
    tollPreference: ["standard", "transponder", "compare"].includes(value.tollPreference) ? value.tollPreference : "standard",
  };
}

async function fetchWithTimeout(url, init = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function coordinates(value) {
  const match = String(value).match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
  if (!match) return null;
  const lat = Number(match[1]);
  const lng = Number(match[2]);
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 ? { lat, lng, label: value } : null;
}

async function geocode(location, apiKey) {
  const direct = coordinates(location);
  if (direct) return direct;
  const url = new URL("https://geocode.search.hereapi.com/v1/geocode");
  url.searchParams.set("q", location);
  url.searchParams.set("limit", "1");
  url.searchParams.set("apiKey", apiKey);
  const response = await fetchWithTimeout(url);
  if (!response.ok) throw new Error("The routing provider could not resolve one of the locations.");
  const data = await response.json();
  const item = data.items?.[0];
  if (!item?.position) throw new Error(`No location was found for “${location}”.`);
  return { lat: item.position.lat, lng: item.position.lng, label: item.title || location };
}

function routeNotices(route) {
  return [...(route.notices || []), ...(route.sections || []).flatMap((section) => section.notices || [])]
    .map((notice) => notice.title || notice.code)
    .filter(Boolean);
}

function priceForCurrency(fare, currency) {
  const candidates = [fare.convertedPrice, fare.price].filter(Boolean);
  const exact = candidates.find((price) => price.currency === currency && Number.isFinite(Number(price.value)));
  return exact ? Number(exact.value) : null;
}

function summariseTolls(route, currency, transponderOnly) {
  const tollEntries = (route.sections || []).flatMap((section) => section.tolls || []);
  const notices = routeNotices(route);
  if (!tollEntries.length) {
    const temporarilyUnavailable = notices.some((notice) => /toll.*unavailable|currency.*unsupported/i.test(notice));
    return temporarilyUnavailable
      ? { state: "unknown", amount: null, currency, warnings: notices }
      : { state: "no_tolls", amount: 0, currency, warnings: notices };
  }

  const seenFareIds = new Set();
  let amount = 0;
  let pricedTolls = 0;
  for (const toll of tollEntries) {
    const fares = (toll.fares || []).filter((fare) => !fare.id || !seenFareIds.has(fare.id));
    let selected;
    if (transponderOnly) {
      selected = fares.find((fare) => (fare.paymentMethods || []).includes("transponder") && priceForCurrency(fare, currency) !== null);
    } else {
      selected = fares.find((fare) => (fare.paymentMethods || []).includes("cash") && priceForCurrency(fare, currency) !== null)
        || fares.find((fare) => !(fare.paymentMethods || []).includes("transponder") && priceForCurrency(fare, currency) !== null);
    }
    if (selected) {
      amount += priceForCurrency(selected, currency);
      pricedTolls += 1;
      if (selected.id) seenFareIds.add(selected.id);
    }
  }
  if (!pricedTolls) return { state: "detected_no_price", amount: null, currency, warnings: notices };
  return {
    state: transponderOnly ? "pass_estimate" : "cash_estimate",
    amount,
    currency,
    warnings: notices,
  };
}

async function requestHereRoute(request, points, apiKey, transponderOnly = false) {
  const url = new URL("https://router.hereapi.com/v8/routes");
  url.searchParams.set("transportMode", "car");
  url.searchParams.set("routingMode", "fast");
  url.searchParams.set("origin", `${points.origin.lat},${points.origin.lng}`);
  url.searchParams.set("destination", `${points.destination.lat},${points.destination.lng}`);
  points.stops.forEach((stop) => url.searchParams.append("via", `${stop.lat},${stop.lng}`));
  url.searchParams.set("return", "summary,tolls");
  url.searchParams.set("tolls[summaries]", "total");
  url.searchParams.set("currency", request.currency);
  url.searchParams.set("departureTime", "any");
  if (request.alternatives && !points.stops.length) url.searchParams.set("alternatives", "2");
  if (request.avoidTolls) url.searchParams.set("avoid[features]", "tollRoad");
  if (transponderOnly) url.searchParams.set("tolls[transponders]", "all");
  url.searchParams.set("apiKey", apiKey);
  const response = await fetchWithTimeout(url);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.title || data.cause || "HERE could not calculate this route.");
    error.status = response.status;
    throw error;
  }
  if (!data.routes?.length) throw new Error("No supported driving route was found.");
  return data.routes.map((route, index) => {
    const sections = route.sections || [];
    return {
      id: route.id || `here-route-${index + 1}`,
      name: index ? `Alternative ${index + 1}` : "Recommended route",
      distanceKm: sections.reduce((sum, section) => sum + Number(section.summary?.length || 0), 0) / 1000,
      durationSeconds: sections.reduce((sum, section) => sum + Number(section.summary?.duration || 0), 0),
      toll: summariseTolls(route, request.currency, transponderOnly),
      notices: routeNotices(route),
    };
  });
}

function mergeComparedRoutes(standardRoutes, passRoutes, currency) {
  return standardRoutes.map((route, index) => {
    const pass = passRoutes[index]?.toll || {};
    const standard = route.toll;
    return {
      ...route,
      toll: {
        ...standard,
        state: standard.amount !== null ? "provider_estimate" : standard.state,
        cashAmount: standard.amount,
        passAmount: pass.amount ?? null,
        currency,
        warnings: [...new Set([...(standard.warnings || []), ...(pass.warnings || [])])],
      },
    };
  });
}

export default {
  async fetch(request, env) {
    const origin = corsOrigin(request, env);
    if (request.method === "OPTIONS") {
      if (!origin) return json({ code: "origin_not_allowed", message: "Origin is not allowed." }, 403);
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, X-VCC-Client",
          "Access-Control-Max-Age": "86400",
          "Vary": "Origin",
        },
      });
    }
    if (request.method !== "POST") return json({ code: "method_not_allowed", message: "Use POST." }, 405, origin);
    if (!origin) return json({ code: "origin_not_allowed", message: "This origin is not allowed to use the route proxy." }, 403);
    if (!env.HERE_API_KEY) return json({ code: "proxy_not_configured", message: "The route proxy is not configured." }, 503, origin);
    if (limited(request)) return json({ code: "rate_limited", message: "Too many route requests. Try again shortly." }, 429, origin);

    const declaredLength = Number(request.headers.get("Content-Length") || 0);
    if (declaredLength > MAX_BODY_BYTES) return json({ code: "request_too_large", message: "The route request is too large." }, 413, origin);
    try {
      const bodyText = await request.text();
      if (new TextEncoder().encode(bodyText).length > MAX_BODY_BYTES) return json({ code: "request_too_large", message: "The route request is too large." }, 413, origin);
      const routeRequest = validatePayload(JSON.parse(bodyText));
      const [routeOrigin, routeDestination, ...routeStops] = await Promise.all([
        geocode(routeRequest.origin, env.HERE_API_KEY),
        geocode(routeRequest.destination, env.HERE_API_KEY),
        ...routeRequest.stops.map((stop) => geocode(stop, env.HERE_API_KEY)),
      ]);
      const points = { origin: routeOrigin, destination: routeDestination, stops: routeStops };
      let routes;
      if (routeRequest.tollPreference === "compare") {
        const [standard, pass] = await Promise.all([
          requestHereRoute(routeRequest, points, env.HERE_API_KEY, false),
          requestHereRoute(routeRequest, points, env.HERE_API_KEY, true),
        ]);
        routes = mergeComparedRoutes(standard, pass, routeRequest.currency);
      } else {
        routes = await requestHereRoute(routeRequest, points, env.HERE_API_KEY, routeRequest.tollPreference === "transponder");
      }
      return json({ provider: "HERE Routing API v8", routes, requestedAt: new Date().toISOString(), warnings: [] }, 200, origin);
    } catch (error) {
      const status = error.name === "AbortError" ? 504 : Number(error.status) === 429 ? 429 : 400;
      return json({ code: status === 504 ? "provider_timeout" : status === 429 ? "provider_quota" : "route_error", message: error.name === "SyntaxError" ? "The request body is not valid JSON." : error.message || "The route could not be calculated." }, status, origin);
    }
  },
};
