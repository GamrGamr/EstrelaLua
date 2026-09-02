import { ValidationError, calculateHomeEnergy, formatCurrency, formatNumber, sanitiseDecimalInput, sanitiseIntegerInput } from "./calculations.js?v=9";
import { getLanguage, saveLanguage } from "../../assets/i18n-core.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const STORAGE_KEY = "estrelalua-home-energy-v3";
const APP_LANGUAGE_KEY = "estrelalua-home-energy-language";
let nextRowId = 1;
let calculateTimer = 0;
let lastResult = null;

const translations = {
  en: {
    pageTitle: "Home Energy Calculator — EstrelaLuaApps",
    metaDescription: "Estimate household electricity use and cost by appliance, day, month, and year.",
    skipLink: "Skip to calculator", homeLabel: "EstrelaLuaApps home", navLabel: "Calculator navigation",
    allApps: "All apps", appliances: "Appliances", results: "Results",
    heroKicker: "Household electricity · Manual calculator", heroTitle: "Know what powers", heroEmphasis: "your monthly bill.",
    heroDescription: "Add the appliances you use at home and estimate their electricity consumption and cost. Everything stays in this browser.",
    privateLocal: "Private & local", yourTariff: "Your tariff", electricityTariff: "Electricity tariff",
    energyPrice: "Energy price", energyPriceHelp: "For example, enter 0.14 when energy costs €0.14 per kWh.",
    contractedPowerPriceLabel: "Contracted power price <span>Optional</span>", contractedPowerHelp: "Enter the daily contracted-power price shown on your bill.",
    energyIvaLabel: "Energy IVA <span>Optional</span>", energyIvaHelp: "Enter the IVA rate from your bill, or leave 0 if the energy price already includes IVA.",
    contractedPowerIvaLabel: "Contracted power IVA <span>Optional</span>", contractedPowerIvaHelp: "Enter the IVA rate from your bill, or leave 0 if the power price already includes IVA.",
    billingDays: "Billing days", daysUnit: "days", eurPerDay: "EUR/day", billingDaysHelp: "Use the number of days covered by the electricity bill.",
    fixedChargesLabel: "Other fixed charges <span>Optional</span>", fixedChargesHelp: "Add another recurring charge only if you want it included.",
    yourHome: "Your home", loadExample: "Load example", addAppliance: "Add appliance",
    applianceIntro: "Enter the values you know. A measured kWh value is used directly; when it is empty, the calculator estimates from power and running time.",
    changesSaved: "Changes are saved on this device.", saved: "Saved on this device.", saveFailed: "This browser could not save the setup.",
    clearAll: "Clear all", calculateCosts: "Calculate costs", estimatedTotal: "Estimated household total", monthlyCost: "Monthly cost",
    includingCharges: "including IVA, power, and fixed charges", monthlyUse: "Monthly use", averageDailyCost: "Average daily cost",
    yearlyCost: "Yearly cost", yearlyUse: "Yearly use", energyCharge: "Energy charge", energyIva: "Energy IVA",
    contractedPower: "Contracted power", contractedPowerIva: "Contracted power IVA", otherFixedCharges: "Other fixed charges",
    averageDailyUse: "Average daily use", biggestUsers: "Biggest energy users", perMonth: "per month",
    emptyUsage: "Add an appliance to see its share.",
    estimateNote: "These results use the IVA rates and prices you enter. Your electricity bill may also include other taxes, fees, tariff periods, and changing prices.",
    privacyKicker: "Privacy by default", privacyTitle: "Your home data", privacyEmphasis: "stays at home.",
    privacyDescription: "The calculator runs entirely in your browser. Appliance details and tariff values are stored only on this device so they are ready when you return. No account, server, analytics, or energy-provider connection is used.",
    appliance: "Appliance", applianceNumber: "Appliance {number}", removeAppliance: "Remove appliance", applianceName: "Appliance name",
    appliancePlaceholder: "For example, computer", power: "Power", quantity: "Quantity", hoursPerDay: "Hours per day", daysPerMonth: "Days per month",
    measuredKwhLabel: "Measured kWh <span>Monthly total</span>", measuredKwhHelp: "Enter measured kWh to use the meter reading instead of Power, Quantity, Hours, and Days.",
    measuredActive: "Measured kWh is active. Power, Quantity, Hours, and Days are ignored for this appliance.",
    enterApplianceDetails: "Enter the appliance details to calculate its monthly use.", invalidMeasured: "Enter a valid measured monthly kWh value.",
    monthlyEstimate: "{kwh} kWh/month · {cost}/month", trademarkCopyright: "Trademark & copyright", calculatorTests: "Calculator tests",
    exampleRefrigerator: "Refrigerator", exampleTelevision: "Television", exampleWasher: "Washing machine", exampleLaptop: "Laptop",
    fieldElectricityPrice: "Electricity price", fieldEnergyIva: "Energy IVA", fieldPowerPrice: "Contracted power price",
    fieldPowerIva: "Contracted power IVA", fieldBillingDays: "Billing days", fieldFixedCharge: "Fixed monthly charge",
    fieldMonthlyUse: "{name} monthly use", fieldPower: "{name} power", fieldQuantity: "{name} quantity",
    fieldDailyUse: "{name} daily use", fieldMonthlyDays: "{name} monthly days",
    errorRequired: "{field} is required.", errorInvalid: "{field} must be a valid number.", errorMinimum: "{field} must be at least {value}.",
    errorMaximum: "{field} cannot be greater than {value}.", errorInteger: "{field} must be a whole number.", errorAppliance: "Add at least one appliance before calculating.",
  },
  pt: {
    pageTitle: "Calculadora de Energia Doméstica — EstrelaLuaApps",
    metaDescription: "Estime o consumo e o custo da eletricidade doméstica por aparelho, dia, mês e ano.",
    skipLink: "Ir para a calculadora", homeLabel: "Página inicial da EstrelaLuaApps", navLabel: "Navegação da calculadora",
    allApps: "Todas as aplicações", appliances: "Aparelhos", results: "Resultados",
    heroKicker: "Eletricidade doméstica · Calculadora manual", heroTitle: "Descubra o que pesa", heroEmphasis: "na sua fatura mensal.",
    heroDescription: "Adicione os aparelhos que utiliza em casa e estime o respetivo consumo e custo de eletricidade. Tudo fica neste navegador.",
    privateLocal: "Privado e local", yourTariff: "O seu tarifário", electricityTariff: "Tarifário de eletricidade",
    energyPrice: "Preço da energia", energyPriceHelp: "Por exemplo, introduza 0,14 quando a energia custa 0,14 € por kWh.",
    contractedPowerPriceLabel: "Preço da potência contratada <span>Opcional</span>", contractedPowerHelp: "Introduza o preço diário da potência contratada indicado na sua fatura.",
    energyIvaLabel: "IVA da energia <span>Opcional</span>", energyIvaHelp: "Introduza a taxa de IVA da sua fatura ou deixe 0 se o preço da energia já incluir IVA.",
    contractedPowerIvaLabel: "IVA da potência contratada <span>Opcional</span>", contractedPowerIvaHelp: "Introduza a taxa de IVA da sua fatura ou deixe 0 se o preço da potência já incluir IVA.",
    billingDays: "Dias de faturação", daysUnit: "dias", eurPerDay: "EUR/dia", billingDaysHelp: "Utilize o número de dias abrangidos pela fatura de eletricidade.",
    fixedChargesLabel: "Outros custos fixos <span>Opcional</span>", fixedChargesHelp: "Adicione outro custo recorrente apenas se pretender incluí-lo.",
    yourHome: "A sua casa", loadExample: "Carregar exemplo", addAppliance: "Adicionar aparelho",
    applianceIntro: "Introduza os valores que conhece. Um valor de kWh medido é usado diretamente; se ficar vazio, a calculadora estima o consumo com base na potência e no tempo de utilização.",
    changesSaved: "As alterações são guardadas neste dispositivo.", saved: "Guardado neste dispositivo.", saveFailed: "Este navegador não conseguiu guardar a configuração.",
    clearAll: "Limpar tudo", calculateCosts: "Calcular custos", estimatedTotal: "Total estimado da casa", monthlyCost: "Custo mensal",
    includingCharges: "incluindo IVA, potência e custos fixos", monthlyUse: "Consumo mensal", averageDailyCost: "Custo médio diário",
    yearlyCost: "Custo anual", yearlyUse: "Consumo anual", energyCharge: "Custo da energia", energyIva: "IVA da energia",
    contractedPower: "Potência contratada", contractedPowerIva: "IVA da potência contratada", otherFixedCharges: "Outros custos fixos",
    averageDailyUse: "Consumo médio diário", biggestUsers: "Maiores consumos de energia", perMonth: "por mês",
    emptyUsage: "Adicione um aparelho para ver a sua percentagem.",
    estimateNote: "Estes resultados utilizam as taxas de IVA e os preços introduzidos. A sua fatura de eletricidade também pode incluir outros impostos, taxas, períodos tarifários e preços variáveis.",
    privacyKicker: "Privacidade por defeito", privacyTitle: "Os dados da sua casa", privacyEmphasis: "ficam na sua casa.",
    privacyDescription: "A calculadora funciona inteiramente no seu navegador. Os dados dos aparelhos e do tarifário são guardados apenas neste dispositivo para estarem disponíveis quando voltar. Não são utilizados contas, servidores, análises nem ligações ao fornecedor de energia.",
    appliance: "Aparelho", applianceNumber: "Aparelho {number}", removeAppliance: "Remover aparelho", applianceName: "Nome do aparelho",
    appliancePlaceholder: "Por exemplo, computador", power: "Potência", quantity: "Quantidade", hoursPerDay: "Horas por dia", daysPerMonth: "Dias por mês",
    measuredKwhLabel: "kWh medidos <span>Total mensal</span>", measuredKwhHelp: "Introduza os kWh medidos para utilizar a leitura do medidor em vez da Potência, Quantidade, Horas e Dias.",
    measuredActive: "Os kWh medidos estão ativos. A Potência, Quantidade, Horas e Dias deste aparelho são ignorados.",
    enterApplianceDetails: "Introduza os dados do aparelho para calcular o respetivo consumo mensal.", invalidMeasured: "Introduza um valor válido de kWh mensais medidos.",
    monthlyEstimate: "{kwh} kWh/mês · {cost}/mês", trademarkCopyright: "Marca e direitos de autor", calculatorTests: "Testes da calculadora",
    exampleRefrigerator: "Frigorífico", exampleTelevision: "Televisão", exampleWasher: "Máquina de lavar roupa", exampleLaptop: "Portátil",
    fieldElectricityPrice: "O preço da eletricidade", fieldEnergyIva: "O IVA da energia", fieldPowerPrice: "O preço da potência contratada",
    fieldPowerIva: "O IVA da potência contratada", fieldBillingDays: "O número de dias de faturação", fieldFixedCharge: "O custo fixo mensal",
    fieldMonthlyUse: "O consumo mensal de {name}", fieldPower: "A potência de {name}", fieldQuantity: "A quantidade de {name}",
    fieldDailyUse: "A utilização diária de {name}", fieldMonthlyDays: "Os dias mensais de {name}",
    errorRequired: "{field} é obrigatório.", errorInvalid: "{field} tem de ser um número válido.", errorMinimum: "{field} tem de ser pelo menos {value}.",
    errorMaximum: "{field} não pode ser superior a {value}.", errorInteger: "{field} tem de ser um número inteiro.", errorAppliance: "Adicione pelo menos um aparelho antes de calcular.",
  },
};

function storedLanguage() {
  try {
    const requested = new URLSearchParams(location.search).get("lang");
    if (requested === "pt" || requested === "en") return requested;
    const legacy = localStorage.getItem(APP_LANGUAGE_KEY);
    return legacy === "pt" || legacy === "en" ? legacy : getLanguage();
  } catch { return getLanguage(); }
}

let currentLanguage = storedLanguage();
const t = (key, replacements = {}) => Object.entries(replacements).reduce(
  (text, [name, value]) => text.replaceAll(`{${name}}`, value),
  translations[currentLanguage][key] ?? translations.en[key] ?? key,
);
const locale = () => currentLanguage === "pt" ? "pt-PT" : "en-GB";
const localNumber = (value, digits = 2) => formatNumber(value, digits, locale());
const localCurrency = (value) => formatCurrency(value, locale());

const blankAppliance = () => ({ id: String(nextRowId++), name: "", watts: "0", quantity: "1", hoursPerDay: "0", daysPerMonth: "0", monthlyKwh: "0" });
const exampleHome = [
  { nameKey: "exampleRefrigerator", watts: "120", quantity: "1", hoursPerDay: "8", daysPerMonth: "30" },
  { nameKey: "exampleTelevision", watts: "100", quantity: "1", hoursPerDay: "4", daysPerMonth: "30" },
  { nameKey: "exampleWasher", watts: "2000", quantity: "1", hoursPerDay: "1", daysPerMonth: "12" },
  { nameKey: "exampleLaptop", watts: "60", quantity: "1", hoursPerDay: "6", daysPerMonth: "30" },
];

function applyTranslations(root = document) {
  $$('[data-i18n]', root).forEach((element) => { element.textContent = t(element.dataset.i18n); });
  $$('[data-i18n-html]', root).forEach((element) => { element.innerHTML = t(element.dataset.i18nHtml); });
  $$('[data-i18n-placeholder]', root).forEach((element) => { element.placeholder = t(element.dataset.i18nPlaceholder); });
  $$('[data-i18n-aria-label]', root).forEach((element) => { element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel)); });
  $$('[data-i18n-content]', root).forEach((element) => { element.setAttribute("content", t(element.dataset.i18nContent)); });
}

function setLanguage(language, { persist = true } = {}) {
  currentLanguage = language === "pt" ? "pt" : "en";
  document.documentElement.lang = currentLanguage === "pt" ? "pt-PT" : "en";
  document.title = t("pageTitle");
  applyTranslations();
  $$("#language-switch button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage));
  });
  $$(".appliance-row").forEach((row) => {
    if (row.dataset.exampleName) $(".appliance-name", row).value = t(row.dataset.exampleName);
    syncMeasuredMode(row);
  });
  syncRowLabels();
  clearErrors();
  if (lastResult) {
    const translatedResult = calculate({ showErrors: false });
    if (!translatedResult) renderResult(lastResult);
  } else resetResults();
  if (persist) {
    saveLanguage(currentLanguage);
    try { localStorage.setItem(APP_LANGUAGE_KEY, currentLanguage); } catch {}
    try { const url = new URL(location.href); url.searchParams.set("lang", currentLanguage); history.replaceState(null, "", url); } catch {}
  }
}

function addAppliance(appliance = blankAppliance()) {
  const fragment = $("#appliance-template").content.cloneNode(true);
  applyTranslations(fragment);
  const row = $(".appliance-row", fragment);
  const rowId = appliance.id || String(nextRowId++);
  row.dataset.id = rowId;
  const numericId = Number(rowId);
  if (Number.isInteger(numericId)) {
    nextRowId = Math.max(nextRowId, numericId + 1);
  }
  if (appliance.nameKey) row.dataset.exampleName = appliance.nameKey;
  $(".appliance-name", row).value = appliance.nameKey ? t(appliance.nameKey) : appliance.name ?? "";
  $(".appliance-watts", row).value = appliance.watts ?? "0";
  $(".appliance-quantity", row).value = appliance.quantity ?? "1";
  $(".appliance-hours", row).value = appliance.hoursPerDay ?? "0";
  $(".appliance-days", row).value = appliance.daysPerMonth ?? "0";
  $(".appliance-known-kwh", row).value = appliance.monthlyKwh ?? "0";
  $("#appliance-list").append(row);
  syncRowLabels();
  syncMeasuredMode(row);
}

function syncMeasuredMode(row) {
  const measuredInput = $(".appliance-known-kwh", row);
  const measuredValue = Number(measuredInput.value.trim().replace(",", "."));
  const usesMeasuredKwh = Number.isFinite(measuredValue) && measuredValue > 0;
  row.classList.toggle("uses-measured-kwh", usesMeasuredKwh);
  $$(".appliance-watts, .appliance-quantity, .appliance-hours, .appliance-days", row).forEach((input) => {
    input.disabled = usesMeasuredKwh;
  });
  $(".input-choice-note", row).textContent = usesMeasuredKwh
    ? t("measuredActive")
    : t("measuredKwhHelp");
}

function applyInputBounds(input) {
  const value = Number(input.value.replace(",", "."));
  if (!input.value.trim() || !Number.isFinite(value)) return;
  const minimum = input.dataset.min === undefined ? null : Number(input.dataset.min);
  const maximum = input.dataset.max === undefined ? null : Number(input.dataset.max);
  if (minimum !== null && value < minimum) input.value = String(minimum);
  if (maximum !== null && value > maximum) input.value = String(maximum);
}

function syncRowLabels() {
  $$(".appliance-row").forEach((row, index) => {
    $("h3", row).textContent = t("applianceNumber", { number: index + 1 });
    const fields = [
      [".appliance-name", "name"], [".appliance-watts", "watts"], [".appliance-quantity", "quantity"],
      [".appliance-hours", "hours"], [".appliance-days", "days"],
      [".appliance-known-kwh", "kwh"],
    ];
    fields.forEach(([selector, suffix]) => {
      const control = $(selector, row);
      control.id = `appliance-${index}-${suffix}`;
      control.closest(".field").querySelector("label").htmlFor = control.id;
    });
  });
}

function readAppliances() {
  syncRowLabels();
  return $$(".appliance-row").map((row) => ({
    id: row.dataset.id,
    name: $(".appliance-name", row).value,
    nameKey: row.dataset.exampleName || undefined,
    watts: $(".appliance-watts", row).value,
    quantity: $(".appliance-quantity", row).value,
    hoursPerDay: $(".appliance-hours", row).value,
    daysPerMonth: $(".appliance-days", row).value,
    monthlyKwh: $(".appliance-known-kwh", row).value,
  }));
}

function readInput() {
  return {
    pricePerKwh: $("#price-per-kwh").value,
    energyIvaRate: $("#energy-iva").value,
    contractedPowerPricePerDay: $("#contracted-power-price").value,
    contractedPowerIvaRate: $("#contracted-power-iva").value,
    billingDays: $("#billing-days").value,
    fixedMonthlyCost: $("#fixed-monthly-cost").value,
    appliances: readAppliances(),
  };
}

function saveDraft() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readInput()));
    $("#save-status").textContent = t("saved");
  } catch {
    $("#save-status").textContent = t("saveFailed");
  }
}

function loadDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.appliances)) return false;
    $("#price-per-kwh").value = saved.pricePerKwh ?? "0";
    $("#energy-iva").value = saved.energyIvaRate ?? "0";
    $("#contracted-power-price").value = saved.contractedPowerPricePerDay ?? "0";
    $("#contracted-power-iva").value = saved.contractedPowerIvaRate ?? "0";
    $("#billing-days").value = saved.billingDays ?? "0";
    $("#fixed-monthly-cost").value = saved.fixedMonthlyCost ?? "0";
    saved.appliances.forEach(addAppliance);
    return true;
  } catch { return false; }
}

function clearErrors() {
  $$('[aria-invalid="true"]').forEach((field) => field.removeAttribute("aria-invalid"));
  $("#form-message").textContent = "";
  $("#form-message").className = "form-message";
}

function showError(error) {
  $("#form-message").textContent = translateValidationError(error);
  $("#form-message").className = "form-message error";
  if (error.fieldId) {
    const field = document.getElementById(error.fieldId);
    if (field) { field.setAttribute("aria-invalid", "true"); field.focus(); }
  }
}

function validationFieldName(fieldId) {
  const staticFields = {
    "price-per-kwh": "fieldElectricityPrice", "energy-iva": "fieldEnergyIva",
    "contracted-power-price": "fieldPowerPrice", "contracted-power-iva": "fieldPowerIva",
    "billing-days": "fieldBillingDays", "fixed-monthly-cost": "fieldFixedCharge",
  };
  if (staticFields[fieldId]) return t(staticFields[fieldId]);
  const match = fieldId.match(/^appliance-(\d+)-(kwh|watts|quantity|hours|days)$/);
  if (!match) return "";
  const row = $$(".appliance-row")[Number(match[1])];
  const name = row?.querySelector(".appliance-name")?.value.trim() || t("applianceNumber", { number: Number(match[1]) + 1 });
  const fieldKeys = { kwh: "fieldMonthlyUse", watts: "fieldPower", quantity: "fieldQuantity", hours: "fieldDailyUse", days: "fieldMonthlyDays" };
  return t(fieldKeys[match[2]], { name });
}

function translateValidationError(error) {
  if (currentLanguage === "en") return error.message;
  if (error.fieldId === "appliance-list") return t("errorAppliance");
  const field = validationFieldName(error.fieldId);
  if (!field) return error.message;
  if (/ is required\.$/.test(error.message)) return t("errorRequired", { field });
  if (/ must be a valid number\.$/.test(error.message)) return t("errorInvalid", { field });
  if (/ must be a whole number\.$/.test(error.message)) return t("errorInteger", { field });
  const minimum = error.message.match(/ must be at least ([\d.]+)\.$/);
  if (minimum) return t("errorMinimum", { field, value: minimum[1] });
  const maximum = error.message.match(/ cannot be greater than ([\d.]+)\.$/);
  if (maximum) return t("errorMaximum", { field, value: maximum[1] });
  return error.message;
}

function updateRowEstimates(result) {
  const byId = new Map(result.items.map((item) => [String(item.id), item]));
  $$(".appliance-row").forEach((row) => {
    const item = byId.get(String(row.dataset.id));
    $(".row-estimate", row).textContent = item
      ? t("monthlyEstimate", { kwh: localNumber(item.monthlyKwh), cost: localCurrency(item.monthlyCost) })
      : Number($(".appliance-known-kwh", row).value.trim().replace(",", ".")) > 0
        ? t("invalidMeasured")
        : t("enterApplianceDetails");
  });
}

function renderResult(result) {
  lastResult = result;
  $("#monthly-cost").textContent = localCurrency(result.monthlyCost);
  $("#monthly-kwh").textContent = `${localNumber(result.monthlyKwh)} kWh`;
  $("#daily-cost").textContent = localCurrency(result.dailyCost);
  $("#annual-cost").textContent = localCurrency(result.annualCost);
  $("#annual-kwh").textContent = `${localNumber(result.annualKwh)} kWh`;
  $("#energy-charge").textContent = localCurrency(result.monthlyEnergySubtotal);
  $("#energy-iva-charge").textContent = localCurrency(result.monthlyEnergyIva);
  $("#power-charge").textContent = localCurrency(result.monthlyPowerSubtotal);
  $("#power-iva-charge").textContent = localCurrency(result.monthlyPowerIva);
  $("#fixed-charge").textContent = localCurrency(result.fixedMonthlyCost);
  $("#daily-kwh").textContent = `${localNumber(result.dailyKwh)} kWh`;

  const maximum = Math.max(...result.items.map((item) => item.monthlyKwh), 1);
  $("#usage-list").innerHTML = result.items.length ? result.items.map((item) => {
    const share = result.monthlyKwh ? (item.monthlyKwh / result.monthlyKwh) * 100 : 0;
    const width = Math.max(3, (item.monthlyKwh / maximum) * 100);
    return `<li><div class="usage-copy"><strong>${escapeHtml(item.name)}</strong><span>${localNumber(item.monthlyKwh)} kWh · ${localCurrency(item.monthlyCost)} · ${localNumber(share, 1)}%</span></div><div class="usage-bar"><span style="width:${width}%"></span></div></li>`;
  }).join("") : `<li class="empty-result">${t("emptyUsage")}</li>`;
  updateRowEstimates(result);
}

function resetResults() {
  window.clearTimeout(calculateTimer);
  renderResult({
    monthlyCost: 0,
    monthlyKwh: 0,
    dailyCost: 0,
    annualCost: 0,
    annualKwh: 0,
    monthlyEnergySubtotal: 0,
    monthlyEnergyIva: 0,
    monthlyPowerSubtotal: 0,
    monthlyPowerIva: 0,
    fixedMonthlyCost: 0,
    dailyKwh: 0,
    items: [],
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function calculate({ showErrors = true } = {}) {
  clearErrors();
  try {
    const result = calculateHomeEnergy(readInput());
    renderResult(result);
    return result;
  } catch (error) {
    if (showErrors && error instanceof ValidationError) showError(error);
    return null;
  }
}

function scheduleCalculation() {
  window.clearTimeout(calculateTimer);
  calculateTimer = window.setTimeout(() => { saveDraft(); calculate({ showErrors: false }); }, 180);
}

function bindEvents() {
  $("#language-switch").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-language]");
    if (button) setLanguage(button.dataset.language);
  });
  $("#energy-form").addEventListener("submit", (event) => { event.preventDefault(); saveDraft(); calculate(); });
  $("#add-appliance").addEventListener("click", () => { addAppliance(); saveDraft(); $(".appliance-row:last-child .appliance-name").focus(); });
  $("#load-example").addEventListener("click", () => {
    $("#price-per-kwh").value = "0.25";
    $("#energy-iva").value = "0";
    $("#contracted-power-price").value = "0";
    $("#contracted-power-iva").value = "0";
    $("#billing-days").value = "30";
    $("#fixed-monthly-cost").value = "0";
    $("#appliance-list").replaceChildren();
    exampleHome.forEach((item) => addAppliance({ id: String(nextRowId++), ...item }));
    saveDraft(); calculate();
  });
  $("#reset-calculator").addEventListener("click", () => {
    $("#price-per-kwh").value = "0";
    $("#energy-iva").value = "0";
    $("#contracted-power-price").value = "0";
    $("#contracted-power-iva").value = "0";
    $("#billing-days").value = "0";
    $("#fixed-monthly-cost").value = "0";
    $("#appliance-list").replaceChildren();
    addAppliance({ id: String(nextRowId++), name: "", watts: "0", quantity: "1", hoursPerDay: "0", daysPerMonth: "0", monthlyKwh: "0" });
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    clearErrors();
    resetResults();
  });
  $("#appliance-list").addEventListener("click", (event) => {
    const button = event.target.closest(".remove-appliance");
    if (!button) return;
    button.closest(".appliance-row").remove();
    if (!$(".appliance-row")) addAppliance();
    syncRowLabels(); saveDraft(); calculate({ showErrors: false });
  });
  document.addEventListener("beforeinput", (event) => {
    if (!(event.target instanceof HTMLInputElement) || !event.inputType.startsWith("insert") || event.data === null) return;
    const sanitise = event.target.inputMode === "decimal" ? sanitiseDecimalInput : event.target.inputMode === "numeric" ? sanitiseIntegerInput : null;
    if (!sanitise) return;
    const start = event.target.selectionStart ?? event.target.value.length;
    const end = event.target.selectionEnd ?? start;
    const nextValue = `${event.target.value.slice(0, start)}${event.data}${event.target.value.slice(end)}`;
    if (sanitise(nextValue) !== nextValue) event.preventDefault();
  });
  document.addEventListener("input", (event) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    if (event.target.classList.contains("appliance-name")) delete event.target.closest(".appliance-row").dataset.exampleName;
    if (event.target.inputMode === "decimal") event.target.value = sanitiseDecimalInput(event.target.value);
    if (event.target.inputMode === "numeric") event.target.value = sanitiseIntegerInput(event.target.value);
    applyInputBounds(event.target);
    if (event.target.classList.contains("appliance-known-kwh")) syncMeasuredMode(event.target.closest(".appliance-row"));
    event.target.removeAttribute("aria-invalid");
    scheduleCalculation();
  });
}

setLanguage(currentLanguage, { persist: false });
bindEvents();
if (!loadDraft()) addAppliance();
calculate({ showErrors: false });
