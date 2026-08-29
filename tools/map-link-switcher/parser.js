const SHORT_LINK_HOSTS = new Set(["maps.app.goo.gl", "goo.gl", "g.co", "waze.to"]);
const COORDINATES = /^\s*(-?\d{1,3}(?:\.\d+)?)\s*[, ]\s*(-?\d{1,3}(?:\.\d+)?)\s*$/;

export class LocationParseError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "LocationParseError";
    this.code = code;
  }
}

function decode(value = "") {
  try { return decodeURIComponent(value.replace(/\+/g, " ")); }
  catch { return value.replace(/\+/g, " "); }
}

function cleanText(value = "") {
  return decode(String(value)).replace(/\s+/g, " ").trim();
}

function validCoordinates(latitude, longitude) {
  return Number.isFinite(latitude) && Number.isFinite(longitude) && latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
}

function coordinateValue(latitude, longitude) {
  if (!validCoordinates(latitude, longitude)) return null;
  const trim = number => Number(number.toFixed(7)).toString();
  return { latitude, longitude, text: `${trim(latitude)},${trim(longitude)}` };
}

function parseCoordinateText(value) {
  const match = String(value).match(COORDINATES);
  if (!match) return null;
  return coordinateValue(Number(match[1]), Number(match[2]));
}

function firstParameter(url, names) {
  for (const name of names) {
    const value = cleanText(url.searchParams.get(name) || "");
    if (value) return value;
  }
  return "";
}

function result({ label, query, coordinates, source }) {
  const safeLabel = cleanText(label || query || coordinates?.text || "");
  const safeQuery = cleanText(query || label || coordinates?.text || "");
  if (!safeQuery && !coordinates) throw new LocationParseError("unsupported", "No destination could be found in that link.");
  return { label: safeLabel || coordinates.text, query: safeQuery || coordinates.text, coordinates: coordinates || null, source };
}

function googleLocation(url) {
  const path = decode(url.pathname);
  const placeMatch = path.match(/\/place\/([^/]+)/i);
  const place = cleanText(placeMatch?.[1] || "");
  const dataCoordinates = path.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/i);
  const viewportCoordinates = path.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  const coordinates = dataCoordinates
    ? coordinateValue(Number(dataCoordinates[1]), Number(dataCoordinates[2]))
    : viewportCoordinates ? coordinateValue(Number(viewportCoordinates[1]), Number(viewportCoordinates[2])) : null;
  const parameter = firstParameter(url, ["destination", "daddr", "query", "q", "ll", "center"]);
  const parameterCoordinates = parseCoordinateText(parameter);
  const segments = path.split("/").filter(Boolean);
  const directionsIndex = segments.findIndex(segment => segment.toLowerCase() === "dir");
  const directionStops = directionsIndex < 0 ? [] : segments
    .slice(directionsIndex + 1)
    .filter(segment => !segment.startsWith("@") && !segment.startsWith("data="));
  const pathDestination = cleanText(directionStops.at(-1) || "");

  if (directionsIndex >= 0 && (parameter || pathDestination)) return result({
    label: parameter || pathDestination,
    query: parameter || pathDestination,
    coordinates: parameterCoordinates,
    source: "Google Maps"
  });

  if (place || parameter || dataCoordinates) return result({
    label: place || (parameterCoordinates ? "Pinned location" : parameter),
    query: place || parameter,
    coordinates: dataCoordinates ? coordinates : parameterCoordinates,
    source: "Google Maps"
  });

  if (coordinates) return result({ label: "Pinned location", coordinates, source: "Google Maps" });
  throw new LocationParseError("unsupported", "No destination could be found in that Google Maps link.");
}

function appleLocation(url) {
  const label = firstParameter(url, ["name", "q", "address", "daddr"]);
  const coordinateText = firstParameter(url, ["coordinate", "ll", "sll"]);
  return result({ label: label || (coordinateText ? "Pinned location" : ""), query: label, coordinates: parseCoordinateText(coordinateText), source: "Apple Maps" });
}

function wazeLocation(url) {
  const label = firstParameter(url, ["q"]);
  const coordinateText = firstParameter(url, ["ll"]);
  return result({ label: label || (coordinateText ? "Pinned location" : ""), query: label, coordinates: parseCoordinateText(coordinateText), source: "Waze" });
}

function bingLocation(url) {
  const label = firstParameter(url, ["where1", "q"]);
  const center = cleanText(url.searchParams.get("cp") || "").replace("~", ",");
  const route = cleanText(url.searchParams.get("rtp") || "");
  const routeDestination = route.includes("~") ? route.split("~").at(-1).replace(/^(?:adr|pos)\./i, "").replace(/_/g, ",") : "";
  return result({ label: label || routeDestination || (center ? "Pinned location" : ""), query: label || routeDestination, coordinates: parseCoordinateText(center), source: "Bing Maps" });
}

function osmLocation(url) {
  const latitude = Number(url.searchParams.get("mlat"));
  const longitude = Number(url.searchParams.get("mlon"));
  let coordinates = coordinateValue(latitude, longitude);
  if (!coordinates) {
    const fragment = url.hash.match(/#map=\d+(?:\.\d+)?\/(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)/);
    if (fragment) coordinates = coordinateValue(Number(fragment[1]), Number(fragment[2]));
  }
  const label = firstParameter(url, ["query", "q"]);
  return result({ label: label || (coordinates ? "Pinned location" : ""), query: label, coordinates, source: "OpenStreetMap" });
}

export function parseLocation(input) {
  const value = String(input || "").trim();
  if (!value) throw new LocationParseError("empty", "Paste a destination to begin.");

  const rawCoordinates = parseCoordinateText(value);
  if (rawCoordinates) return result({ label: "Pinned location", coordinates: rawCoordinates, source: "Coordinates" });
  if (COORDINATES.test(value)) throw new LocationParseError("invalid-coordinates", "Coordinates must use a latitude from -90 to 90 and a longitude from -180 to 180.");

  let url;
  try { url = new URL(value); }
  catch {
    if (/^https?:\/\//i.test(value)) throw new LocationParseError("invalid-url", "That does not look like a complete map link.");
    return result({ query: value, source: "Place or address" });
  }

  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (SHORT_LINK_HOSTS.has(host)) {
    throw new LocationParseError("short-link", "This shortened link hides its destination. Open it first and copy the full address from the browser, or paste the place name instead.");
  }
  if (host.includes("google.") || host === "maps.google.com") return googleLocation(url);
  if (host === "maps.apple.com") return appleLocation(url);
  if (host.endsWith("waze.com")) return wazeLocation(url);
  if (host.endsWith("bing.com")) return bingLocation(url);
  if (host.endsWith("openstreetmap.org")) return osmLocation(url);

  const generic = firstParameter(url, ["destination", "daddr", "query", "q", "address", "ll"]);
  if (generic) return result({ query: generic, coordinates: parseCoordinateText(generic), source: "Map link" });
  throw new LocationParseError("unsupported", "That link does not contain a destination this browser can safely extract.");
}

export function buildProviderUrl(provider, location) {
  if (!location?.query && !location?.coordinates) throw new LocationParseError("empty", "No destination is ready to open.");
  const coordinates = location.coordinates?.text || "";
  const query = location.query || coordinates;
  const encodedQuery = encodeURIComponent(query);

  switch (provider) {
    case "google":
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordinates || query)}`;
    case "waze":
      return coordinates
        ? `https://waze.com/ul?ll=${encodeURIComponent(coordinates)}&navigate=yes`
        : `https://waze.com/ul?q=${encodedQuery}&navigate=yes`;
    case "apple":
      return coordinates
        ? `https://maps.apple.com/?ll=${encodeURIComponent(coordinates)}&q=${encodeURIComponent(location.label || coordinates)}`
        : `https://maps.apple.com/?q=${encodedQuery}`;
    case "bing": {
      if (!coordinates) return `https://www.bing.com/maps?where1=${encodedQuery}`;
      const [latitude, longitude] = coordinates.split(",");
      return `https://www.bing.com/maps?cp=${latitude}~${longitude}&lvl=17&sp=${encodeURIComponent(`point.${latitude}_${longitude}_${location.label || "Destination"}`)}`;
    }
    case "osm": {
      if (!coordinates) return `https://www.openstreetmap.org/search?query=${encodedQuery}`;
      const [latitude, longitude] = coordinates.split(",");
      return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=18/${latitude}/${longitude}`;
    }
    default:
      throw new LocationParseError("provider", "Choose a supported map app.");
  }
}
