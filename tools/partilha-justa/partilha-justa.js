import { calculateSplit, cleanNumber } from "./partilha-justa-calculator.js";
import { applyTranslations, createLanguageSwitch, getLanguage, saveLanguage } from "../../assets/i18n-core.js";

const STORAGE_KEY = "partilhaJusta.v1";

const translations = {
  pt: {
    description: "Compare uma divisão 50/50 com uma divisão proporcional aos rendimentos e descubra quanto cada pessoa deve pagar.", skip: "Saltar para a calculadora", home: "Página inicial da EstrelaLuaApps", nav: "Navegação da aplicação", allApps: "Todas as apps", about: "Sobre", kicker: "Despesas a dois · cálculo privado", title: "Dividir sem", titleEm: "adivinhar.", intro: "Compare uma divisão igual com uma divisão proporcional ao rendimento de cada pessoa.", localOnly: "Os dados ficam apenas neste navegador.", calculatorLabel: "Calculadora de despesas do casal", step1: "Passo 1", monthlyIncome: "Rendimentos mensais", loadExample: "Carregar exemplo", name: "Nome", netIncome: "Rendimento líquido mensal", step2: "Passo 2", sharedExpenses: "Despesas comuns", clearAll: "Limpar tudo", expense: "Despesa", monthlyAmount: "Valor mensal", noExpenses: "Ainda não existem despesas comuns.", addExpense: "Adicionar despesa", result: "Resultado", yourSplit: "A vossa divisão", saved: "Guardado neste dispositivo", saveFailed: "Não foi possível guardar", splitMethod: "Método de divisão", proportional: "Proporcional", totalIncome: "Rendimento total", contributionPercentages: "Percentagem de contribuição de cada pessoa", shouldPay: "Deve pagar", keeps: "Fica com", compare: "Comparar", twoWays: "Duas formas de dividir", comparisonIntro: "A mesma despesa pode ter um impacto muito diferente no orçamento de cada pessoa.", basedOnIncome: "Com base nos rendimentos", proportionalSplit: "Divisão proporcional", useMethod: "Usar este método", halfEach: "Metade para cada pessoa", equalSplit: "Divisão 50 / 50", interpretResults: "Como interpretar o resultado", addIncomes: "Somar rendimentos", addIncomesCopy: "A app calcula quanto cada pessoa representa no rendimento total do casal.", addExpenses: "Somar despesas", addExpensesCopy: "Renda, contas, supermercado e todas as outras despesas comuns entram no mesmo total.", compareWithoutImposing: "Comparar sem impor", compareWithoutImposingCopy: "Os resultados ajudam à conversa; cada casal decide o método que faz sentido para si.", disclaimer: "Ferramenta informativa. Não substitui aconselhamento financeiro ou jurídico.", legal: "Marcas e direitos de autor", aboutApp: "Sobre a app", personA: "Pessoa A", personB: "Pessoa B", income: "Rendimento", remains: "Sobra", expenseType: "Tipo de despesa", remove: "Remover", monthlyValueOf: "Valor mensal de", proportionalPrompt: "Introduzam os rendimentos para calcular uma divisão proporcional.", equalNote: "Na divisão 50/50, cada pessoa paga metade das despesas, independentemente do rendimento.", assumes: "assume", commonExpenses: "das despesas comuns", categories: { rent: "Renda / prestação", electricity: "Eletricidade", water: "Água", gas: "Gás", telecom: "Internet e telemóveis", groceries: "Supermercado", insurance: "Seguros", transport: "Transportes", subscriptions: "Subscrições", health: "Saúde", children: "Crianças", pets: "Animais", other: "Outra" },
  },
  en: {
    description: "Compare a 50/50 split with an income-proportional split and see how much each person should pay.", skip: "Skip to the calculator", home: "EstrelaLuaApps home", nav: "App navigation", allApps: "All apps", about: "About", kicker: "Shared expenses · private calculation", title: "Split without", titleEm: "guessing.", intro: "Compare an equal split with one based on each person's income.", localOnly: "Your data stays only in this browser.", calculatorLabel: "Couples expense calculator", step1: "Step 1", monthlyIncome: "Monthly incomes", loadExample: "Load example", name: "Name", netIncome: "Monthly net income", step2: "Step 2", sharedExpenses: "Shared expenses", clearAll: "Clear all", expense: "Expense", monthlyAmount: "Monthly amount", noExpenses: "There are no shared expenses yet.", addExpense: "Add expense", result: "Result", yourSplit: "Your split", saved: "Saved on this device", saveFailed: "Could not save", splitMethod: "Split method", proportional: "Proportional", totalIncome: "Total income", contributionPercentages: "Each person's contribution percentage", shouldPay: "Should pay", keeps: "Keeps", compare: "Compare", twoWays: "Two ways to split", comparisonIntro: "The same expense can have a very different impact on each person's budget.", basedOnIncome: "Based on income", proportionalSplit: "Proportional split", useMethod: "Use this method", halfEach: "Half for each person", equalSplit: "50 / 50 split", interpretResults: "How to read the result", addIncomes: "Add the incomes", addIncomesCopy: "The app calculates each person's share of the couple's total income.", addExpenses: "Add the expenses", addExpensesCopy: "Rent, bills, groceries, and every other shared expense go into the same total.", compareWithoutImposing: "Compare without imposing", compareWithoutImposingCopy: "The results support the conversation; each couple chooses the method that works for them.", disclaimer: "Informational tool. It is not financial or legal advice.", legal: "Trademark & copyright", aboutApp: "About the app", personA: "Person A", personB: "Person B", income: "Income", remains: "Remaining", expenseType: "Expense type", remove: "Remove", monthlyValueOf: "Monthly amount for", proportionalPrompt: "Enter both incomes to calculate a proportional split.", equalNote: "With a 50/50 split, each person pays half of the expenses regardless of income.", assumes: "covers", commonExpenses: "of the shared expenses", categories: { rent: "Rent / mortgage", electricity: "Electricity", water: "Water", gas: "Gas", telecom: "Internet and phones", groceries: "Groceries", insurance: "Insurance", transport: "Transport", subscriptions: "Subscriptions", health: "Health", children: "Children", pets: "Pets", other: "Other" },
  },
};

let language = getLanguage();
const t = (key) => translations[language][key] ?? translations.pt[key] ?? key;

const categories = [
  "rent", "electricity", "water", "gas", "telecom", "groceries", "insurance", "transport", "subscriptions", "health", "children", "pets", "other"
];

function categoryId(value) {
  if (categories.includes(value)) return value;
  return categories.find((id) => Object.values(translations).some((copy) => copy.categories[id] === value)) || "other";
}

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
      { name: t("personA"), income: 0 },
      { name: t("personB"), income: 0 }
    ],
    expenses: [{ id: createId(), category: "rent", amount: 0 }]
  };
}

function normaliseState(candidate) {
  const fallback = defaultState();
  if (!candidate || typeof candidate !== "object") return fallback;
  const people = Array.isArray(candidate.people) && candidate.people.length >= 2
    ? candidate.people.slice(0, 2).map((person, index) => ({
      name: typeof person?.name === "string" && person.name.trim() ? person.name.slice(0, 30) : (index === 0 ? t("personA") : t("personB")),
      income: cleanNumber(person?.income)
    }))
    : fallback.people;
  const expenses = Array.isArray(candidate.expenses)
    ? candidate.expenses.slice(0, 100).map((expense) => ({
      id: typeof expense?.id === "string" ? expense.id : createId(),
      category: categoryId(expense?.category),
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
  return new Intl.NumberFormat(language === "pt" ? "pt-PT" : "en-IE", { style: "currency", currency: "EUR" }).format(value);
}

function formatPercent(value) {
  return new Intl.NumberFormat(language === "pt" ? "pt-PT" : "en-GB", { maximumFractionDigits: 1 }).format(value * 100) + "%";
}

function personName(index) {
  const fallback = index === 0 ? t("personA") : t("personB");
  return state.people[index].name.trim() || fallback;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    elements.saveStatus.textContent = t("saved");
  } catch {
    elements.saveStatus.textContent = t("saveFailed");
  }
}

function categoryOptions(selected) {
  return categories.map((category) => `<option value="${escapeHtml(category)}"${category === selected ? " selected" : ""}>${escapeHtml(translations[language].categories[category])}</option>`).join("");
}

function expenseMarkup(expense) {
  return `
    <div class="expense-row" data-expense-id="${escapeHtml(expense.id)}">
      <label><span class="sr-only">${t("expenseType")}</span><select data-field="category" aria-label="${t("expenseType")}">${categoryOptions(expense.category)}</select></label>
      <label><span class="sr-only">${t("monthlyAmount")}</span><div class="money-input"><input data-field="amount" aria-label="${t("monthlyValueOf")} ${escapeHtml(translations[language].categories[expense.category])}" type="number" min="0" max="10000000" step="any" value="${escapeHtml(expense.amount)}" inputmode="decimal" /><span>&euro;</span></div></label>
      <button type="button" class="remove-expense" data-remove-expense aria-label="${t("remove")} ${escapeHtml(translations[language].categories[expense.category])}">&times;</button>
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
  remainingA.textContent = `${t("remains")} ${formatCurrency(split.remainingA)}`;
  remainingB.textContent = `${t("remains")} ${formatCurrency(split.remainingB)}`;
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
  elements.resultAIncome.textContent = `${t("income")}: ${formatCurrency(result.incomeA)}`;
  elements.resultBIncome.textContent = `${t("income")}: ${formatCurrency(result.incomeB)}`;
  elements.resultAPayment.textContent = formatCurrency(selected.paymentA);
  elements.resultBPayment.textContent = formatCurrency(selected.paymentB);
  elements.resultARemaining.textContent = formatCurrency(selected.remainingA);
  elements.resultBRemaining.textContent = formatCurrency(selected.remainingB);
  setNegativeState(elements.resultARemaining, selected.remainingA);
  setNegativeState(elements.resultBRemaining, selected.remainingB);

  document.querySelectorAll("[data-mode]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.mode === state.mode)));
  document.querySelectorAll("[data-comparison]").forEach((card) => card.classList.toggle("is-selected", card.dataset.comparison === state.mode));

  if (state.mode === "proportional" && result.totalIncome === 0) {
    elements.resultNote.textContent = t("proportionalPrompt");
  } else if (state.mode === "proportional") {
    elements.resultNote.textContent = `${nameA} ${t("assumes")} ${formatPercent(result.shareA)} ${language === "pt" ? "e" : "and"} ${nameB} ${t("assumes")} ${formatPercent(result.shareB)} ${t("commonExpenses")}.`;
  } else {
    elements.resultNote.textContent = t("equalNote");
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
  expense.category = categories.includes(event.target.value) ? event.target.value : "other";
  row.querySelector("[data-field='amount']").setAttribute("aria-label", `${t("monthlyValueOf")} ${translations[language].categories[expense.category]}`);
  row.querySelector("[data-remove-expense]").setAttribute("aria-label", `${t("remove")} ${translations[language].categories[expense.category]}`);
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
  state.expenses.push({ id: createId(), category: "other", amount: 0 });
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
    people: [{ name: t("personA"), income: 1000 }, { name: t("personB"), income: 1500 }],
    expenses: [
      { id: createId(), category: "rent", amount: 700 },
      { id: createId(), category: "electricity", amount: 60 },
      { id: createId(), category: "water", amount: 40 },
      { id: createId(), category: "telecom", amount: 40 },
      { id: createId(), category: "groceries", amount: 160 }
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

function applyLanguage(next) {
  const previous = language;
  language = saveLanguage(next);
  state.people.forEach((person, index) => {
    const oldDefault = index === 0 ? translations[previous].personA : translations[previous].personB;
    const otherDefault = index === 0 ? translations[language === "pt" ? "en" : "pt"].personA : translations[language === "pt" ? "en" : "pt"].personB;
    if (person.name === oldDefault || person.name === otherDefault) person.name = index === 0 ? t("personA") : t("personB");
  });
  document.documentElement.lang = language === "pt" ? "pt-PT" : "en";
  document.title = `Fair Share — EstrelaLuaApps`;
  applyTranslations(document, translations, language);
  syncInputs();
  renderExpenses();
  renderResults();
  saveState();
}

createLanguageSwitch({ container: document.querySelector("#language-switch"), language, onChange: applyLanguage });
applyLanguage(language);
