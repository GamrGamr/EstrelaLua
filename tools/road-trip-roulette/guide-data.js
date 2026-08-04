import { originalSourceLabel, originalSourceUrl } from "./engine.js?v=18";

const text = (en, pt) => ({ en, pt });

function discoveryItems(destination) {
  const name = destination.name;
  const activity = destination.terrain === "coast"
    ? { label: text("Find a boat or coastal activity", "Encontrar um passeio de barco ou atividade costeira"), query: `Passeios de barco e atividades costeiras, ${name}` }
    : destination.terrain === "mountain"
      ? { label: text("Find a walking trail", "Encontrar um trilho pedestre"), query: `Trilhos pedestres, ${name}` }
      : { label: text("Find a local walking experience", "Encontrar um passeio a pé"), query: `Passeios a pé, ${name}` };

  return [
    { id: "activity", category: "do", ...activity, kind: "search" },
    { id: "viewpoint", category: "do", label: text("Find a nearby viewpoint", "Encontrar um miradouro próximo"), query: `Miradouros, ${name}`, kind: "search" },
    { id: "restaurant", category: "eat", label: text("Find a traditional restaurant", "Encontrar um restaurante tradicional"), query: `Restaurantes tradicionais, ${name}`, kind: "search" },
    { id: "cafe", category: "eat", label: text("Find a local café or pastry shop", "Encontrar um café ou pastelaria local"), query: `Cafés e pastelarias, ${name}`, kind: "search" },
    { id: "tourism", category: "practical", label: text("Find the nearest tourist office", "Encontrar o posto de turismo mais próximo"), query: `Posto de turismo, ${name}`, kind: "search" },
  ];
}

export function buildDestinationGuide(destination, mapQueries = [], mapPoints = []) {
  const sourceUrl = originalSourceUrl(destination.source);
  const sourceLabel = originalSourceLabel(destination.sourceLabel, "Destination guide");
  const exactStops = mapQueries.map((query, index) => ({
    id: `visit-${index + 1}`,
    category: "visit",
    label: text(query, query),
    query,
    point: mapPoints[index],
    kind: "place",
  }));
  const items = [...exactStops, ...discoveryItems(destination)].map((item) => ({ ...item, sourceUrl, sourceLabel }));
  return {
    mini: items.slice(0, 3),
    medium: [...items.slice(0, 3), ...items.filter((item) => ["activity", "restaurant", "viewpoint"].includes(item.id))],
    full: items,
  };
}

export function sourceLanguage(url = "") {
  const value = String(url).toLowerCase();
  if (/\/(pt|pt-pt)(\/|$)/.test(value) || value.includes("pt.wikipedia.org")) return "PT";
  if (/\/(en)(\/|$)/.test(value) || value.includes("en.wikipedia.org")) return "EN";
  return "ORIGINAL";
}
