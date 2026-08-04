import { destinations, displayEmoji, districts, estimateTrip, findStartMatches, formatDuration, googleDirectionsUrl, googlePlaceUrl, normalizePlaceName, originalSourceLabel, originalSourceUrl, pickDestination, starts, stopMapPoints, stopMapQueries } from "./engine.js?v=18";
import { buildDestinationGuide, sourceLanguage } from "./guide-data.js?v=1";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const LANGUAGE_KEY = "estrelalua-road-trip-language";
const SAVED_KEY = "estrelalua-road-trip-saved-v1";
const COMPLETED_KEY = "estrelalua-road-trip-completed-v1";

const translations = {
  en: {
    searchLocality:"Search or choose a place",placesAvailable:"places available",closestMatches:"Closest available matches",useDistrictCapital:"Use district capital",selectedPlace:"Selected",rangeType:"Range type",byDistance:"Distance",byDuration:"Approx. drive time",
    skip:"Skip to trip builder",allApps:"All apps",savedTrips:"Saved trips",kicker:"Portugal · zero-plan adventures",heroTitle:"Stop planning.",heroEmphasis:"Start wandering.",heroCopy:"Choose the mood. Set your radius. Let the road decide the rest.",noAccount:"No account",noMapKey:"No paid map key",localOnly:"Saved locally",buildKicker:"Build the possibility",builderTitle:"What kind of escape?",builderIntro:"Distances and drive times are useful estimates. Open the route for exact live directions, traffic, tolls, and closures.",startFrom:"Start from",district:"District",locality:"City, town or village",whyThisTrip:"Why this trip",source:"Inspiration source",howFar:"How far?",nearby:"Nearby",dayTrip:"Day trip",weekend:"Weekend",mood:"Pick a mood",surprise:"Surprise",coast:"Coast",nature:"Nature",history:"History",food:"Food",viewpoint:"Viewpoint",spin:"Spin the road",roughRoute:"Your rough route",mapDisclaimer:"A playful visual—not a turn-by-turn map.",todayDetour:"Today’s detour",distance:"Approx. distance",driveTime:"Approx. drive",direction:"Direction",oneWay:"one way",miniPlan:"Your three-stop mini plan",mediumPlan:"A balanced six-idea plan",fullPlan:"Your full destination guide",choosePlanDepth:"Choose your detail",mini:"Mini",medium:"Medium",fullGuide:"Full guide",miniHint:"3 exact places",mediumHint:"6 ideas",fullHint:"Grouped by category",makeItYours:"Make it yours",openInMaps:"Open in Google Maps",searchInMaps:"Search Google Maps",readSource:"Original source",guideNote:"Named places open directly. Discovery ideas open a clearly labelled Google Maps search; confirm availability and opening times before leaving.",visit:"What to visit",do:"What to do",eat:"Where to eat",practical:"Useful stop",spinAgain:"Spin again",saveTrip:"Save trip",saved:"Saved ✓",tripCompleted:"Trip completed",completed:"Completed",openDirections:"Open exact directions",routeNote:"Google Maps provides the exact road route. Check traffic, tolls, weather, access restrictions, and opening times before leaving.",glovebox:"Your glovebox",savedAdventures:"Saved adventures",clearSaved:"Clear saved",openSaved:"Show saved trips",closeSaved:"Hide saved trips",emptySaved:"Nothing saved yet. Spin a trip and keep the ones that feel right.",journeyHistory:"Your road history",completedAdventures:"Completed trips",clearCompleted:"Clear completed",openCompleted:"Show completed trips",closeCompleted:"Hide completed trips",emptyCompleted:"No completed trips yet. Mark a detour completed and it will appear here.",completedDestination:"Visited destination",honestByDesign:"Honest by design",howTitle:"A spark, then the real map.",stepOneTitle:"Pick a possibility",stepOneCopy:"The app draws from official tourism, independent travel guides, and community tips that match your range and mood.",stepTwoTitle:"See the shape of it",stepTwoCopy:"Distance, duration and direction are approximate, so the surprise works without tracking you.",stepThreeTitle:"Open the real road",stepThreeCopy:"When the idea feels right, open Google Maps for the current route and road conditions.",footer:"Made for spontaneous Portuguese roads.",tests:"App tests",from:"From",towards:"towards",sourceTypes:{official:"Official tourism",independent:"Independent guide",community:"Community tip"},directions:{N:"North",NE:"Northeast",E:"East",SE:"Southeast",S:"South",SW:"Southwest",W:"West",NW:"Northwest"}
  },
  pt: {
    searchLocality:"Pesquise ou escolha um local",placesAvailable:"locais disponíveis",closestMatches:"Opções com o nome mais próximo",useDistrictCapital:"Usar capital de distrito",selectedPlace:"Selecionado",rangeType:"Tipo de limite",byDistance:"Distância",byDuration:"Tempo aproximado",
    skip:"Ir para o gerador de viagens",allApps:"Todas as aplicações",savedTrips:"Viagens guardadas",kicker:"Portugal · aventuras sem planos",heroTitle:"Pare de planear.",heroEmphasis:"Comece a explorar.",heroCopy:"Escolha o ambiente. Defina a distância. Deixe a estrada decidir o resto.",noAccount:"Sem conta",noMapKey:"Sem mapas pagos",localOnly:"Guardado localmente",buildKicker:"Crie a possibilidade",builderTitle:"Que tipo de escapadinha?",builderIntro:"As distâncias e os tempos são estimativas úteis. Abra o percurso para obter direções, trânsito, portagens e condicionamentos atuais.",startFrom:"Partida",district:"Distrito",locality:"Cidade, vila ou aldeia",whyThisTrip:"Porquê esta viagem",source:"Fonte de inspiração",howFar:"Até onde?",nearby:"Perto",dayTrip:"Um dia",weekend:"Fim de semana",mood:"Escolha o ambiente",surprise:"Surpresa",coast:"Costa",nature:"Natureza",history:"História",food:"Comida",viewpoint:"Miradouro",spin:"Rodar a estrada",roughRoute:"O seu percurso aproximado",mapDisclaimer:"Uma visualização divertida—não é um mapa de navegação.",todayDetour:"O desvio de hoje",distance:"Distância aproximada",driveTime:"Tempo aproximado",direction:"Direção",oneWay:"só ida",miniPlan:"O seu mini plano de três paragens",mediumPlan:"Um plano equilibrado com seis ideias",fullPlan:"O seu guia completo do destino",choosePlanDepth:"Escolha o nível de detalhe",mini:"Mini",medium:"Médio",fullGuide:"Guia completo",miniHint:"3 locais exatos",mediumHint:"6 ideias",fullHint:"Agrupado por categoria",makeItYours:"Adapte ao seu gosto",openInMaps:"Abrir no Google Maps",searchInMaps:"Pesquisar no Google Maps",readSource:"Fonte original",guideNote:"Os locais identificados abrem diretamente. As ideias de descoberta abrem uma pesquisa claramente identificada no Google Maps; confirme disponibilidade e horários antes de partir.",visit:"O que visitar",do:"O que fazer",eat:"Onde comer",practical:"Paragem útil",spinAgain:"Rodar novamente",saveTrip:"Guardar viagem",saved:"Guardada ✓",tripCompleted:"Viagem concluída",completed:"Concluída",openDirections:"Abrir direções exatas",routeNote:"O Google Maps fornece o percurso rodoviário exato. Verifique trânsito, portagens, meteorologia, acessos e horários antes de partir.",glovebox:"O seu porta-luvas",savedAdventures:"Aventuras guardadas",clearSaved:"Limpar guardadas",openSaved:"Mostrar viagens guardadas",closeSaved:"Ocultar viagens guardadas",emptySaved:"Ainda não guardou nenhuma viagem. Rode uma sugestão e guarde as que lhe agradarem.",journeyHistory:"O seu histórico de estrada",completedAdventures:"Viagens concluídas",clearCompleted:"Limpar concluídas",openCompleted:"Mostrar viagens concluídas",closeCompleted:"Ocultar viagens concluídas",emptyCompleted:"Ainda não concluiu nenhuma viagem. Marque um destino como concluído e aparecerá aqui.",completedDestination:"Destino visitado",honestByDesign:"Honesta por natureza",howTitle:"Primeiro a ideia, depois o mapa real.",stepOneTitle:"Escolha uma possibilidade",stepOneCopy:"A aplicação sorteia sugestões de turismo oficial, guias de viagem independentes e comunidades que correspondem à distância e ao ambiente pretendidos.",stepTwoTitle:"Veja a forma da viagem",stepTwoCopy:"A distância, duração e direção são aproximadas, por isso a surpresa funciona sem o localizar.",stepThreeTitle:"Abra a estrada real",stepThreeCopy:"Quando a ideia parecer certa, abra o Google Maps para ver o percurso e as condições atuais.",footer:"Feita para estradas portuguesas espontâneas.",tests:"Testes da aplicação",from:"De",towards:"em direção a",sourceTypes:{official:"Turismo oficial",independent:"Guia independente",community:"Sugestão da comunidade"},directions:{N:"Norte",NE:"Nordeste",E:"Este",SE:"Sudeste",S:"Sul",SW:"Sudoeste",W:"Oeste",NW:"Noroeste"}
  }
};

let language = "en";
try { language = localStorage.getItem(LANGUAGE_KEY) === "pt" ? "pt" : "en"; } catch {}
let rangeMode = "distance";
let rangeLimit = 180;
let vibe = "surprise";
let currentDestination = null;
let previousDestinationId = "";
let guideDepth = "mini";
const RANGE_BANDS = {
  90: { min: 0, max: 90 },
  180: { min: 90, max: 180 },
  360: { min: 180, max: 360 },
};

const t = (key) => translations[language][key] ?? translations.en[key] ?? key;

function translatePage() {
  document.documentElement.lang = language === "pt" ? "pt-PT" : "en";
  document.title = language === "pt" ? "Roleta de Viagens — EstrelaLuaApps" : "Road Trip Roulette — EstrelaLuaApps";
  $$('[data-i18n]').forEach((element) => { element.textContent = t(element.dataset.i18n); });
  $$('[data-i18n-placeholder]').forEach((element) => { element.placeholder = t(element.dataset.i18nPlaceholder); });
  $$('[data-i18n-aria-label]').forEach((element) => { element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel)); });
  $$('[data-language]').forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.language === language)));
  try { localStorage.setItem(LANGUAGE_KEY, language); } catch {}
  if (currentDestination) renderTrip(currentDestination);
  updateRangeControls();
  renderSaved();
  renderCompleted();
  updateSavedDisclosure();
  updateCompletedDisclosure();
  if ($("#start-city-search")) updateLocalitySearch();
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
  $("#start-city-options").innerHTML = [...localities].sort((a, b) => a.name.localeCompare(b.name, "pt-PT")).map((start) => `<option value="${start.name}"></option>`).join("");
  $("#start-city-search").value = currentOrigin().name;
  $("#locality-feedback").textContent = `${localities.length} ${t("placesAvailable")}`;
  $("#locality-suggestions").replaceChildren();
}

function currentOrigin() { return starts.find((start) => start.id === $("#start-city").value) ?? starts[0]; }

function chooseOrigin(start, shouldSpin = true) {
  if (!start) return;
  $("#start-district").value = start.districtId;
  if (![...$("#start-city").options].some((option) => option.value === start.id)) populateLocalities(start.id);
  $("#start-city").value = start.id;
  $("#start-city-search").value = start.name;
  $("#locality-feedback").textContent = `${t("selectedPlace")}: ${start.name}`;
  $("#locality-suggestions").replaceChildren();
  if (shouldSpin) spin();
}

function updateLocalitySearch() {
  const query = $("#start-city-search").value.trim();
  const districtId = $("#start-district").value;
  const localities = starts.filter((start) => start.districtId === districtId);
  const exact = localities.find((start) => normalizePlaceName(start.name) === normalizePlaceName(query));
  if (exact) {
    $("#start-city").value = exact.id;
    $("#locality-feedback").textContent = `${t("selectedPlace")}: ${exact.name}`;
    $("#locality-suggestions").replaceChildren();
    return exact;
  }
  if (!query) {
    $("#locality-feedback").textContent = `${localities.length} ${t("placesAvailable")}`;
    $("#locality-suggestions").replaceChildren();
    return null;
  }
  const suggestions = findStartMatches(districtId, query, 4);
  $("#locality-feedback").textContent = t("closestMatches");
  $("#locality-suggestions").innerHTML = suggestions.map((start) => `<button type="button" data-origin-id="${start.id}">${start.name}</button>`).join("") + (localities[0] ? `<button type="button" class="capital-fallback" data-origin-id="${localities[0].id}">${t("useDistrictCapital")}: ${localities[0].name}</button>` : "");
  return null;
}

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
  return googleDirectionsUrl(origin, destination, language);
}

function mapsSearchUrl(query, point) {
  return googlePlaceUrl(query, point, language);
}

function rangeArguments() {
  const band = RANGE_BANDS[rangeLimit] ?? RANGE_BANDS[180];
  return rangeMode === "duration"
    ? { minDuration: band.min, maxDuration: band.max }
    : { minDistance: band.min, maxDistance: band.max };
}

function rangeLimitText() {
  const band = RANGE_BANDS[rangeLimit] ?? RANGE_BANDS[180];
  if (rangeMode === "duration") {
    const maximum = `${formatDuration(band.max, language)} ${t("oneWay")}`;
    return band.min ? `> ${formatDuration(band.min, language)}–${maximum}` : `≤ ${maximum}`;
  }
  return band.min ? `> ${band.min}–${band.max} km` : `≤ ${band.max} km`;
}

function updateRangeControls() {
  $$('[data-range-mode]').forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.rangeMode === rangeMode)));
  $$('[data-range]').forEach((button) => {
    const value = Number(button.dataset.range);
    button.setAttribute("aria-pressed", String(value === rangeLimit));
    const label = $('[data-range-label]', button);
    if (label) {
      const band = RANGE_BANDS[value];
      if (rangeMode === "duration") {
        const maximum = `${formatDuration(band.max, language)} ${t("oneWay")}`;
        label.textContent = band.min ? `> ${formatDuration(band.min, language)}–${maximum}` : `≤ ${maximum}`;
      } else {
        label.textContent = band.min ? `> ${band.min}–${band.max} km` : `≤ ${band.max} km`;
      }
    }
  });
}

function recommendationReason(destination, trip) {
  const band = RANGE_BANDS[rangeLimit] ?? RANGE_BANDS[180];
  const value = rangeMode === "duration" ? trip.durationMinutes : trip.distanceKm;
  const withinRange = value > band.min && value <= band.max;
  const range = rangeLimitText();
  const matchesVibe = vibe === "surprise" || destination.vibes.includes(vibe);
  if (language === "pt") {
    if (!withinRange) return `Esta viagem guardada ou partilhada fica fora do intervalo selecionado de ${range}.`;
    if (!matchesVibe) return `Não havia uma opção de ${t(vibe).toLowerCase()} neste intervalo, por isso esta sugestão respeita ${range}.`;
    return vibe === "surprise" ? `Respeita o intervalo de ${range} e acrescenta variedade ao sorteio.` : `Corresponde ao tema ${t(vibe).toLowerCase()} e respeita o intervalo de ${range}.`;
  }
  if (!withinRange) return `This saved or shared trip falls outside the selected ${range} range.`;
  if (!matchesVibe) return `No ${t(vibe).toLowerCase()} option was available in this band, so this suggestion stays within ${range}.`;
  return vibe === "surprise" ? `Stays within ${range} and adds variety to the draw.` : `Matches ${t(vibe).toLowerCase()} and stays within ${range}.`;
}

function guideItemCard(item) {
  const label = item.label[language] ?? item.label.en;
  const mapsLabel = item.kind === "place" ? t("openInMaps") : t("searchInMaps");
  return `<article class="guide-item ${item.kind === "search" ? "is-discovery" : "is-place"}">
    <strong>${label}</strong>
    <div class="guide-item-links">
      <a class="guide-map-link" href="${mapsSearchUrl(item.query, item.point)}" target="_blank" rel="noopener noreferrer">${mapsLabel} <span aria-hidden="true">↗</span></a>
      <a class="guide-source-link" href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer"><span>${t("readSource")}</span><b>${item.sourceLabel}</b><i>${sourceLanguage(item.sourceUrl)}</i></a>
    </div>
  </article>`;
}

function renderGuide(destination) {
  const guide = buildDestinationGuide(destination, stopMapQueries[destination.id], stopMapPoints[destination.id]);
  const titleKey = guideDepth === "full" ? "fullPlan" : guideDepth === "medium" ? "mediumPlan" : "miniPlan";
  $("#plan-title").textContent = t(titleKey);
  $("#guide-note").textContent = t("guideNote");
  $$('[data-guide-depth]').forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.guideDepth === guideDepth)));
  if (guideDepth !== "full") {
    $("#guide-content").innerHTML = `<div class="guide-grid ${guideDepth}">${guide[guideDepth].map(guideItemCard).join("")}</div>`;
    return;
  }
  const categories = ["visit", "do", "eat", "practical"];
  $("#guide-content").innerHTML = `<div class="guide-categories">${categories.map((category) => {
    const items = guide.full.filter((item) => item.category === category);
    return `<section class="guide-category"><h4>${t(category)}</h4><div class="guide-grid">${items.map(guideItemCard).join("")}</div></section>`;
  }).join("")}</div>`;
}

function renderTrip(destination, updateUrl = true) {
  const origin = currentOrigin();
  const trip = estimateTrip(origin, destination);
  currentDestination = { ...destination, trip };
  $("#destination-eyebrow").textContent = t("todayDetour");
  $("#destination-name").textContent = destination.name;
  $("#destination-emoji").textContent = displayEmoji(destination);
  $("#destination-copy").textContent = destination.copy[language];
  const sourceType = destination.sourceType && typeof destination.sourceType === "object" ? destination.sourceType.pt ?? destination.sourceType.en : destination.sourceType ?? "official";
  const sourceName = originalSourceLabel(destination.sourceLabel, "Destination guide");
  $("#match-reason").textContent = recommendationReason(destination, trip);
  $("#source-type").textContent = `${t("source")} · ${translations[language].sourceTypes[sourceType]}`;
  $("#source-name").textContent = sourceName;
  $("#source-link").href = originalSourceUrl(destination.source);
  $("#source-link").setAttribute("aria-label", `${t("source")}: ${sourceName}`);
  $("#route-label").textContent = `${origin.name} → ${destination.name}`;
  $("#distance-value").textContent = `${trip.distanceKm} km`;
  $("#duration-value").textContent = formatDuration(trip.durationMinutes, language);
  $("#direction-value").textContent = translations[language].directions[trip.direction];
  $("#bearing-value").textContent = `${trip.direction} · ${Math.round(trip.bearing)}°`;
  renderGuide(destination);
  $("#maps-link").href = mapsUrl(origin, destination);
  $("#save-trip").textContent = isSaved(origin.id, destination.id) ? t("saved") : t("saveTrip");
  updateCompletionState(destination.id);
  updateMap(origin, destination);
  if (updateUrl) {
    const query = new URLSearchParams({ district: origin.districtId, from: origin.id, to: destination.id, range: String(rangeLimit), rangeMode, vibe, plan: guideDepth, lang: language });
    history.replaceState(null, "", `${location.pathname}?${query}`);
  }
}

function spin() {
  const choice = pickDestination({ origin: currentOrigin(), ...rangeArguments(), vibe, excludeId: previousDestinationId });
  if (!choice) return;
  previousDestinationId = choice.id;
  renderTrip(choice);
  $("#trip-result").classList.remove("reveal-trip");
  requestAnimationFrame(() => $("#trip-result").classList.add("reveal-trip"));
}

function savedTrips() { try { return JSON.parse(localStorage.getItem(SAVED_KEY)) ?? []; } catch { return []; } }
function isSaved(originId, destinationId) { return savedTrips().some((trip) => trip.originId === originId && trip.destinationId === destinationId); }
function completedDestinations() {
  try {
    const completed = JSON.parse(localStorage.getItem(COMPLETED_KEY));
    return Array.isArray(completed) ? completed.filter((id) => typeof id === "string") : [];
  } catch { return []; }
}
function isCompleted(destinationId) { return completedDestinations().includes(destinationId); }

function setCompleted(destinationId, completed) {
  const destinationsDone = new Set(completedDestinations());
  if (completed) destinationsDone.add(destinationId); else destinationsDone.delete(destinationId);
  try { localStorage.setItem(COMPLETED_KEY, JSON.stringify([...destinationsDone])); } catch {}
}

function updateCompletionState(destinationId) {
  const completed = isCompleted(destinationId);
  $("#trip-completed").checked = completed;
  $("#trip-completion-control").classList.toggle("is-completed", completed);
  $("#trip-result").classList.toggle("trip-completed", completed);
}

function saveCurrent() {
  if (!currentDestination) return;
  const origin = currentOrigin();
  const saved = savedTrips();
  if (!saved.some((trip) => trip.originId === origin.id && trip.destinationId === currentDestination.id)) {
    saved.unshift({ originId: origin.id, destinationId: currentDestination.id, rangeLimit, rangeMode, vibe });
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(saved.slice(0, 12))); } catch {}
  }
  $("#save-trip").textContent = t("saved");
  renderSaved();
}

function renderSaved() {
  const saved = savedTrips();
  $("#clear-saved").disabled = saved.length === 0;
  $("#saved-list").innerHTML = saved.length ? saved.map((trip) => {
    const origin = starts.find((item) => item.id === trip.originId);
    const destination = destinations.find((item) => item.id === trip.destinationId);
    if (!origin || !destination) return "";
    const estimate = estimateTrip(origin, destination);
    const savedRange = trip.rangeLimit ?? trip.maxDistance ?? 180;
    const savedMode = trip.rangeMode === "duration" ? "duration" : "distance";
    const completed = isCompleted(destination.id);
    return `<article class="saved-card${completed ? " is-completed" : ""}"><button type="button" data-saved-origin="${origin.id}" data-saved-destination="${destination.id}" data-saved-range="${savedRange}" data-saved-range-mode="${savedMode}" data-saved-vibe="${trip.vibe}"><span>${t("from")} ${origin.name}</span><h3><i class="saved-emoji" aria-hidden="true">${displayEmoji(destination)}</i> ${destination.name}</h3><p><span>${estimate.distanceKm} km · ${formatDuration(estimate.durationMinutes, language)}</span>${completed ? `<b class="completed-badge">✓ ${t("completed")}</b>` : ""}</p></button></article>`;
  }).join("") : `<p class="empty-saved">${t("emptySaved")}</p>`;
}

function renderCompleted() {
  const completed = completedDestinations().map((id) => destinations.find((item) => item.id === id)).filter(Boolean).reverse();
  $("#clear-completed").disabled = completed.length === 0;
  $("#completed-list").innerHTML = completed.length ? completed.map((destination) => `
    <article class="saved-card is-completed"><button type="button" data-completed-destination="${destination.id}"><span>${t("completedDestination")}</span><h3><i class="saved-emoji" aria-hidden="true">${displayEmoji(destination)}</i> ${destination.name}</h3><p><b class="completed-badge">✓ ${t("completed")}</b></p></button></article>
  `).join("") : `<p class="empty-saved">${t("emptyCompleted")}</p>`;
}

function updateSavedDisclosure() {
  const expanded = $("#saved-toggle").getAttribute("aria-expanded") === "true";
  $("#saved-content").hidden = !expanded;
  $("#saved-toggle-label").textContent = t(expanded ? "closeSaved" : "openSaved");
  $("#saved-toggle").setAttribute("aria-label", t(expanded ? "closeSaved" : "openSaved"));
}

function setSavedExpanded(expanded) {
  $("#saved-toggle").setAttribute("aria-expanded", String(expanded));
  updateSavedDisclosure();
}

function updateCompletedDisclosure() {
  const expanded = $("#completed-toggle").getAttribute("aria-expanded") === "true";
  $("#completed-content").hidden = !expanded;
  $("#completed-toggle-label").textContent = t(expanded ? "closeCompleted" : "openCompleted");
  $("#completed-toggle").setAttribute("aria-label", t(expanded ? "closeCompleted" : "openCompleted"));
}

function setCompletedExpanded(expanded) {
  $("#completed-toggle").setAttribute("aria-expanded", String(expanded));
  updateCompletedDisclosure();
}

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
  const requestedRangeMode = query.get("rangeMode");
  const requestedVibe = query.get("vibe");
  const requestedPlan = query.get("plan");
  if (origin) {
    $("#start-district").value = origin.districtId;
    populateLocalities(origin.id);
  }
  if ([90,180,360].includes(range)) rangeLimit = range;
  if (["distance","duration"].includes(requestedRangeMode)) rangeMode = requestedRangeMode;
  if (["surprise","coast","nature","history","food","viewpoint"].includes(requestedVibe)) vibe = requestedVibe;
  if (["mini","medium","full"].includes(requestedPlan)) guideDepth = requestedPlan;
  updateRangeControls();
  $$("[data-vibe]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.vibe === vibe)));
  if (destination) renderTrip(destination, false); else spin();
}

$("#spin-button").addEventListener("click", spin);
$("#spin-again").addEventListener("click", spin);
$("#save-trip").addEventListener("click", saveCurrent);
$("#trip-completed").addEventListener("change", (event) => {
  if (!currentDestination) return;
  setCompleted(currentDestination.id, event.target.checked);
  updateCompletionState(currentDestination.id);
  renderSaved();
  renderCompleted();
});
$("#saved-toggle").addEventListener("click", () => setSavedExpanded($("#saved-toggle").getAttribute("aria-expanded") !== "true"));
$("#clear-saved").addEventListener("click", () => { try { localStorage.removeItem(SAVED_KEY); } catch {} renderSaved(); });
$("#completed-toggle").addEventListener("click", () => setCompletedExpanded($("#completed-toggle").getAttribute("aria-expanded") !== "true"));
$("#clear-completed").addEventListener("click", () => {
  try { localStorage.removeItem(COMPLETED_KEY); } catch {}
  if (currentDestination) updateCompletionState(currentDestination.id);
  renderSaved();
  renderCompleted();
});
$("#saved-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-saved-destination]");
  if (!button) return;
  const savedOrigin = starts.find((item) => item.id === button.dataset.savedOrigin);
  if (!savedOrigin) return;
  $("#start-district").value = savedOrigin.districtId;
  populateLocalities(savedOrigin.id);
  rangeLimit = Number(button.dataset.savedRange); rangeMode = button.dataset.savedRangeMode === "duration" ? "duration" : "distance"; vibe = button.dataset.savedVibe;
  updateRangeControls();
  $$("[data-vibe]").forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.vibe === vibe)));
  const destination = destinations.find((item) => item.id === button.dataset.savedDestination); if (destination) renderTrip(destination);
  $("#trip-result").scrollIntoView({ behavior: "smooth", block: "start" });
});
$("#completed-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-completed-destination]");
  if (!button) return;
  const destination = destinations.find((item) => item.id === button.dataset.completedDestination);
  if (!destination) return;
  renderTrip(destination);
  $("#trip-result").scrollIntoView({ behavior: "smooth", block: "start" });
});
$("#start-district").addEventListener("change", () => { populateLocalities(""); spin(); });
$("#start-city-search").addEventListener("input", updateLocalitySearch);
$("#start-city-search").addEventListener("change", () => { const exact = updateLocalitySearch(); if (exact) chooseOrigin(exact); });
$("#locality-suggestions").addEventListener("click", (event) => { const button = event.target.closest("[data-origin-id]"); if (button) chooseOrigin(starts.find((start) => start.id === button.dataset.originId)); });
$$('[data-range]').forEach((button) => button.addEventListener("click", () => { rangeLimit = Number(button.dataset.range); updateRangeControls(); }));
$$('[data-range-mode]').forEach((button) => button.addEventListener("click", () => { rangeMode = button.dataset.rangeMode; updateRangeControls(); }));
$$('[data-vibe]').forEach((button) => button.addEventListener("click", () => { vibe = button.dataset.vibe; $$('[data-vibe]').forEach((item) => item.setAttribute("aria-pressed", String(item === button))); }));
$$('[data-guide-depth]').forEach((button) => button.addEventListener("click", () => {
  guideDepth = button.dataset.guideDepth;
  if (currentDestination) renderTrip(currentDestination);
}));
$$('[data-language]').forEach((button) => button.addEventListener("click", () => { language = button.dataset.language; translatePage(); }));

populateDistricts();
populateLocalities();
translatePage();
restoreFromUrl();
renderSaved();
renderCompleted();
updateCompletedDisclosure();
