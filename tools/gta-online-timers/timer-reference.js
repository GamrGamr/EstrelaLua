import { timerRecords } from "./timer-data.js";

const STORAGE_KEY = "gtaOnlineTimerTracker.v1";
const TRACKER_COLLAPSED_KEY = "gtaOnlineTimerTrackerCollapsed.v1";
const nonCountdownTypes = new Set(["Daily reset", "Weekly reset", "Variable gate"]);
const recordsById = new Map(timerRecords.map((record) => [record.id, record]));

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

const evidenceLabels = {
  official: "Official",
  crosschecked: "Cross-checked",
  variable: "Variable"
};

const scopeNames = {
  property: "Property specific",
  global: "Global",
  account: "Character / account",
  activity: "Activity specific"
};

const parallelNames = {
  yes: "Other work available",
  limited: "Other work with limits",
  no: "Current activity only"
};

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

function populateSelect(select, values) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
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
  if (!timer) return "Start timer";
  return timer.endsAt <= Date.now() ? "Start again" : "Restart timer";
}

function timerControlMarkup(record) {
  if (!canTrack(record)) {
    return `
      <div class="timer-launch timer-launch-unavailable">
        <div><span class="timer-launch-label">Reference only</span><p>This entry does not have one dependable start-to-finish countdown.</p></div>
      </div>`;
  }

  const hasAlternatives = /–|\/|about/i.test(record.duration);
  const hint = hasAlternatives
    ? "The shortest listed value is prefilled. Adjust it for your crew, upgrades, or condition."
    : "The verified duration is prefilled, and you can adjust it before starting.";

  return `
    <div class="timer-launch">
      <div class="timer-launch-copy">
        <span class="timer-launch-label">Track this timer</span>
        <p>${escapeHtml(hint)}</p>
      </div>
      <label class="timer-duration-input" for="duration-${escapeHtml(record.id)}">Minutes
        <input id="duration-${escapeHtml(record.id)}" data-duration-for="${escapeHtml(record.id)}" type="number" min="0.1" max="10080" step="any" value="${escapeHtml(record.minMinutes)}" inputmode="decimal" required />
      </label>
      <button class="start-timer-button" type="button" data-start-timer="${escapeHtml(record.id)}">${timerButtonLabel(record.id)}</button>
    </div>`;
}

function recordMarkup(record) {
  return `
    <details class="timer-card" data-record-id="${escapeHtml(record.id)}">
      <summary>
        <div class="card-topline">
          <span class="category-pill">${escapeHtml(record.category)}</span>
          <span class="type-pill">${escapeHtml(record.timerType)}</span>
        </div>
        <h3>${escapeHtml(record.activity)}</h3>
        <div class="duration-row">
          <span class="duration">${escapeHtml(record.duration)}</span>
          <span class="expand-hint">Details</span>
        </div>
        <div class="quick-facts">
          <span><strong>${escapeHtml(record.scopeLabel)}</strong>${escapeHtml(scopeNames[record.scope] || record.scope)}</span>
          <span><strong>${escapeHtml(parallelNames[record.parallel])}</strong>${escapeHtml(record.parallel === "yes" ? "Use the waiting time" : record.parallel === "limited" ? "Check the condition" : "Active mission")}</span>
        </div>
      </summary>
      <div class="card-details">
        <dl class="detail-list">
          <div><dt>What starts it</dt><dd>${escapeHtml(record.trigger)}</dd></div>
          <div><dt>Scope</dt><dd>${escapeHtml(record.scopeLabel)} — ${escapeHtml(scopeNames[record.scope] || record.scope)}.</dd></div>
          <div><dt>Can I do something else?</dt><dd>${escapeHtml(record.parallelLabel)}</dd></div>
          <div><dt>Conditions and exceptions</dt><dd>${escapeHtml(record.conditions)}</dd></div>
        </dl>
        ${timerControlMarkup(record)}
        <div class="source-row">
          <div><span class="evidence-pill ${escapeHtml(record.evidence)}">${escapeHtml(evidenceLabels[record.evidence])}</span><div class="source-links">${sourceMarkup(record.sources)}</div></div>
          <span class="verified">Verified ${escapeHtml(record.verified)}</span>
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
  const searchable = [record.category, record.activity, record.timerType, record.duration, record.trigger, record.scopeLabel, record.parallelLabel, record.conditions].join(" ").toLowerCase();
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
    if (sort === "activity") return a.activity.localeCompare(b.activity);
    if (sort === "verified") return b.verified.localeCompare(a.verified) || a.activity.localeCompare(b.activity);
    return a.category.localeCompare(b.category) || a.activity.localeCompare(b.activity);
  });
}

function renderActiveFilters(state) {
  const filters = [];
  if (state.query) filters.push(`Search: “${elements.search.value.trim()}”`);
  if (state.category !== "all") filters.push(state.category);
  if (state.type !== "all") filters.push(state.type);
  if (state.scope !== "all") filters.push(scopeNames[state.scope]);
  if (state.parallel !== "all") filters.push(parallelNames[state.parallel]);
  elements.activeFilters.innerHTML = filters.length
    ? filters.map((filter) => `<span class="filter-chip">${escapeHtml(filter)}</span>`).join("")
    : '<span class="filter-chip">Showing the complete verified catalogue</span>';
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
  if (minutes < 1) return `${Math.round(minutes * 60)} sec`;
  if (minutes < 60) return `${Number.isInteger(minutes) ? minutes : minutes.toFixed(1)} min`;
  const hours = Math.floor(minutes / 60);
  const remainder = Math.round(minutes % 60);
  return remainder ? `${hours} hr ${remainder} min` : `${hours} hr`;
}

function formatCountdown(milliseconds) {
  if (milliseconds <= 0) return "Ready now";
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const time = [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
  return days ? `${days}d ${time}` : time;
}

function trackerItemMarkup(timer) {
  const record = recordsById.get(timer.recordId);
  const remaining = Math.max(0, timer.endsAt - Date.now());
  const isReady = remaining === 0;
  const progress = Math.max(0, Math.min(100, (remaining / (timer.durationMinutes * 60000)) * 100));
  return `
    <article class="running-timer${isReady ? " is-ready" : ""}" data-running-timer="${escapeHtml(timer.recordId)}">
      <div class="running-timer-topline">
        <span>${escapeHtml(record.category)}</span>
        <strong data-timer-status>${isReady ? "Ready" : "Running"}</strong>
      </div>
      <h3>${escapeHtml(record.activity)}</h3>
      <p class="countdown" data-countdown>${formatCountdown(remaining)}</p>
      <div class="countdown-progress" aria-hidden="true"><span data-progress style="width:${progress.toFixed(2)}%"></span></div>
      <div class="running-timer-footer">
        <span>${escapeHtml(formatDurationLabel(timer.durationMinutes))}</span>
        <div>
          <button type="button" data-timer-action="reset" data-record-id="${escapeHtml(timer.recordId)}" aria-label="Reset ${escapeHtml(record.activity)} timer">Reset</button>
          <button type="button" data-timer-action="remove" data-record-id="${escapeHtml(timer.recordId)}" aria-label="Remove ${escapeHtml(record.activity)} timer">Remove</button>
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
    item.querySelector("[data-timer-status]").textContent = isReady ? "Ready" : "Running";
    item.querySelector("[data-progress]").style.width = `${progress}%`;
    if (isReady) ready += 1;
    else running += 1;
  });

  const parts = [];
  if (running) parts.push(`${running} running`);
  if (ready) parts.push(`${ready} ready`);
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
  elements.toggleTracker.querySelector("[data-toggle-label]").textContent = trackerCollapsed ? "Show all" : "Show less";
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
populateSelect(elements.category, categories);
populateSelect(elements.type, timerTypes);
elements.recordCount.textContent = timerRecords.length;
elements.categoryCount.textContent = categories.length;
elements.officialCount.textContent = timerRecords.filter((record) => record.evidence === "official").length;

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

render();
renderTracker();
setInterval(tickTimers, 1000);
