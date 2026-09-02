import { calculateSplit, cleanNumber } from "./partilha-justa-calculator.js";

const STORAGE_KEY = "partilhaJusta.v1";

const categories = [
  "Renda / prestação",
  "Eletricidade",
  "Água",
  "Gás",
  "Internet e telemóveis",
  "Supermercado",
  "Seguros",
  "Transportes",
  "Subscrições",
  "Saúde",
  "Crianças",
  "Animais",
  "Outra"
];

const elements = {
  personAName: document.querySelector("#person-a-name"),
  personAIncome: document.querySelector("#person-a-income"),
  personBName: document.querySelector("#person-b-name"),
  personBIncome: document.querySelector("#person-b-income"),
  expenseList: document.querySelector("#expense-list"),
  expenseEmpty: document.querySelector("#expense-empty"),
  addExpense: document.querySelector("#add-expense"),
  loadExample: document.querySelector("#load-example"),
  clearAll: document.querySelector("#clear-all"),
  saveStatus: document.querySelector("#save-status"),
  totalIncome: document.querySelector("#total-income"),
  totalExpenses: document.querySelector("#total-expenses"),
  shareABar: document.querySelector("#share-a-bar"),
  shareBBar: document.querySelector("#share-b-bar"),
  shareAName: document.querySelector("#share-a-name"),
  shareBName: document.querySelector("#share-b-name"),
  shareAPercent: document.querySelector("#share-a-percent"),
  shareBPercent: document.querySelector("#share-b-percent"),
  resultAName: document.querySelector("#result-a-name"),
  resultBName: document.querySelector("#result-b-name"),
  resultAIncome: document.querySelector("#result-a-income"),
  resultBIncome: document.querySelector("#result-b-income"),
  resultAPayment: document.querySelector("#result-a-payment"),
  resultBPayment: document.querySelector("#result-b-payment"),
  resultARemaining: document.querySelector("#result-a-remaining"),
  resultBRemaining: document.querySelector("#result-b-remaining"),
  resultNote: document.querySelector("#result-note")
};

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function defaultState() {
  return {
    mode: "proportional",
    people: [
      { name: "Pessoa A", income: 0 },
      { name: "Pessoa B", income: 0 }
    ],
    expenses: [{ id: createId(), category: "Renda / prestação", amount: 0 }]
  };
}

function normaliseState(candidate) {
  const fallback = defaultState();
  if (!candidate || typeof candidate !== "object") return fallback;
  const people = Array.isArray(candidate.people) && candidate.people.length >= 2
    ? candidate.people.slice(0, 2).map((person, index) => ({
      name: typeof person?.name === "string" && person.name.trim() ? person.name.slice(0, 30) : `Pessoa ${index === 0 ? "A" : "B"}`,
      income: cleanNumber(person?.income)
    }))
    : fallback.people;
  const expenses = Array.isArray(candidate.expenses)
    ? candidate.expenses.slice(0, 100).map((expense) => ({
      id: typeof expense?.id === "string" ? expense.id : createId(),
      category: categories.includes(expense?.category) ? expense.category : "Outra",
      amount: cleanNumber(expense?.amount)
    }))
    : fallback.expenses;
  return {
    mode: candidate.mode === "equal" ? "equal" : "proportional",
    people,
    expenses
  };
}

function loadState() {
  try {
    return normaliseState(JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"));
  } catch {
    return defaultState();
  }
}

let state = loadState();

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(value);
}

function formatPercent(value) {
  return new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 1 }).format(value * 100) + "%";
}

function personName(index) {
  const fallback = index === 0 ? "Pessoa A" : "Pessoa B";
  return state.people[index].name.trim() || fallback;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    elements.saveStatus.textContent = "Guardado neste dispositivo";
  } catch {
    elements.saveStatus.textContent = "Não foi possível guardar";
  }
}

function categoryOptions(selected) {
  return categories.map((category) => `<option value="${escapeHtml(category)}"${category === selected ? " selected" : ""}>${escapeHtml(category)}</option>`).join("");
}

function expenseMarkup(expense) {
  return `
    <div class="expense-row" data-expense-id="${escapeHtml(expense.id)}">
      <label><span class="sr-only">Tipo de despesa</span><select data-field="category" aria-label="Tipo de despesa">${categoryOptions(expense.category)}</select></label>
      <label><span class="sr-only">Valor mensal</span><div class="money-input"><input data-field="amount" aria-label="Valor mensal de ${escapeHtml(expense.category)}" type="number" min="0" max="10000000" step="any" value="${escapeHtml(expense.amount)}" inputmode="decimal" /><span>&euro;</span></div></label>
      <button type="button" class="remove-expense" data-remove-expense aria-label="Remover ${escapeHtml(expense.category)}">&times;</button>
    </div>`;
}

function renderExpenses() {
  elements.expenseList.innerHTML = state.expenses.map(expenseMarkup).join("");
  elements.expenseEmpty.hidden = state.expenses.length !== 0;
}

function calculate() {
  return calculateSplit(state.people[0].income, state.people[1].income, state.expenses.map((expense) => expense.amount));
}

function setNegativeState(element, value) {
  element.classList.toggle("is-negative", value < 0);
}

function updateComparison(prefix, split, nameA, nameB) {
  document.querySelector(`#compare-${prefix}-a-name`).textContent = nameA;
  document.querySelector(`#compare-${prefix}-b-name`).textContent = nameB;
  document.querySelector(`#compare-${prefix}-a-payment`).textContent = formatCurrency(split.paymentA);
  document.querySelector(`#compare-${prefix}-b-payment`).textContent = formatCurrency(split.paymentB);
  const remainingA = document.querySelector(`#compare-${prefix}-a-remaining`);
  const remainingB = document.querySelector(`#compare-${prefix}-b-remaining`);
  remainingA.textContent = `Sobra ${formatCurrency(split.remainingA)}`;
  remainingB.textContent = `Sobra ${formatCurrency(split.remainingB)}`;
  setNegativeState(remainingA, split.remainingA);
  setNegativeState(remainingB, split.remainingB);
}

function renderResults() {
  const result = calculate();
  const nameA = personName(0);
  const nameB = personName(1);
  const selected = result[state.mode];

  elements.totalIncome.textContent = formatCurrency(result.totalIncome);
  elements.totalExpenses.textContent = formatCurrency(result.totalExpenses);
  elements.shareAName.textContent = nameA;
  elements.shareBName.textContent = nameB;
  elements.shareAPercent.textContent = formatPercent(result.shareA);
  elements.shareBPercent.textContent = formatPercent(result.shareB);
  elements.shareABar.style.width = `${result.totalIncome > 0 ? result.shareA * 100 : 50}%`;
  elements.shareBBar.style.width = `${result.totalIncome > 0 ? result.shareB * 100 : 50}%`;

  elements.resultAName.textContent = nameA;
  elements.resultBName.textContent = nameB;
  elements.resultAIncome.textContent = `Rendimento: ${formatCurrency(result.incomeA)}`;
  elements.resultBIncome.textContent = `Rendimento: ${formatCurrency(result.incomeB)}`;
  elements.resultAPayment.textContent = formatCurrency(selected.paymentA);
  elements.resultBPayment.textContent = formatCurrency(selected.paymentB);
  elements.resultARemaining.textContent = formatCurrency(selected.remainingA);
  elements.resultBRemaining.textContent = formatCurrency(selected.remainingB);
  setNegativeState(elements.resultARemaining, selected.remainingA);
  setNegativeState(elements.resultBRemaining, selected.remainingB);

  document.querySelectorAll("[data-mode]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.mode === state.mode)));
  document.querySelectorAll("[data-comparison]").forEach((card) => card.classList.toggle("is-selected", card.dataset.comparison === state.mode));

  if (state.mode === "proportional" && result.totalIncome === 0) {
    elements.resultNote.textContent = "Introduzam os rendimentos para calcular uma divisão proporcional.";
  } else if (state.mode === "proportional") {
    elements.resultNote.textContent = `${nameA} assume ${formatPercent(result.shareA)} e ${nameB} assume ${formatPercent(result.shareB)} das despesas comuns.`;
  } else {
    elements.resultNote.textContent = "Na divisão 50/50, cada pessoa paga metade das despesas, independentemente do rendimento.";
  }

  updateComparison("prop", result.proportional, nameA, nameB);
  updateComparison("equal", result.equal, nameA, nameB);
}

function syncInputs() {
  elements.personAName.value = state.people[0].name;
  elements.personAIncome.value = state.people[0].income;
  elements.personBName.value = state.people[1].name;
  elements.personBIncome.value = state.people[1].income;
}

function updateAndSave() {
  renderResults();
  saveState();
}

elements.personAName.addEventListener("input", () => { state.people[0].name = elements.personAName.value.slice(0, 30); updateAndSave(); });
elements.personBName.addEventListener("input", () => { state.people[1].name = elements.personBName.value.slice(0, 30); updateAndSave(); });
elements.personAIncome.addEventListener("input", () => { state.people[0].income = cleanNumber(elements.personAIncome.value); updateAndSave(); });
elements.personBIncome.addEventListener("input", () => { state.people[1].income = cleanNumber(elements.personBIncome.value); updateAndSave(); });

elements.expenseList.addEventListener("input", (event) => {
  const row = event.target.closest("[data-expense-id]");
  if (!row) return;
  const expense = state.expenses.find((item) => item.id === row.dataset.expenseId);
  if (!expense) return;
  if (event.target.dataset.field === "amount") expense.amount = cleanNumber(event.target.value);
  updateAndSave();
});

elements.expenseList.addEventListener("change", (event) => {
  const row = event.target.closest("[data-expense-id]");
  if (!row || event.target.dataset.field !== "category") return;
  const expense = state.expenses.find((item) => item.id === row.dataset.expenseId);
  if (!expense) return;
  expense.category = categories.includes(event.target.value) ? event.target.value : "Outra";
  row.querySelector("[data-field='amount']").setAttribute("aria-label", `Valor mensal de ${expense.category}`);
  row.querySelector("[data-remove-expense]").setAttribute("aria-label", `Remover ${expense.category}`);
  updateAndSave();
});

elements.expenseList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-expense]");
  if (!button) return;
  const row = button.closest("[data-expense-id]");
  state.expenses = state.expenses.filter((expense) => expense.id !== row.dataset.expenseId);
  renderExpenses();
  updateAndSave();
});

elements.addExpense.addEventListener("click", () => {
  state.expenses.push({ id: createId(), category: "Outra", amount: 0 });
  renderExpenses();
  updateAndSave();
  elements.expenseList.lastElementChild?.querySelector("select")?.focus();
});

document.querySelectorAll("[data-mode], [data-select-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode || button.dataset.selectMode;
    updateAndSave();
    if (button.dataset.selectMode) document.querySelector("#results-title").scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

elements.loadExample.addEventListener("click", () => {
  state = {
    mode: "proportional",
    people: [{ name: "Pessoa A", income: 1000 }, { name: "Pessoa B", income: 1500 }],
    expenses: [
      { id: createId(), category: "Renda / prestação", amount: 700 },
      { id: createId(), category: "Eletricidade", amount: 60 },
      { id: createId(), category: "Água", amount: 40 },
      { id: createId(), category: "Internet e telemóveis", amount: 40 },
      { id: createId(), category: "Supermercado", amount: 160 }
    ]
  };
  syncInputs();
  renderExpenses();
  updateAndSave();
});

elements.clearAll.addEventListener("click", () => {
  state = defaultState();
  syncInputs();
  renderExpenses();
  updateAndSave();
});

syncInputs();
renderExpenses();
renderResults();
