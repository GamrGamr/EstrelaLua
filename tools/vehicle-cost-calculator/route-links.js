const HTTP_PROTOCOLS = new Set(["http:", "https:"]);

function decode(value = "") {
  try {
    return decodeURIComponent(String(value).replace(/\+/g, " ")).trim();
  } catch {
    return String(value).trim();
  }
}

function coordinateLabel(latitude, longitude) {
  const lat = Number(latitude);
  const lng = Number(longitude);
  return Number.isFinite(lat) && Number.isFinite(lng) ? `${lat},${lng}` : "";
}

function baseResult(url, provider = "Unknown") {
  return {
    valid: true,
    provider,
    originalUrl: url.href,
    origin: "",
    destination: "",
    stops: [],
    travelMode: "drive",
    searchLocation: "",
    coordinates: [],
    isShortLink: false,
    warnings: [],
  };
}

function parseGoogle(url) {
  const result = baseResult(url, "Google Maps");
  const host = url.hostname.toLowerCase();
  result.isShortLink = host === "goo.gl" || host === "maps.app.goo.gl";
  if (result.isShortLink) {
    result.warnings.push("This shortened Google Maps link cannot usually be expanded by the browser because of cross-origin restrictions. Confirm the locations manually.");
    return result;
  }

  const params = url.searchParams;
  result.origin = decode(params.get("origin") || params.get("saddr") || "");
  result.destination = decode(params.get("destination") || params.get("daddr") || "");
  result.travelMode = decode(params.get("travelmode") || params.get("dirflg") || "drive");
  result.searchLocation = decode(params.get("query") || params.get("q") || "");
  const waypoints = decode(params.get("waypoints") || "");
  if (waypoints) result.stops = waypoints.split("|").map(decode).filter(Boolean);

  const routeMatch = url.pathname.match(/\/maps\/dir\/(.+)/i);
  if (routeMatch) {
    const parts = routeMatch[1].split("/").map(decode).filter((part) => part && !part.startsWith("@")).map((part) => part.replace(/^data=.*$/i, "")).filter(Boolean);
    if (!result.origin && parts.length >= 2) result.origin = parts[0];
    if (!result.destination && parts.length >= 2) result.destination = parts.at(-1);
    if (!result.stops.length && parts.length > 2) result.stops = parts.slice(1, -1);
  }

  const coordinateMatches = [...url.href.matchAll(/(?:@|!3d)(-?\d+(?:\.\d+)?)(?:,|!4d)(-?\d+(?:\.\d+)?)/g)];
  result.coordinates = coordinateMatches.map((match) => ({ latitude: Number(match[1]), longitude: Number(match[2]) }));
  if (!result.destination && result.searchLocation) result.destination = result.searchLocation;
  if (!result.origin || !result.destination) result.warnings.push("The link does not contain a complete origin and destination. Confirm or complete the route below.");
  return result;
}

function parseApple(url) {
  const result = baseResult(url, "Apple Maps");
  const params = url.searchParams;
  result.origin = decode(params.get("saddr") || params.get("origin") || "");
  result.destination = decode(params.get("daddr") || params.get("destination") || "");
  result.searchLocation = decode(params.get("q") || params.get("address") || "");
  result.travelMode = decode(params.get("dirflg") || "drive");
  const coordinates = (params.get("ll") || params.get("sll") || "").split(",");
  const label = coordinateLabel(coordinates[0], coordinates[1]);
  if (label) result.coordinates.push({ latitude: Number(coordinates[0]), longitude: Number(coordinates[1]) });
  if (!result.destination && result.searchLocation) result.destination = result.searchLocation;
  if (!result.destination && label) result.destination = label;
  if (!result.origin || !result.destination) result.warnings.push("Apple Maps supplied only part of the route. Confirm or complete the origin and destination.");
  return result;
}

function parseWazeValue(value) {
  const decoded = decode(value);
  const coordinate = decoded.match(/(?:ll\.)?(-?\d+(?:\.\d+)?)[,~](-?\d+(?:\.\d+)?)/i);
  return coordinate ? coordinateLabel(coordinate[1], coordinate[2]) : decoded;
}

function parseWaze(url) {
  const result = baseResult(url, "Waze");
  const params = url.searchParams;
  result.origin = parseWazeValue(params.get("from") || params.get("origin") || "");
  result.destination = parseWazeValue(params.get("to") || params.get("destination") || "");
  result.searchLocation = parseWazeValue(params.get("q") || params.get("ll") || "");
  if (!result.destination && result.searchLocation) result.destination = result.searchLocation;
  const navigationCoordinates = (params.get("ll") || "").split(",");
  const label = coordinateLabel(navigationCoordinates[0], navigationCoordinates[1]);
  if (label) result.coordinates.push({ latitude: Number(navigationCoordinates[0]), longitude: Number(navigationCoordinates[1]) });
  if (!result.origin || !result.destination) result.warnings.push("Waze links often contain only a destination. Confirm or complete the origin and destination.");
  return result;
}

export function parseRouteLink(value) {
  const input = String(value || "").trim();
  if (!input) return { valid: false, provider: "Unknown", warnings: ["Paste a Google Maps, Apple Maps, or Waze link first."] };
  let url;
  try {
    url = new URL(input);
  } catch {
    return { valid: false, provider: "Unknown", warnings: ["This is not a valid URL. Use a complete http:// or https:// map link."] };
  }
  if (!HTTP_PROTOCOLS.has(url.protocol)) {
    return { valid: false, provider: "Unknown", warnings: ["Only HTTP and HTTPS map links are supported."] };
  }

  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  try {
    if (host.includes("google.") || host === "goo.gl" || host === "maps.app.goo.gl") return parseGoogle(url);
    if (host === "maps.apple.com" || host.endsWith(".maps.apple.com")) return parseApple(url);
    if (host === "waze.com" || host.endsWith(".waze.com")) return parseWaze(url);
  } catch {
    return { valid: false, provider: "Unknown", warnings: ["The map link could not be read safely. Enter the route manually."] };
  }
  return {
    ...baseResult(url, "Unsupported map service"),
    valid: false,
    warnings: ["This map service is not supported. Enter the origin, destination, and distance manually."],
  };
}
