export const starts = [
  { id: "lisbon", name: "Lisboa", lat: 38.7223, lon: -9.1393 },
  { id: "porto", name: "Porto", lat: 41.1579, lon: -8.6291 },
  { id: "coimbra", name: "Coimbra", lat: 40.2033, lon: -8.4103 },
  { id: "braga", name: "Braga", lat: 41.5454, lon: -8.4265 },
  { id: "aveiro", name: "Aveiro", lat: 40.6405, lon: -8.6538 },
  { id: "viseu", name: "Viseu", lat: 40.6566, lon: -7.9125 },
  { id: "leiria", name: "Leiria", lat: 39.7436, lon: -8.8071 },
  { id: "santarem", name: "Santarém", lat: 39.2369, lon: -8.6850 },
  { id: "torres-novas", name: "Torres Novas", lat: 39.4811, lon: -8.5395 },
  { id: "evora", name: "Évora", lat: 38.5714, lon: -7.9135 },
  { id: "castelo-branco", name: "Castelo Branco", lat: 39.8222, lon: -7.4919 },
  { id: "faro", name: "Faro", lat: 37.0194, lon: -7.9304 },
];

export const destinations = [
  { id: "sintra", name: "Sintra", lat: 38.8029, lon: -9.3817, terrain: "coast", vibes: ["history", "nature", "viewpoint"], emoji: "🏰", source: "https://www.visitportugal.com/en/destinos/lisboa-regiao", copy: { en: "Palaces, forest roads and Atlantic air packed into one cinematic escape.", pt: "Palácios, estradas de floresta e ar atlântico numa escapadinha cinematográfica." }, stops: { en: ["Old town wander", "Mountain viewpoint", "Atlantic coffee stop"], pt: ["Passeio pelo centro histórico", "Miradouro na serra", "Paragem para café junto ao Atlântico"] } },
  { id: "arrabida", name: "Serra da Arrábida", lat: 38.4870, lon: -8.9940, terrain: "coast", vibes: ["coast", "nature", "viewpoint"], emoji: "🌊", source: "https://www.visitportugal.com/en/content/serra-da-arrabida-and-sado-estuary", copy: { en: "A ribbon of green hills, limestone cliffs and blue coves above the Atlantic.", pt: "Uma faixa de serra verde, falésias calcárias e enseadas azuis sobre o Atlântico." }, stops: { en: ["Azeitão village", "Serra do Risco viewpoint", "Portinho da Arrábida"], pt: ["Vila de Azeitão", "Miradouro da Serra do Risco", "Portinho da Arrábida"] } },
  { id: "obidos", name: "Óbidos", lat: 39.3600, lon: -9.1580, terrain: "normal", vibes: ["history", "food"], emoji: "🧱", source: "https://www.visitportugal.com/en/destinos/centro-de-portugal", copy: { en: "Whitewashed lanes, castle walls and a tiny cup of ginjinha waiting at the end.", pt: "Ruas caiadas, muralhas e um pequeno copo de ginjinha à sua espera no final." }, stops: { en: ["Walk the walls", "Bookshop church", "Ginjinha tasting"], pt: ["Passeio pelas muralhas", "Igreja-livraria", "Prova de ginjinha"] } },
  { id: "nazare", name: "Nazaré", lat: 39.6020, lon: -9.0680, terrain: "coast", vibes: ["coast", "food", "viewpoint"], emoji: "🌊", source: "https://www.visitportugal.com/en/destinos/centro-de-portugal", copy: { en: "A fishing-town lunch, huge-ocean energy and one of the coast’s great viewpoints.", pt: "Almoço numa vila piscatória, a força do oceano e um dos grandes miradouros da costa." }, stops: { en: ["Sítio viewpoint", "North Beach", "Fresh fish lunch"], pt: ["Miradouro do Sítio", "Praia do Norte", "Almoço de peixe fresco"] } },
  { id: "peniche", name: "Peniche", lat: 39.3550, lon: -9.3810, terrain: "coast", vibes: ["coast", "food", "viewpoint"], emoji: "🐚", source: "https://www.visitportugal.com/en/destinos/centro-de-portugal", copy: { en: "Wind-carved cliffs, surf beaches and a loop around a dramatic peninsula.", pt: "Falésias esculpidas pelo vento, praias de surf e uma volta por uma península dramática." }, stops: { en: ["Cabo Carvoeiro", "Baleal beach", "Seafood stop"], pt: ["Cabo Carvoeiro", "Praia do Baleal", "Paragem para marisco"] } },
  { id: "tomar", name: "Tomar", lat: 39.6030, lon: -8.4090, terrain: "normal", vibes: ["history", "food"], emoji: "⚔️", source: "https://www.visitportugal.com/en/destinos/centro-de-portugal", copy: { en: "Templar history, riverside streets and a monumental hilltop finale.", pt: "História templária, ruas junto ao rio e um final monumental no topo da colina." }, stops: { en: ["Convent of Christ", "Old town", "Nabão riverside"], pt: ["Convento de Cristo", "Centro histórico", "Margem do Nabão"] } },
  { id: "almourol", name: "Castelo de Almourol", lat: 39.4630, lon: -8.3840, terrain: "normal", vibes: ["history", "viewpoint"], emoji: "🏝️", source: "https://www.visitportugal.com/en/destinos/centro-de-portugal", copy: { en: "A storybook castle on a Tagus island—small trip, maximum atmosphere.", pt: "Um castelo de conto numa ilha do Tejo—viagem curta, ambiente máximo." }, stops: { en: ["Riverside viewpoint", "Castle crossing", "Constância detour"], pt: ["Miradouro ribeirinho", "Travessia para o castelo", "Desvio por Constância"] } },
  { id: "piodao", name: "Piódão", lat: 40.2300, lon: -7.8250, terrain: "mountain", vibes: ["nature", "history", "viewpoint"], emoji: "⛰️", source: "https://www.visitportugal.com/en/content/villages-and-towns-portugal", copy: { en: "A slate village folded into the mountains at the end of a gloriously twisty road.", pt: "Uma aldeia de xisto encaixada na serra, no fim de uma estrada deliciosamente sinuosa." }, stops: { en: ["Village lanes", "Mountain lookout", "Local pastry break"], pt: ["Ruelas da aldeia", "Miradouro da serra", "Pausa para doçaria local"] } },
  { id: "serra-estrela", name: "Serra da Estrela", lat: 40.4030, lon: -7.5390, terrain: "mountain", vibes: ["nature", "viewpoint", "food"], emoji: "🏔️", source: "https://www.visitportugal.com/en/content/natural-parks-and-reserves", copy: { en: "High roads, glacial valleys and the biggest-sky feeling in mainland Portugal.", pt: "Estradas de altitude, vales glaciares e a sensação de céu infinito em Portugal continental." }, stops: { en: ["Manteigas valley", "Covão d’Ametade", "Mountain cheese stop"], pt: ["Vale de Manteigas", "Covão d’Ametade", "Paragem para queijo da serra"] } },
  { id: "monsanto", name: "Monsanto", lat: 40.0400, lon: -7.1120, terrain: "mountain", vibes: ["history", "viewpoint", "nature"], emoji: "🪨", source: "https://www.visitportugal.com/en/content/villages-and-towns-portugal", copy: { en: "Granite houses squeeze between giant boulders beneath a horizon-wide castle.", pt: "Casas de granito encaixadas entre enormes penedos, sob um castelo com horizonte sem fim." }, stops: { en: ["Boulder lanes", "Castle climb", "Sunset viewpoint"], pt: ["Ruas entre penedos", "Subida ao castelo", "Miradouro ao pôr do sol"] } },
  { id: "marvao", name: "Marvão", lat: 39.3930, lon: -7.3760, terrain: "mountain", vibes: ["history", "viewpoint", "food"], emoji: "🦅", source: "https://www.visitportugal.com/en/content/villages-and-towns-portugal", copy: { en: "A white hill town balanced above the plains with views that seem to cross borders.", pt: "Uma vila branca equilibrada sobre a planície, com vistas que parecem atravessar fronteiras." }, stops: { en: ["Castle ramparts", "Walled streets", "Chestnut-country snack"], pt: ["Muralhas do castelo", "Ruas fortificadas", "Petisco da terra da castanha"] } },
  { id: "monsaraz", name: "Monsaraz", lat: 38.4430, lon: -7.3810, terrain: "normal", vibes: ["history", "viewpoint", "food"], emoji: "🌅", source: "https://www.visitportugal.com/en/content/villages-and-towns-portugal", copy: { en: "White walls, slow Alentejo streets and a balcony over the enormous Alqueva lake.", pt: "Muralhas brancas, ruas lentas do Alentejo e uma varanda sobre o enorme Alqueva." }, stops: { en: ["Castle viewpoint", "Pottery streets", "Alqueva sunset"], pt: ["Miradouro do castelo", "Ruas da olaria", "Pôr do sol no Alqueva"] } },
  { id: "comporta", name: "Comporta", lat: 38.3800, lon: -8.7860, terrain: "coast", vibes: ["coast", "food", "nature"], emoji: "🌾", source: "https://www.visitportugal.com/en/content/slow-travel-in-portugal", copy: { en: "Rice fields, wooden walkways and a wide Atlantic beach made for an unhurried day.", pt: "Arrozais, passadiços de madeira e uma praia atlântica perfeita para um dia sem pressa." }, stops: { en: ["Rice-field road", "Village lunch", "Beach sunset"], pt: ["Estrada dos arrozais", "Almoço na aldeia", "Pôr do sol na praia"] } },
  { id: "milfontes", name: "Vila Nova de Milfontes", lat: 37.7240, lon: -8.7830, terrain: "coast", vibes: ["coast", "food", "nature"], emoji: "🏖️", source: "https://www.visitportugal.com/en/content/slow-travel-in-portugal", copy: { en: "River meets ocean on the wild Alentejo coast, with seafood in between.", pt: "O rio encontra o oceano na costa alentejana selvagem, com marisco pelo meio." }, stops: { en: ["Mira river mouth", "Clifftop walk", "Seafood dinner"], pt: ["Foz do Mira", "Passeio nas falésias", "Jantar de marisco"] } },
  { id: "sagres", name: "Sagres", lat: 37.0060, lon: -8.9390, terrain: "coast", vibes: ["coast", "viewpoint", "nature"], emoji: "🧭", source: "https://www.visitportugal.com/en/content/slow-travel-in-portugal", copy: { en: "Drive until Portugal runs out: giant cliffs, lighthouse roads and Atlantic wind.", pt: "Conduza até Portugal acabar: falésias gigantes, estradas de faróis e vento atlântico." }, stops: { en: ["Sagres fortress", "Cape St Vincent", "Clifftop sunset"], pt: ["Fortaleza de Sagres", "Cabo de São Vicente", "Pôr do sol na falésia"] } },
  { id: "tavira", name: "Tavira", lat: 37.1270, lon: -7.6480, terrain: "coast", vibes: ["coast", "history", "food"], emoji: "☀️", source: "https://www.visitportugal.com/en/content/natural-parks-and-reserves", copy: { en: "Tiled streets, a slow river and the lagoon landscapes of the eastern Algarve.", pt: "Ruas de azulejo, um rio tranquilo e as paisagens lagunares do sotavento algarvio." }, stops: { en: ["Roman bridge", "Castle garden", "Ria Formosa ferry"], pt: ["Ponte romana", "Jardim do castelo", "Barco na Ria Formosa"] } },
  { id: "mertola", name: "Mértola", lat: 37.6380, lon: -7.6630, terrain: "normal", vibes: ["history", "nature", "food"], emoji: "🕌", source: "https://www.visitportugal.com/en/content/natural-parks-and-reserves", copy: { en: "Layered history rises above the Guadiana in one of Portugal’s great river towns.", pt: "Séculos de história erguem-se sobre o Guadiana numa das grandes vilas ribeirinhas de Portugal." }, stops: { en: ["Castle hill", "Museum quarter", "Guadiana viewpoint"], pt: ["Colina do castelo", "Bairro dos museus", "Miradouro do Guadiana"] } },
  { id: "arouca", name: "Arouca", lat: 40.9300, lon: -8.2440, terrain: "mountain", vibes: ["nature", "viewpoint", "food"], emoji: "🥾", source: "https://www.visitportugal.com/en/content/natural-parks-and-reserves", copy: { en: "River gorges, mountain roads and a serious reward for anyone who likes walking.", pt: "Gargantas de rio, estradas de montanha e uma grande recompensa para quem gosta de caminhar." }, stops: { en: ["Paiva valley", "Geopark viewpoint", "Arouquesa tasting"], pt: ["Vale do Paiva", "Miradouro do geoparque", "Prova de carne arouquesa"] } },
  { id: "pinhao", name: "Pinhão", lat: 41.1910, lon: -7.5450, terrain: "mountain", vibes: ["viewpoint", "food", "nature"], emoji: "🍇", source: "https://www.visitportugal.com/en/content/slow-travel-in-portugal", copy: { en: "Terraced vineyards, river bends and a road that earns every single viewpoint.", pt: "Vinhas em socalcos, curvas do rio e uma estrada que merece cada miradouro." }, stops: { en: ["Douro viewpoint", "Tile-covered station", "Riverside tasting"], pt: ["Miradouro do Douro", "Estação de azulejos", "Prova junto ao rio"] } },
  { id: "geres", name: "Peneda-Gerês", lat: 41.7280, lon: -8.1620, terrain: "mountain", vibes: ["nature", "viewpoint"], emoji: "🌲", source: "https://www.visitportugal.com/en/content/natural-parks-and-reserves", copy: { en: "Granite mountains, reservoirs and deep-green roads in Portugal’s only national park.", pt: "Montanhas de granito, albufeiras e estradas verdes no único parque nacional de Portugal." }, stops: { en: ["Reservoir road", "Mountain village", "Waterfall viewpoint"], pt: ["Estrada da albufeira", "Aldeia de montanha", "Miradouro da cascata"] } },
  { id: "guimaraes", name: "Guimarães", lat: 41.4430, lon: -8.2910, terrain: "normal", vibes: ["history", "food"], emoji: "👑", source: "https://www.visitportugal.com/en/content/villages-and-towns-portugal", copy: { en: "Medieval squares, granite lanes and a castle at the birthplace of Portugal.", pt: "Praças medievais, ruas de granito e um castelo no berço de Portugal." }, stops: { en: ["Castle grounds", "Historic centre", "Minho lunch"], pt: ["Zona do castelo", "Centro histórico", "Almoço minhoto"] } },
  { id: "costa-nova", name: "Costa Nova", lat: 40.6120, lon: -8.7510, terrain: "coast", vibes: ["coast", "food"], emoji: "🎨", source: "https://www.visitportugal.com/en/destinos/centro-de-portugal", copy: { en: "Striped houses, lagoon light and an easy beach road with a playful mood.", pt: "Casas às riscas, luz da ria e uma estrada de praia com espírito divertido." }, stops: { en: ["Striped houses", "Ria boardwalk", "Ovos moles break"], pt: ["Casas às riscas", "Passadiço da ria", "Pausa para ovos moles"] } },
  { id: "bucaco", name: "Mata do Buçaco", lat: 40.3770, lon: -8.3650, terrain: "mountain", vibes: ["nature", "history"], emoji: "🌿", source: "https://www.visitportugal.com/en/destinos/centro-de-portugal", copy: { en: "A cool green forest, romantic architecture and roads made for a quiet reset.", pt: "Uma floresta fresca, arquitetura romântica e estradas perfeitas para desligar." }, stops: { en: ["Forest gates", "Palace gardens", "Luso water stop"], pt: ["Portas da mata", "Jardins do palácio", "Paragem nas águas do Luso"] } },
  { id: "sortelha", name: "Sortelha", lat: 40.3310, lon: -7.2110, terrain: "mountain", vibes: ["history", "viewpoint", "nature"], emoji: "🏘️", source: "https://www.visitportugal.com/en/content/villages-and-towns-portugal", copy: { en: "A ring of granite walls, silent lanes and a landscape that feels centuries away.", pt: "Um anel de muralhas de granito, ruas silenciosas e uma paisagem a séculos de distância." }, stops: { en: ["Village gate", "Castle rocks", "Cova da Beira view"], pt: ["Porta da aldeia", "Rochedos do castelo", "Vista da Cova da Beira"] } },
  { id: "mira-aire", name: "Mira de Aire", lat: 39.5410, lon: -8.7060, terrain: "normal", vibes: ["nature", "food"], emoji: "🕳️", source: "https://www.visitportugal.com/en/content/natural-parks-and-reserves", copy: { en: "Limestone country above, a vast cave world below, and excellent roads between both.", pt: "Paisagem calcária à superfície, um enorme mundo subterrâneo e boas estradas entre ambos." }, stops: { en: ["Cave visit", "Limestone viewpoint", "Mountain snack"], pt: ["Visita às grutas", "Miradouro calcário", "Petisco serrano"] } },
];

const toRadians = (degrees) => degrees * (Math.PI / 180);
const toDegrees = (radians) => radians * (180 / Math.PI);

export function haversineKm(a, b) {
  const earthRadius = 6371;
  const latDelta = toRadians(b.lat - a.lat);
  const lonDelta = toRadians(b.lon - a.lon);
  const value = Math.sin(latDelta / 2) ** 2 + Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * Math.sin(lonDelta / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}
export function bearingDegrees(a, b) {
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const lonDelta = toRadians(b.lon - a.lon);
  const y = Math.sin(lonDelta) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lonDelta);
  return (toDegrees(Math.atan2(y, x)) + 360) % 360;
}

export function compassDirection(degrees) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(degrees / 45) % 8];
}

export function estimateTrip(origin, destination) {
  const factor = destination.terrain === "mountain" ? 1.28 : destination.terrain === "coast" ? 1.20 : 1.16;
  const distanceKm = Math.max(10, Math.round((haversineKm(origin, destination) * factor) / 5) * 5);
  const speed = destination.terrain === "mountain" ? 58 : destination.terrain === "coast" ? 68 : 74;
  const durationMinutes = Math.max(15, Math.round(((distanceKm / speed) * 60) / 5) * 5);
  return { distanceKm, durationMinutes, bearing: bearingDegrees(origin, destination), direction: compassDirection(bearingDegrees(origin, destination)) };
}

export function formatDuration(minutes, language = "en") {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (!hours) return language === "pt" ? `${remainder} min` : `${remainder} min`;
  if (!remainder) return `${hours}h`;
  return `${hours}h ${String(remainder).padStart(2, "0")}`;
}

export function findCandidates({ origin, maxDistance, vibe = "surprise" }) {
  const matching = destinations.map((destination) => ({ ...destination, trip: estimateTrip(origin, destination) }))
    .filter((destination) => destination.trip.distanceKm >= 15 && (vibe === "surprise" || destination.vibes.includes(vibe)));
  const withinRange = matching.filter((destination) => destination.trip.distanceKm <= maxDistance);
  return (withinRange.length ? withinRange : matching.sort((a, b) => a.trip.distanceKm - b.trip.distanceKm).slice(0, 5));
}

export function pickDestination({ origin, maxDistance, vibe = "surprise", excludeId = "", random = Math.random }) {
  const candidates = findCandidates({ origin, maxDistance, vibe });
  const fresh = candidates.filter((destination) => destination.id !== excludeId);
  const pool = fresh.length ? fresh : candidates;
  return pool[Math.min(pool.length - 1, Math.floor(random() * pool.length))];
}
