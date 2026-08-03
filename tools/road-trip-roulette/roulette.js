import { destinations, districts, estimateTrip, formatDuration, pickDestination, starts } from "./engine.js?v=3";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const LANGUAGE_KEY = "estrelalua-road-trip-language";
const SAVED_KEY = "estrelalua-road-trip-saved-v1";

const translations = {
  en: {
    skip:"Skip to trip builder",allApps:"All apps",savedTrips:"Saved trips",kicker:"Portugal · zero-plan adventures",heroTitle:"Stop planning.",heroEmphasis:"Start wandering.",heroCopy:"Choose the mood. Set your radius. Let the road decide the rest.",noAccount:"No account",noMapKey:"No paid map key",localOnly:"Saved locally",buildKicker:"Build the possibility",builderTitle:"What kind of escape?",builderIntro:"Distances and drive times are useful estimates. Open the route for exact live directions, traffic, tolls, and closures.",startFrom:"Start from",district:"District",locality:"City, town or village",whyThisTrip:"Why this trip",source:"Inspiration source",howFar:"How far?",nearby:"Nearby",dayTrip:"Day trip",weekend:"Weekend",mood:"Pick a mood",surprise:"Surprise",coast:"Coast",nature:"Nature",history:"History",food:"Food",viewpoint:"Viewpoint",spin:"Spin the road",roughRoute:"Your rough route",mapDisclaimer:"A playful visual—not a turn-by-turn map.",todayDetour:"Today’s detour",distance:"Approx. distance",driveTime:"Approx. drive",direction:"Direction",oneWay:"one way",miniPlan:"Your three-stop mini plan",makeItYours:"Make it yours",spinAgain:"Spin again",saveTrip:"Save trip",saved:"Saved ✓",openDirections:"Open exact directions",routeNote:"Google Maps provides the exact road route. Check traffic, tolls, weather, access restrictions, and opening times before leaving.",glovebox:"Your glovebox",savedAdventures:"Saved adventures",clearSaved:"Clear saved",emptySaved:"Nothing saved yet. Spin a trip and keep the ones that feel right.",honestByDesign:"Honest by design",howTitle:"A spark, then the real map.",stepOneTitle:"Pick a possibility",stepOneCopy:"The app draws from official tourism, independent travel guides, and community tips that match your range and mood.",stepTwoTitle:"See the shape of it",stepTwoCopy:"Distance, duration and direction are approximate, so the surprise works without tracking you.",stepThreeTitle:"Open the real road",stepThreeCopy:"When the idea feels right, open Google Maps for the current route and road conditions.",footer:"Made for spontaneous Portuguese roads.",tests:"App tests",from:"From",towards:"towards",sourceTypes:{official:"Official tourism",independent:"Independent guide",community:"Community tip"},directions:{N:"North",NE:"Northeast",E:"East",SE:"Southeast",S:"South",SW:"Southwest",W:"West",NW:"Northwest"}
  },
  pt: {
    skip:"Ir para o gerador de viagens",allApps:"Todas as aplicações",savedTrips:"Viagens guardadas",kicker:"Portugal · aventuras sem planos",heroTitle:"Pare de planear.",heroEmphasis:"Comece a explorar.",heroCopy:"Escolha o ambiente. Defina a distância. Deixe a estrada decidir o resto.",noAccount:"Sem conta",noMapKey:"Sem mapas pagos",localOnly:"Guardado localmente",buildKicker:"Crie a possibilidade",builderTitle:"Que tipo de escapadinha?",builderIntro:"As distâncias e os tempos são estimativas úteis. Abra o percurso para obter direções, trânsito, portagens e condicionamentos atuais.",startFrom:"Partida",district:"Distrito",locality:"Cidade, vila ou aldeia",whyThisTrip:"Porquê esta viagem",source:"Fonte de inspiração",howFar:"Até onde?",nearby:"Perto",dayTrip:"Um dia",weekend:"Fim de semana",mood:"Escolha o ambiente",surprise:"Surpresa",coast:"Costa",nature:"Natureza",history:"História",food:"Comida",viewpoint:"Miradouro",spin:"Rodar a estrada",roughRoute:"O seu percurso aproximado",mapDisclaimer:"Uma visualização divertida—não é um mapa de navegação.",todayDetour:"O desvio de hoje",distance:"Distância aproximada",driveTime:"Tempo aproximado",direction:"Direção",oneWay:"só ida",miniPlan:"O seu mini plano de três paragens",makeItYours:"Adapte ao seu gosto",spinAgain:"Rodar novamente",saveTrip:"Guardar viagem",saved:"Guardada ✓",openDirections:"Abrir direções exatas",routeNote:"O Google Maps fornece o percurso rodoviário exato. Verifique trânsito, portagens, meteorologia, acessos e horários antes de partir.",glovebox:"O seu porta-luvas",savedAdventures:"Aventuras guardadas",clearSaved:"Limpar guardadas",emptySaved:"Ainda não guardou nenhuma viagem. Rode uma sugestão e guarde as que lhe agradarem.",honestByDesign:"Honesta por natureza",howTitle:"Primeiro a ideia, depois o mapa real.",stepOneTitle:"Escolha uma possibilidade",stepOneCopy:"A aplicação sorteia sugestões de turismo oficial, guias de viagem independentes e comunidades que correspondem à distância e ao ambiente pretendidos.",stepTwoTitle:"Veja a forma da viagem",stepTwoCopy:"A distância, duração e direção são aproximadas, por isso a surpresa funciona sem o localizar.",stepThreeTitle:"Abra a estrada real",stepThreeCopy:"Quando a ideia parecer certa, abra o Google Maps para ver o percurso e as condições atuais.",footer:"Feita para estradas portuguesas espontâneas.",tests:"Testes da aplicação",from:"De",towards:"em direção a",sourceTypes:{official:"Turismo oficial",independent:"Guia independente",community:"Sugestão da comunidade"},directions:{N:"Norte",NE:"Nordeste",E:"Este",SE:"Sudeste",S:"Sul",SW:"Sudoeste",W:"Oeste",NW:"Noroeste"}
  }
};

let language = "en";
try { language = localStorage.getItem(LANGUAGE_KEY) === "pt" ? "pt" : "en"; } catch {}
let maxDistance = 180;
let vibe = "surprise";
let currentDestination = null;
let previousDestinationId = "";

const t = (key) => translations[language][key] ?? translations.en[key] ?? key;

function translatePage() {
  document.documentElement.lang = language === "pt" ? "pt-PT" : "en";
  document.title = language === "pt" ? "Roleta de Viagens — EstrelaLuaApps" : "Road Trip Roulette — EstrelaLuaApps";
  $$('[data-i18n]').forEach((element) => { element.textContent = t(element.dataset.i18n); });
  $$('[data-language]').forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.language === language)));
  try { localStorage.setItem(LANGUAGE_KEY, language); } catch {}
  if (currentDestination) renderTrip(currentDestination);
  renderSaved();
}

function populateDistricts(selectedId = "santarem") {
  $("#start-district").innerHTML = districts.map((district) => `<option value="${district.id}">${district.name}</option>`).join("");
  $("#start-district").value = districts.some((district) => district.id === selectedId) ? selectedId : "santarem";
}

function populateLocalities(selectedId = "torres-novas") {
  const districtId = $("#start-district").value;
  const localities = starts.filter((start) => start.districtId === districtId);
  $("#start-city").innerHTML = localities.map((start) => `<option value="${start.id}">${start.name}</option>`).join("");
  $("#start-city").value = localities.some((start) => start.id === selectedId) ? selectedId : localities[0]?.id ?? "";
}

function currentOrigin() { return starts.find((start) => start.id === $("#start-city").value) ?? starts[0]; }

function mapPoint(place) {
  const x = 104 + ((place.lon + 9.55) / 3.45) * 190;
  const y = 24 + ((42.15 - place.lat) / 5.25) * 548;
  return { x: Math.max(88, Math.min(304, x)), y: Math.max(22, Math.min(574, y)) };
}

function updateMap(origin, destination) {
  const start = mapPoint(origin);
  const end = mapPoint(destination);
  [["#origin-halo",start],["#origin-dot",start],["#destination-halo",end],["#destination-dot",end]].forEach(([selector,point]) => { $(selector).setAttribute("cx",point.x); $(selector).setAttribute("cy",point.y); });
  $("#route-line").setAttribute("x1",start.x); $("#route-line").setAttribute("y1",start.y); $("#route-line").setAttribute("x2",end.x); $("#route-line").setAttribute("y2",end.y);
  const originLabel = $("#origin-map-label"); originLabel.setAttribute("x",start.x + 12); originLabel.setAttribute("y",start.y - 12); originLabel.textContent = origin.name;
  const destinationLabel = $("#destination-map-label"); destinationLabel.setAttribute("x",end.x + 12); destinationLabel.setAttribute("y",end.y + 22); destinationLabel.textContent = destination.name;
}

function mapsUrl(origin, destination) {
  const params = new URLSearchParams({ api: "1", origin: `${origin.name}, Portugal`, destination: `${destination.name}, Portugal`, travelmode: "driving" });
  return `https://www.google.com/maps/dir/?${params}`;
}

function recommendationReason(trip) {
  const withinRange = trip.distanceKm <= maxDistance;
  if (language === "pt") {
    if (!withinRange) return vibe === "surprise" ? `Uma das opções variadas mais próximas quando nenhuma corresponde ao limite de ${maxDistance} km.` : `Uma das opções de ${t(vibe).toLowerCase()} mais próximas quando nenhuma corresponde ao limite de ${maxDistance} km.`;
    return vibe === "surprise" ? `Cabe no seu limite de ≤ ${maxDistance} km e acrescenta variedade ao sorteio.` : `Corresponde ao tema ${t(vibe).toLowerCase()} e cabe no seu limite de ≤ ${maxDistance} km.`;
  }
  if (!withinRange) return vibe === "surprise" ? `One of the closest varied options when nothing matches the ${maxDistance} km limit.` : `One of the closest ${t(vibe).toLowerCase()} options when nothing matches the ${maxDistance} km limit.`;
  return vibe === "surprise" ? `Fits your ≤ ${maxDistance} km limit and adds variety to the draw.` : `Matches ${t(vibe).toLowerCase()} and fits your ≤ ${maxDistance} km limit.`;
}

function renderTrip(destination, updateUrl = true) {
  const origin = currentOrigin();
  const trip = estimateTrip(origin, destination);
  currentDestination = { ...destination, trip };
  $("#destination-eyebrow").textContent = t("todayDetour");
  $("#destination-name").textContent = destination.name;
  $("#destination-emoji").textContent = destination.emoji;
  $("#destination-copy").textContent = destination.copy[language];
  const sourceType = destination.sourceType ?? "official";
  const sourceName = destination.sourceLabel ?? "Visit Portugal";
  $("#match-reason").textContent = recommendationReason(trip);
  $("#source-type").textContent = `${t("source")} · ${translations[language].sourceTypes[sourceType]}`;
  $("#source-name").textContent = sourceName;
  $("#source-link").href = destination.source;
  $("#source-link").setAttribute("aria-label", `${t("source")}: ${sourceName}`);
  $("#route-label").textContent = `${origin.name} → ${destination.name}`;
  $("#distance-value").textContent = `${trip.distanceKm} km`;
  $("#duration-value").textContent = formatDuration(trip.durationMinutes, language);
  $("#direction-value").textContent = translations[language].directions[trip.direction];
  $("#bearing-value").textContent = `${trip.direction} · ${Math.round(trip.bearing)}°`;
  $("#stops-list").innerHTML = destination.stops[language].map((stop) => `<li>${stop}</li>`).join("");
  $("#maps-link").href = mapsUrl(origin, destination);
  $("#save-trip").textContent = isSaved(origin.id, destination.id) ? t("saved") : t("saveTrip");
  updateMap(origin, destination);
  if (updateUrl) {
    const query = new URLSearchParams({ district: origin.districtId, from: origin.id, to: destination.id, range: String(maxDistance), vibe, lang: language });
    history.replaceState(null, "", `${location.pathname}?${query}`);
  }
}

function spin() {
  const choice = pickDestination({ origin: currentOrigin(), maxDistance, vibe, excludeId: previousDestinationId });
  if (!choice) return;
  previousDestinationId = choice.id;
  renderTrip(choice);
  $("#trip-result").classList.remove("reveal-trip");
  requestAnimationFrame(() => $("#trip-result").classList.add("reveal-trip"));
}

function savedTrips() { try { return JSON.parse(localStorage.getItem(SAVED_KEY)) ?? []; } catch { return []; } }
function isSaved(originId, destinationId) { return savedTrips().some((trip) => trip.originId === originId && trip.destinationId === destinationId); }

function saveCurrent() {
  if (!currentDestination) return;
  const origin = currentOrigin();
  const saved = savedTrips();
  if (!saved.some((trip) => trip.originId === origin.id && trip.destinationId === currentDestination.id)) {
    saved.unshift({ originId: origin.id, destinationId: currentDestination.id, maxDistance, vibe });
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(saved.slice(0, 12))); } catch {}
  }
  $("#save-trip").textContent = t("saved");
  renderSaved();
}

function renderSaved() {
  const saved = savedTrips();
  $("#saved-list").innerHTML = saved.length ? saved.map((trip) => {
    const origin = starts.find((item) => item.id === trip.originId);
    const destination = destinations.find((item) => item.id === trip.destinationId);
    if (!origin || !destination) return "";
    const estimate = estimateTrip(origin, destination);
    return `<article class="saved-card"><button type="button" data-saved-origin="${origin.id}" data-saved-destination="${destination.id}" data-saved-range="${trip.maxDistance}" data-saved-vibe="${trip.vibe}"><span>${t("from")} ${origin.name}</span><h3>${destination.emoji} ${destination.name}</h3><p>${estimate.distanceKm} km · ${formatDuration(estimate.durationMinutes, language)}</p></button></article>`;
  }).join("") : `<p class="empty-saved">${t("emptySaved")}</p>`;
}

function showSaved() { $("#saved-section").hidden = false; renderSaved(); $("#saved-section").scrollIntoView({ behavior: "smooth", block: "start" }); }

function restoreFromUrl() {
  const query = new URLSearchParams(location.search);
  const requestedLanguage = query.get("lang");
  if (requestedLanguage === "pt" || requestedLanguage === "en") {
    language = requestedLanguage;
    translatePage();
  }
  const origin = starts.find((item) => item.id === query.get("from"));
  const destination = destinations.find((item) => item.id === query.get("to"));
  const range = Number(query.get("range"));
  const requestedVibe = query.get("vibe");
  if (origin) {
    $("#start-district").value = origin.districtId;
    populateLocalities(origin.id);
  }
  if ([90,180,360].includes(range)) maxDistance = range;
  if (["surprise","coast","nature","history","food","viewpoint"].includes(requestedVibe)) vibe = requestedVibe;
  $$("[data-range]").forEach((button) => button.setAttribute("aria-pressed", String(Number(button.dataset.range) === maxDistance)));
  $$("[data-vibe]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.vibe === vibe)));
  if (destination) renderTrip(destination, false); else spin();
}

$("#spin-button").addEventListener("click", spin);
$("#spin-again").addEventListener("click", spin);
$("#save-trip").addEventListener("click", saveCurrent);
$("#saved-nav").addEventListener("click", showSaved);
$("#clear-saved").addEventListener("click", () => { try { localStorage.removeItem(SAVED_KEY); } catch {} renderSaved(); });
$("#saved-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-saved-destination]");
  if (!button) return;
  const savedOrigin = starts.find((item) => item.id === button.dataset.savedOrigin);
  if (!savedOrigin) return;
  $("#start-district").value = savedOrigin.districtId;
  populateLocalities(savedOrigin.id);
  maxDistance = Number(button.dataset.savedRange); vibe = button.dataset.savedVibe;
  $$("[data-range]").forEach((item) => item.setAttribute("aria-pressed", String(Number(item.dataset.range) === maxDistance)));
  $$("[data-vibe]").forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.vibe === vibe)));
  const destination = destinations.find((item) => item.id === button.dataset.savedDestination); if (destination) renderTrip(destination);
  $("#trip-result").scrollIntoView({ behavior: "smooth", block: "start" });
});
$("#start-district").addEventListener("change", () => { populateLocalities(); spin(); });
$("#start-city").addEventListener("change", spin);
$$('[data-range]').forEach((button) => button.addEventListener("click", () => { maxDistance = Number(button.dataset.range); $$('[data-range]').forEach((item) => item.setAttribute("aria-pressed", String(item === button))); }));
$$('[data-vibe]').forEach((button) => button.addEventListener("click", () => { vibe = button.dataset.vibe; $$('[data-vibe]').forEach((item) => item.setAttribute("aria-pressed", String(item === button))); }));
$$('[data-language]').forEach((button) => button.addEventListener("click", () => { language = button.dataset.language; translatePage(); }));

populateDistricts();
populateLocalities();
translatePage();
restoreFromUrl();
renderSaved();
