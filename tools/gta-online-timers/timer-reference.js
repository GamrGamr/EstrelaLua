import { timerRecords } from "./timer-data.js";
import { timerTranslationsPt } from "./timer-translations-pt.js";
import { applyTranslations, createLanguageSwitch, getLanguage, saveLanguage } from "../../assets/i18n-core.js";

const STORAGE_KEY = "gtaOnlineTimerTracker.v1";
const TRACKER_COLLAPSED_KEY = "gtaOnlineTimerTrackerCollapsed.v1";
const nonCountdownTypes = new Set(["Daily reset", "Weekly reset", "Variable gate"]);
const recordsById = new Map(timerRecords.map((record) => [record.id, record]));

const translations = {
  en: {
    description: "Search sourced GTA Online cooldowns, production times, mission limits, deliveries, and resets.", skip: "Skip to timers", home: "EstrelaLuaApps home", nav: "App navigation", allApps: "All apps", about: "About", liveTracker: "Live tracker", activeTimers: "Active timers", clearFinished: "Clear finished", showLess: "Show less", showAll: "Show all", kicker: "Unofficial player reference · verified 30 Aug 2026", title: "Know what is", titleEm: "ready next.", intro: "Search cooldowns, mission clocks, production cycles, deliveries, and resets across GTA Online. Start a timer on any fixed-duration record and keep playing while it counts down.", evidenceLabels: "Evidence labels", official: "Official", officialCopy: "Rockstar publishes the rule.", crosschecked: "Cross-checked", crosscheckedCopy: "Current specialist or wiki evidence.", variable: "Variable", variableCopy: "The game does not expose one fixed number.", timerRecords: "timer records", businessGroups: "business groups", officiallyDocumented: "officially documented", currentUpdate: "current title update", findTimer: "Find a timer", filterDatabase: "Filter the database", reset: "Reset", search: "Search", searchPlaceholder: "Try Cayo, Nightclub, supplies...", businessCategory: "Business or category", allCategories: "All categories", timerType: "Timer type", allTypes: "All timer types", scope: "Scope", anyScope: "Any scope", propertyScope: "Property / business specific", global: "Global", accountScope: "Character / account", activityScope: "Activity specific", somethingElse: "Can I do something else?", either: "Either", yes: "Yes", limited: "Limited", no: "No", important: "Important", importantCopy: "Event weeks, GTA+ benefits, platform changes, and later title updates can override normal values. Open the source and check the condition shown on each record.", timerLibrary: "Timer library", matchingRecords: "matching records", sort: "Sort", category: "Category", shortest: "Shortest first", activityName: "Activity name", recentlyVerified: "Recently verified", noMatch: "No timer matches those filters.", noMatchCopy: "Reset the filters or try a broader search.", verification: "How verification works", methodTitle: "Useful without pretending every number is official.", rockstarFirst: "Rockstar first", rockstarCopy: "Support articles, title update notes, and Newswire posts are used whenever Rockstar publishes the rule.", currentChecks: "Current cross-checks", checksCopy: "For hidden timers, the database uses current GTA Wiki pages and recent hands-on specialist guides rather than memory or old forum guesses.", uncertainty: "Uncertainty stays visible", uncertaintyCopy: "Random arrival checks, route-dependent limits, and call-gated reruns are labelled as variable instead of flattened into a false exact number.", footer: "Unofficial fan-made reference. Grand Theft Auto, GTA Online, Rockstar Games, and related marks belong to their respective owners.", legal: "Trademark & copyright", aboutApp: "About this app", details: "Details", propertySpecific: "Property specific", characterAccount: "Character / account", activitySpecific: "Activity specific", otherAvailable: "Other work available", otherLimited: "Other work with limits", currentOnly: "Current activity only", useWaiting: "Use the waiting time", checkCondition: "Check the condition", activeMission: "Active mission", whatStarts: "What starts it", canElse: "Can I do something else?", conditions: "Conditions and exceptions", verified: "Verified", referenceOnly: "Reference only", noCountdown: "This entry does not have one dependable start-to-finish countdown.", trackTimer: "Track this timer", shortestHint: "The shortest listed value is prefilled. Adjust it for your crew, upgrades, or condition.", fixedHint: "The verified duration is prefilled, and you can adjust it before starting.", minutes: "Minutes", startTimer: "Start timer", startAgain: "Start again", restartTimer: "Restart timer", ready: "Ready", running: "Running", readyNow: "Ready now", remove: "Remove", resetTimer: "Reset", completeCatalogue: "Showing the complete verified catalogue", searchPrefix: "Search", runningCount: "running", readyCount: "ready", second: "sec", hour: "hr", day: "d",
  },
  pt: {
    description: "Pesquise tempos de espera, produção, limites de missões, entregas e reinícios verificados do GTA Online.", skip: "Saltar para os temporizadores", home: "Página inicial da EstrelaLuaApps", nav: "Navegação da aplicação", allApps: "Todas as apps", about: "Sobre", liveTracker: "Rastreador em tempo real", activeTimers: "Temporizadores ativos", clearFinished: "Limpar concluídos", showLess: "Mostrar menos", showAll: "Mostrar todos", kicker: "Referência não oficial · verificada em 30 ago 2026", title: "Saiba o que fica", titleEm: "disponível a seguir.", intro: "Pesquise tempos de espera, limites de missões, ciclos de produção, entregas e reinícios do GTA Online. Inicie um temporizador de duração fixa e continue a jogar durante a contagem.", evidenceLabels: "Etiquetas de evidência", official: "Oficial", officialCopy: "A Rockstar publica a regra.", crosschecked: "Confirmado", crosscheckedCopy: "Evidência atual de especialistas ou wikis.", variable: "Variável", variableCopy: "O jogo não apresenta um único valor fixo.", timerRecords: "registos de temporizadores", businessGroups: "grupos de negócios", officiallyDocumented: "documentados oficialmente", currentUpdate: "atualização atual", findTimer: "Encontrar um temporizador", filterDatabase: "Filtrar a base de dados", reset: "Repor", search: "Pesquisar", searchPlaceholder: "Experimente Cayo, Clube Noturno, provisões...", businessCategory: "Negócio ou categoria", allCategories: "Todas as categorias", timerType: "Tipo de temporizador", allTypes: "Todos os tipos", scope: "Âmbito", anyScope: "Qualquer âmbito", propertyScope: "Propriedade / negócio específico", global: "Global", accountScope: "Personagem / conta", activityScope: "Atividade específica", somethingElse: "Posso fazer outra coisa?", either: "Qualquer", yes: "Sim", limited: "Limitado", no: "Não", important: "Importante", importantCopy: "Semanas de evento, benefícios GTA+, alterações de plataforma e atualizações futuras podem substituir os valores normais. Abra a fonte e confirme a condição de cada registo.", timerLibrary: "Biblioteca de temporizadores", matchingRecords: "registos correspondentes", sort: "Ordenar", category: "Categoria", shortest: "Mais curtos primeiro", activityName: "Nome da atividade", recentlyVerified: "Verificados recentemente", noMatch: "Nenhum temporizador corresponde aos filtros.", noMatchCopy: "Reponha os filtros ou experimente uma pesquisa mais abrangente.", verification: "Como funciona a verificação", methodTitle: "Útil sem fingir que todos os números são oficiais.", rockstarFirst: "Rockstar primeiro", rockstarCopy: "São utilizados artigos de apoio, notas de atualizações e publicações Newswire sempre que a Rockstar publica a regra.", currentChecks: "Confirmações atuais", checksCopy: "Para temporizadores ocultos, a base utiliza páginas atuais da GTA Wiki e guias recentes de especialistas, não memórias ou suposições antigas de fóruns.", uncertainty: "A incerteza permanece visível", uncertaintyCopy: "Verificações aleatórias, limites dependentes da rota e repetições ativadas por chamadas são marcados como variáveis em vez de receberem um número exato falso.", footer: "Referência não oficial criada por fãs. Grand Theft Auto, GTA Online, Rockstar Games e marcas relacionadas pertencem aos respetivos proprietários.", legal: "Marcas e direitos de autor", aboutApp: "Sobre esta app", details: "Detalhes", propertySpecific: "Específico da propriedade", characterAccount: "Personagem / conta", activitySpecific: "Específico da atividade", otherAvailable: "Outro trabalho disponível", otherLimited: "Outro trabalho com limites", currentOnly: "Apenas a atividade atual", useWaiting: "Aproveite o tempo de espera", checkCondition: "Verifique a condição", activeMission: "Missão ativa", whatStarts: "O que inicia", canElse: "Posso fazer outra coisa?", conditions: "Condições e exceções", verified: "Verificado", referenceOnly: "Apenas referência", noCountdown: "Este registo não tem uma contagem fiável do início ao fim.", trackTimer: "Acompanhar este temporizador", shortestHint: "O valor mais curto está preenchido. Ajuste-o à equipa, melhorias ou condição.", fixedHint: "A duração verificada está preenchida e pode ser ajustada antes de começar.", minutes: "Minutos", startTimer: "Iniciar temporizador", startAgain: "Iniciar novamente", restartTimer: "Reiniciar temporizador", ready: "Pronto", running: "A decorrer", readyNow: "Pronto agora", remove: "Remover", resetTimer: "Repor", completeCatalogue: "A mostrar todo o catálogo verificado", searchPrefix: "Pesquisa", runningCount: "a decorrer", readyCount: "prontos", second: "s", hour: "h", day: "d",
  },
};

translations.en.databaseSummary = "Database summary";
translations.pt.databaseSummary = "Resumo da base de dados";

const categoryNames = { "CEO & Cargo": "CEO e Carga", Terrorbyte: "Terrorbyte", "MC / Biker": "MC / Motard", Bunker: "Bunker", Hangar: "Hangar", Agency: "Agência", Nightclub: "Clube Noturno", "Acid Lab": "Laboratório de Ácido", "Auto Shop": "Oficina Automóvel", "Salvage Yard": "Desmantelamento", "Bail Office": "Escritório de Fianças", "Garment Factory": "Fábrica de Vestuário", Heists: "Golpes", "Money Fronts": "Negócios de Fachada", "Daily Activities": "Atividades Diárias" };
const typeNames = { "Activity cooldown": "Tempo de espera da atividade", "Passive production": "Produção passiva", "Mission time limit": "Limite de tempo da missão", "Supply delivery": "Entrega de provisões", "Passive income": "Rendimento passivo", "Availability check": "Verificação de disponibilidade", "Daily reset": "Reinício diário", "Weekly reset": "Reinício semanal", "Availability window": "Janela de disponibilidade", "Variable gate": "Desbloqueio variável" };
let language = getLanguage();
const t = (key) => translations[language][key] ?? translations.en[key] ?? key;

const elements = {
  results: document.querySelector("#timer-results"),
  empty: document.querySelector("#empty-state"),
  search: document.querySelector("#search-input"),
  category: document.querySelector("#category-filter"),
  type: document.querySelector("#type-filter"),
  scope: document.querySelector("#scope-filter"),
  parallel: document.querySelector("#parallel-filter"),
  sort: document.querySelector("#sort-select"),
  reset: document.querySelector("#reset-filters"),
  activeFilters: document.querySelector("#active-filters"),
  visibleCount: document.querySelector("#visible-count"),
  recordCount: document.querySelector("#record-count"),
  categoryCount: document.querySelector("#category-count"),
  officialCount: document.querySelector("#official-count"),
  trackerDock: document.querySelector("#tracker-dock"),
  runningTimers: document.querySelector("#running-timers"),
  activeTimerSummary: document.querySelector("#active-timer-summary"),
  clearFinished: document.querySelector("#clear-finished"),
  toggleTracker: document.querySelector("#toggle-tracker")
};

const evidenceLabel = (value) => ({ official: t("official"), crosschecked: t("crosschecked"), variable: t("variable") })[value] || value;
const scopeName = (value) => ({ property: t("propertySpecific"), global: t("global"), account: t("characterAccount"), activity: t("activitySpecific") })[value] || value;
const parallelName = (value) => ({ yes: t("otherAvailable"), limited: t("otherLimited"), no: t("currentOnly") })[value] || value;

function localizeDuration(value) {
  if (language === "en") return value;
  return value
    .replaceAll("About ", "Cerca de ")
    .replaceAll("Once daily", "Uma vez por dia")
    .replaceAll("Daily at", "Diariamente às")
    .replaceAll("Once per daily reset", "Uma vez por reinício diário")
    .replaceAll("Every ", "A cada ")
    .replaceAll("Weekly event reset", "Reinício semanal do evento")
    .replaceAll("Once per weekly event", "Uma vez por evento semanal")
    .replaceAll("No normal fixed cooldown", "Sem tempo de espera fixo normal")
    .replaceAll("Raf call — no dependable fixed clock", "Chamada do Raf — sem tempo fixo fiável")
    .replaceAll("with crew", "com equipa")
    .replaceAll("for the same contract", "para o mesmo contrato")
    .replaceAll(" or ", " ou ")
    .replaceAll("with staff", "com funcionários")
    .replaceAll("with 2 lifts", "com 2 elevadores")
    .replaceAll("upgraded", "com melhorias")
    .replaceAll("full stock", "stock completo")
    .replaceAll("solo", "a solo")
    .replaceAll("base", "base")
    .replace(/\bhr\b/g, "h")
    .replace(/\bsec\b/g, "s")
    .replace(/\bwindow\b/g, "de janela");
}

function localizedRecord(record) {
  if (language === "en") return record;
  return {
    ...record,
    ...timerTranslationsPt[record.id],
    category: categoryNames[record.category] || record.category,
    timerType: typeNames[record.timerType] || record.timerType,
    duration: localizeDuration(record.duration),
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function loadTimers() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(stored)) return [];
    return stored.filter((timer) => {
      return timer
        && recordsById.has(timer.recordId)
        && Number.isFinite(timer.startedAt)
        && Number.isFinite(timer.endsAt)
        && Number.isFinite(timer.durationMinutes)
        && timer.durationMinutes > 0;
    });
  } catch {
    return [];
  }
}

let activeTimers = loadTimers();
let trackerCollapsed = false;

try {
  trackerCollapsed = localStorage.getItem(TRACKER_COLLAPSED_KEY) === "true";
} catch {
  trackerCollapsed = false;
}

function saveTimers() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activeTimers));
  } catch {
    // The countdown continues for this page session when storage is unavailable.
  }
}

function populateSelect(select, values, labelFor = (value) => value) {
  select.querySelectorAll("option:not([value='all'])").forEach((option) => option.remove());
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = labelFor(value);
    select.append(option);
  });
}

function sourceMarkup(sources) {
  return sources.map((source, index) => {
    const suffix = sources.length > 1 ? ` ${index + 1}` : "";
    return `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}${suffix} <span aria-hidden="true">↗</span></a>`;
  }).join("");
}

function canTrack(record) {
  return Number.isFinite(record.minMinutes)
    && record.minMinutes > 0
    && !nonCountdownTypes.has(record.timerType)
    && !record.duration.toLowerCase().includes("no normal fixed cooldown");
}

function existingTimer(recordId) {
  return activeTimers.find((timer) => timer.recordId === recordId);
}

function timerButtonLabel(recordId) {
  const timer = existingTimer(recordId);
  if (!timer) return t("startTimer");
  return timer.endsAt <= Date.now() ? t("startAgain") : t("restartTimer");
}

function timerControlMarkup(record) {
  if (!canTrack(record)) {
    return `
      <div class="timer-launch timer-launch-unavailable">
        <div><span class="timer-launch-label">${t("referenceOnly")}</span><p>${t("noCountdown")}</p></div>
      </div>`;
  }

  const hasAlternatives = /–|\/|about/i.test(record.duration);
  const hint = hasAlternatives
    ? t("shortestHint")
    : t("fixedHint");

  return `
    <div class="timer-launch">
      <div class="timer-launch-copy">
        <span class="timer-launch-label">${t("trackTimer")}</span>
        <p>${escapeHtml(hint)}</p>
      </div>
      <label class="timer-duration-input" for="duration-${escapeHtml(record.id)}">${t("minutes")}
        <input id="duration-${escapeHtml(record.id)}" data-duration-for="${escapeHtml(record.id)}" type="number" min="0.1" max="10080" step="any" value="${escapeHtml(record.minMinutes)}" inputmode="decimal" required />
      </label>
      <button class="start-timer-button" type="button" data-start-timer="${escapeHtml(record.id)}">${timerButtonLabel(record.id)}</button>
    </div>`;
}

function recordMarkup(record) {
  const display = localizedRecord(record);
  return `
    <details class="timer-card" data-record-id="${escapeHtml(record.id)}">
      <summary>
        <div class="card-topline">
          <span class="category-pill">${escapeHtml(display.category)}</span>
          <span class="type-pill">${escapeHtml(display.timerType)}</span>
        </div>
        <h3>${escapeHtml(display.activity)}</h3>
        <div class="duration-row">
          <span class="duration">${escapeHtml(display.duration)}</span>
          <span class="expand-hint">${t("details")}</span>
        </div>
        <div class="quick-facts">
          <span><strong>${escapeHtml(display.scopeLabel)}</strong>${escapeHtml(scopeName(record.scope))}</span>
          <span><strong>${escapeHtml(parallelName(record.parallel))}</strong>${escapeHtml(record.parallel === "yes" ? t("useWaiting") : record.parallel === "limited" ? t("checkCondition") : t("activeMission"))}</span>
        </div>
      </summary>
      <div class="card-details">
        <dl class="detail-list">
          <div><dt>${t("whatStarts")}</dt><dd>${escapeHtml(display.trigger)}</dd></div>
          <div><dt>${t("scope")}</dt><dd>${escapeHtml(display.scopeLabel)} — ${escapeHtml(scopeName(record.scope))}.</dd></div>
          <div><dt>${t("canElse")}</dt><dd>${escapeHtml(display.parallelLabel)}</dd></div>
          <div><dt>${t("conditions")}</dt><dd>${escapeHtml(display.conditions)}</dd></div>
        </dl>
        ${timerControlMarkup(record)}
        <div class="source-row">
          <div><span class="evidence-pill ${escapeHtml(record.evidence)}">${escapeHtml(evidenceLabel(record.evidence))}</span><div class="source-links">${sourceMarkup(record.sources)}</div></div>
          <span class="verified">${t("verified")} ${escapeHtml(record.verified)}</span>
        </div>
      </div>
    </details>`;
}

function getState() {
  return {
    query: elements.search.value.trim().toLowerCase(),
    category: elements.category.value,
    type: elements.type.value,
    scope: elements.scope.value,
    parallel: elements.parallel.value,
    sort: elements.sort.value
  };
}

function matchesSearch(record, query) {
  if (!query) return true;
  const display = localizedRecord(record);
  const searchable = [record.category, record.activity, record.timerType, record.duration, record.trigger, record.scopeLabel, record.parallelLabel, record.conditions, display.category, display.activity, display.timerType, display.duration, display.trigger, display.scopeLabel, display.parallelLabel, display.conditions].join(" ").toLowerCase();
  return searchable.includes(query);
}

function filterRecords(state) {
  return timerRecords.filter((record) => {
    return matchesSearch(record, state.query)
      && (state.category === "all" || record.category === state.category)
      && (state.type === "all" || record.timerType === state.type)
      && (state.scope === "all" || record.scope === state.scope)
      && (state.parallel === "all" || record.parallel === state.parallel);
  });
}

function sortRecords(records, sort) {
  return [...records].sort((a, b) => {
    if (sort === "duration") return a.minMinutes - b.minMinutes || a.activity.localeCompare(b.activity);
    if (sort === "activity") return localizedRecord(a).activity.localeCompare(localizedRecord(b).activity, language === "pt" ? "pt-PT" : "en");
    if (sort === "verified") return b.verified.localeCompare(a.verified) || a.activity.localeCompare(b.activity);
    return localizedRecord(a).category.localeCompare(localizedRecord(b).category, language === "pt" ? "pt-PT" : "en") || localizedRecord(a).activity.localeCompare(localizedRecord(b).activity, language === "pt" ? "pt-PT" : "en");
  });
}

function renderActiveFilters(state) {
  const filters = [];
  if (state.query) filters.push(`${t("searchPrefix")}: “${elements.search.value.trim()}”`);
  if (state.category !== "all") filters.push(language === "pt" ? categoryNames[state.category] || state.category : state.category);
  if (state.type !== "all") filters.push(language === "pt" ? typeNames[state.type] || state.type : state.type);
  if (state.scope !== "all") filters.push(scopeName(state.scope));
  if (state.parallel !== "all") filters.push(parallelName(state.parallel));
  elements.activeFilters.innerHTML = filters.length
    ? filters.map((filter) => `<span class="filter-chip">${escapeHtml(filter)}</span>`).join("")
    : `<span class="filter-chip">${t("completeCatalogue")}</span>`;
}

function render() {
  const state = getState();
  const records = sortRecords(filterRecords(state), state.sort);
  elements.results.innerHTML = records.map(recordMarkup).join("");
  elements.visibleCount.textContent = records.length;
  elements.empty.hidden = records.length !== 0;
  elements.results.hidden = records.length === 0;
  renderActiveFilters(state);
}

function resetFilters() {
  elements.search.value = "";
  elements.category.value = "all";
  elements.type.value = "all";
  elements.scope.value = "all";
  elements.parallel.value = "all";
  elements.sort.value = "category";
  render();
  elements.search.focus();
}

function formatDurationLabel(minutes) {
  if (minutes < 1) return `${Math.round(minutes * 60)} ${t("second")}`;
  if (minutes < 60) return `${Number.isInteger(minutes) ? minutes : minutes.toFixed(1)} min`;
  const hours = Math.floor(minutes / 60);
  const remainder = Math.round(minutes % 60);
  return remainder ? `${hours} ${t("hour")} ${remainder} min` : `${hours} ${t("hour")}`;
}

function formatCountdown(milliseconds) {
  if (milliseconds <= 0) return t("readyNow");
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const time = [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
  return days ? `${days}${t("day")} ${time}` : time;
}

function trackerItemMarkup(timer) {
  const record = recordsById.get(timer.recordId);
  const display = localizedRecord(record);
  const remaining = Math.max(0, timer.endsAt - Date.now());
  const isReady = remaining === 0;
  const progress = Math.max(0, Math.min(100, (remaining / (timer.durationMinutes * 60000)) * 100));
  return `
    <article class="running-timer${isReady ? " is-ready" : ""}" data-running-timer="${escapeHtml(timer.recordId)}">
      <div class="running-timer-topline">
        <span>${escapeHtml(display.category)}</span>
        <strong data-timer-status>${isReady ? t("ready") : t("running")}</strong>
      </div>
      <h3>${escapeHtml(display.activity)}</h3>
      <p class="countdown" data-countdown>${formatCountdown(remaining)}</p>
      <div class="countdown-progress" aria-hidden="true"><span data-progress style="width:${progress.toFixed(2)}%"></span></div>
      <div class="running-timer-footer">
        <span>${escapeHtml(formatDurationLabel(timer.durationMinutes))}</span>
        <div>
          <button type="button" data-timer-action="reset" data-record-id="${escapeHtml(timer.recordId)}" aria-label="${t("resetTimer")} ${escapeHtml(display.activity)}">${t("resetTimer")}</button>
          <button type="button" data-timer-action="remove" data-record-id="${escapeHtml(timer.recordId)}" aria-label="${t("remove")} ${escapeHtml(display.activity)}">${t("remove")}</button>
        </div>
      </div>
    </article>`;
}

function updateRecordButtons() {
  document.querySelectorAll("[data-start-timer]").forEach((button) => {
    button.textContent = timerButtonLabel(button.dataset.startTimer);
  });
}

function tickTimers() {
  const now = Date.now();
  let running = 0;
  let ready = 0;

  elements.runningTimers.querySelectorAll("[data-running-timer]").forEach((item) => {
    const timer = existingTimer(item.dataset.runningTimer);
    if (!timer) return;
    const remaining = Math.max(0, timer.endsAt - now);
    const isReady = remaining === 0;
    const progress = Math.max(0, Math.min(100, (remaining / (timer.durationMinutes * 60000)) * 100));
    item.classList.toggle("is-ready", isReady);
    item.querySelector("[data-countdown]").textContent = formatCountdown(remaining);
    item.querySelector("[data-timer-status]").textContent = isReady ? t("ready") : t("running");
    item.querySelector("[data-progress]").style.width = `${progress}%`;
    if (isReady) ready += 1;
    else running += 1;
  });

  const parts = [];
  if (running) parts.push(`${running} ${t("runningCount")}`);
  if (ready) parts.push(`${ready} ${t("readyCount")}`);
  elements.activeTimerSummary.textContent = parts.join(" · ");
  elements.clearFinished.disabled = ready === 0;
  updateRecordButtons();
}

function renderTracker() {
  activeTimers.sort((a, b) => a.endsAt - b.endsAt);
  elements.trackerDock.hidden = activeTimers.length === 0;
  elements.runningTimers.innerHTML = activeTimers.map(trackerItemMarkup).join("");
  applyTrackerDisplay();
  tickTimers();
}

function applyTrackerDisplay() {
  elements.trackerDock.classList.toggle("is-collapsed", trackerCollapsed);
  elements.toggleTracker.setAttribute("aria-expanded", String(!trackerCollapsed));
  elements.toggleTracker.querySelector("[data-toggle-label]").textContent = trackerCollapsed ? t("showAll") : t("showLess");
}

function toggleTrackerDisplay() {
  trackerCollapsed = !trackerCollapsed;
  try {
    localStorage.setItem(TRACKER_COLLAPSED_KEY, String(trackerCollapsed));
  } catch {
    // The preference still applies for this page session when storage is unavailable.
  }
  applyTrackerDisplay();
}

function startTimer(recordId, durationMinutes) {
  const record = recordsById.get(recordId);
  if (!record || !canTrack(record) || !Number.isFinite(durationMinutes) || durationMinutes <= 0) return;
  const now = Date.now();
  const timer = {
    recordId,
    durationMinutes,
    startedAt: now,
    endsAt: now + (durationMinutes * 60000)
  };
  activeTimers = activeTimers.filter((item) => item.recordId !== recordId);
  activeTimers.push(timer);
  saveTimers();
  renderTracker();
}

function resetTimer(recordId) {
  const timer = existingTimer(recordId);
  if (!timer) return;
  const now = Date.now();
  timer.startedAt = now;
  timer.endsAt = now + (timer.durationMinutes * 60000);
  saveTimers();
  renderTracker();
}

function removeTimer(recordId) {
  activeTimers = activeTimers.filter((timer) => timer.recordId !== recordId);
  saveTimers();
  renderTracker();
}

const categories = [...new Set(timerRecords.map((record) => record.category))].sort();
const timerTypes = [...new Set(timerRecords.map((record) => record.timerType))].sort();
elements.recordCount.textContent = timerRecords.length;
elements.categoryCount.textContent = categories.length;
elements.officialCount.textContent = timerRecords.filter((record) => record.evidence === "official").length;

function applyLanguage(next) {
  const categoryValue = elements.category.value || "all";
  const typeValue = elements.type.value || "all";
  language = saveLanguage(next);
  document.documentElement.lang = language === "pt" ? "pt-PT" : "en";
  document.title = language === "pt" ? "Referência de Temporizadores GTA Online — EstrelaLuaApps" : "GTA Online Timer Reference — EstrelaLuaApps";
  applyTranslations(document, translations, language);
  populateSelect(elements.category, categories, (value) => language === "pt" ? categoryNames[value] || value : value);
  populateSelect(elements.type, timerTypes, (value) => language === "pt" ? typeNames[value] || value : value);
  elements.category.value = categories.includes(categoryValue) ? categoryValue : "all";
  elements.type.value = timerTypes.includes(typeValue) ? typeValue : "all";
  render();
  renderTracker();
}

[elements.search, elements.category, elements.type, elements.scope, elements.parallel, elements.sort].forEach((control) => {
  control.addEventListener(control === elements.search ? "input" : "change", render);
});
elements.reset.addEventListener("click", resetFilters);

elements.results.addEventListener("click", (event) => {
  const button = event.target.closest("[data-start-timer]");
  if (!button) return;
  const input = elements.results.querySelector(`[data-duration-for="${CSS.escape(button.dataset.startTimer)}"]`);
  const durationMinutes = Number(input?.value);
  if (!input || !input.reportValidity() || !Number.isFinite(durationMinutes) || durationMinutes <= 0) return;
  startTimer(button.dataset.startTimer, durationMinutes);
});

elements.runningTimers.addEventListener("click", (event) => {
  const button = event.target.closest("[data-timer-action]");
  if (!button) return;
  if (button.dataset.timerAction === "reset") resetTimer(button.dataset.recordId);
  if (button.dataset.timerAction === "remove") removeTimer(button.dataset.recordId);
});

elements.clearFinished.addEventListener("click", () => {
  const now = Date.now();
  activeTimers = activeTimers.filter((timer) => timer.endsAt > now);
  saveTimers();
  renderTracker();
});
elements.toggleTracker.addEventListener("click", toggleTrackerDisplay);

createLanguageSwitch({ container: document.querySelector("#language-switch"), language, onChange: applyLanguage });
applyLanguage(language);
setInterval(tickTimers, 1000);
