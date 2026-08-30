import { timerRecords } from "./timer-data.js";

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
  officialCount: document.querySelector("#official-count")
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

render();
