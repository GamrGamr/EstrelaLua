import { originalSourceLabel, originalSourceUrl } from "./engine.js?v=18";

const text = (en, pt) => ({ en, pt });

function discoveryItems(destination) {
  const name = destination.name;
  const activity = destination.terrain === "coast"
    ? { label: text("Find a boat or coastal activity", "Encontrar um passeio de barco ou atividade costeira"), query: `Passeios de barco e atividades costeiras, ${name}` }
    : destination.terrain === "mountain"
      ? { label: text("Find a walking trail", "Encontrar um trilho pedestre"), query: `Trilhos pedestres, ${name}` }
      : { label: text("Find a local walking experience", "Encontrar um passeio a pé"), query: `Passeios a pé, ${name}` };
  const scenery = destination.terrain === "coast"
    ? [
      { id: "beach", category: "visit", label: text("Find a nearby beach", "Encontrar uma praia próxima"), query: `Praias perto de ${name}`, kind: "search" },
      { id: "coastal-lookout", category: "visit", label: text("Find a coastal lookout", "Encontrar um miradouro costeiro"), query: `Miradouros costeiros perto de ${name}`, kind: "search" },
    ]
    : destination.terrain === "mountain"
      ? [{ id: "extra-scenery", category: "visit", label: text("Find another scenic nature stop", "Encontrar outro local natural panorâmico"), query: `Atrações naturais e miradouros, ${name}`, kind: "search" }]
      : [{ id: "extra-scenery", category: "visit", label: text("Find another nearby heritage site", "Encontrar outro local histórico próximo"), query: `Património e locais históricos, ${name}`, kind: "search" }];

  return [
    { id: "historic-centre", category: "visit", label: text("Explore the historic centre", "Explorar o centro histórico"), query: `Centro histórico, ${name}`, kind: "search" },
    { id: "landmarks", category: "visit", label: text("Find another landmark or monument", "Encontrar outro monumento ou ponto de interesse"), query: `Monumentos e atrações turísticas, ${name}`, kind: "search" },
    { id: "museums", category: "visit", label: text("Discover a local museum", "Descobrir um museu local"), query: `Museus, ${name}`, kind: "search" },
    ...scenery,
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
  const withIds = (...ids) => items.filter((item) => ids.includes(item.id));
  return {
    mini: withIds("visit-1", "visit-2", "visit-3"),
    medium: withIds("visit-1", "visit-2", "visit-3", "historic-centre", "landmarks", "activity", "restaurant"),
    full: items,
  };
}

export function sourceLanguage(url = "") {
  const value = String(url).toLowerCase();
  if (/\/(pt|pt-pt)(\/|$)/.test(value) || value.includes("pt.wikipedia.org")) return "PT";
  if (/\/(en)(\/|$)/.test(value) || value.includes("en.wikipedia.org")) return "EN";
  return "ORIGINAL";
}
