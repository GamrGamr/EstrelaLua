import { ValidationError, calculateHomeEnergy, formatCurrency, formatNumber, sanitiseDecimalInput, sanitiseIntegerInput } from "./calculations.js?v=1";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const STORAGE_KEY = "estrelalua-home-energy-v1";
let nextRowId = 1;
let calculateTimer = 0;

const blankAppliance = () => ({ id: String(nextRowId++), name: "", watts: "", quantity: "1", hoursPerDay: "", daysPerMonth: "30" });
const exampleHome = [
  { name: "Refrigerator", watts: "120", quantity: "1", hoursPerDay: "8", daysPerMonth: "30" },
  { name: "Television", watts: "100", quantity: "1", hoursPerDay: "4", daysPerMonth: "30" },
  { name: "Washing machine", watts: "2000", quantity: "1", hoursPerDay: "1", daysPerMonth: "12" },
  { name: "Laptop", watts: "60", quantity: "1", hoursPerDay: "6", daysPerMonth: "30" },
];

function addAppliance(appliance = blankAppliance()) {
  const fragment = $("#appliance-template").content.cloneNode(true);
  const row = $(".appliance-row", fragment);
  const rowId = appliance.id || String(nextRowId++);
  row.dataset.id = rowId;
  const numericId = Number(rowId);
  if (Number.isInteger(numericId)) {
    nextRowId = Math.max(nextRowId, numericId + 1);
  }
  $(".appliance-name", row).value = appliance.name ?? "";
  $(".appliance-watts", row).value = appliance.watts ?? "";
  $(".appliance-quantity", row).value = appliance.quantity ?? "1";
  $(".appliance-hours", row).value = appliance.hoursPerDay ?? "";
  $(".appliance-days", row).value = appliance.daysPerMonth ?? "30";
  $("#appliance-list").append(row);
  syncRowLabels();
}

function syncRowLabels() {
  $$(".appliance-row").forEach((row, index) => {
    $("h3", row).textContent = `Appliance ${index + 1}`;
    const fields = [
      [".appliance-name", "name"], [".appliance-watts", "watts"], [".appliance-quantity", "quantity"],
      [".appliance-hours", "hours"], [".appliance-days", "days"],
    ];
    fields.forEach(([selector, suffix]) => {
      const input = $(selector, row);
      input.id = `appliance-${index}-${suffix}`;
      input.closest(".field").querySelector("label").htmlFor = input.id;
    });
  });
}

function readAppliances() {
  syncRowLabels();
  return $$(".appliance-row").map((row) => ({
    id: row.dataset.id,
    name: $(".appliance-name", row).value,
    watts: $(".appliance-watts", row).value,
    quantity: $(".appliance-quantity", row).value,
    hoursPerDay: $(".appliance-hours", row).value,
    daysPerMonth: $(".appliance-days", row).value,
  }));
}

function readInput() {
  return { pricePerKwh: $("#price-per-kwh").value, fixedMonthlyCost: $("#fixed-monthly-cost").value, appliances: readAppliances() };
}

function saveDraft() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readInput()));
    $("#save-status").textContent = "Saved on this device.";
  } catch {
    $("#save-status").textContent = "This browser could not save the setup.";
  }
}

function loadDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.appliances)) return false;
    $("#price-per-kwh").value = saved.pricePerKwh ?? "0.25";
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
  $("#form-message").textContent = error.message;
  $("#form-message").className = "form-message error";
  if (error.fieldId) {
    const field = document.getElementById(error.fieldId);
    if (field) { field.setAttribute("aria-invalid", "true"); field.focus(); }
  }
}

function updateRowEstimates(result) {
  const byId = new Map(result.items.map((item) => [String(item.id), item]));
  $$(".appliance-row").forEach((row) => {
    const item = byId.get(String(row.dataset.id));
    $(".row-estimate", row).textContent = item
      ? `${formatNumber(item.monthlyKwh)} kWh/month · ${formatCurrency(item.monthlyCost)}/month`
      : "Enter the appliance details to calculate its monthly use.";
  });
}

function renderResult(result) {
  $("#monthly-cost").textContent = formatCurrency(result.monthlyCost);
  $("#monthly-kwh").textContent = `${formatNumber(result.monthlyKwh)} kWh`;
  $("#daily-cost").textContent = formatCurrency(result.dailyCost);
  $("#annual-cost").textContent = formatCurrency(result.annualCost);
  $("#annual-kwh").textContent = `${formatNumber(result.annualKwh)} kWh`;
  $("#energy-charge").textContent = formatCurrency(result.monthlyEnergyCost);
  $("#fixed-charge").textContent = formatCurrency(result.fixedMonthlyCost);
  $("#daily-kwh").textContent = `${formatNumber(result.dailyKwh)} kWh`;

  const maximum = Math.max(...result.items.map((item) => item.monthlyKwh), 1);
  $("#usage-list").innerHTML = result.items.map((item) => {
    const share = result.monthlyKwh ? (item.monthlyKwh / result.monthlyKwh) * 100 : 0;
    const width = Math.max(3, (item.monthlyKwh / maximum) * 100);
    return `<li><div class="usage-copy"><strong>${escapeHtml(item.name)}</strong><span>${formatNumber(item.monthlyKwh)} kWh · ${formatCurrency(item.monthlyCost)} · ${formatNumber(share, 1)}%</span></div><div class="usage-bar"><span style="width:${width}%"></span></div></li>`;
  }).join("");
  updateRowEstimates(result);
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
  $("#energy-form").addEventListener("submit", (event) => { event.preventDefault(); saveDraft(); calculate(); });
  $("#add-appliance").addEventListener("click", () => { addAppliance(); saveDraft(); $(".appliance-row:last-child .appliance-name").focus(); });
  $("#load-example").addEventListener("click", () => {
    $("#appliance-list").replaceChildren();
    exampleHome.forEach((item) => addAppliance({ id: String(nextRowId++), ...item }));
    saveDraft(); calculate();
  });
  $("#reset-calculator").addEventListener("click", () => {
    $("#price-per-kwh").value = "0.25";
    $("#fixed-monthly-cost").value = "0";
    $("#appliance-list").replaceChildren();
    addAppliance();
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    clearErrors();
    calculate({ showErrors: false });
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
    if (event.target.inputMode === "decimal") event.target.value = sanitiseDecimalInput(event.target.value);
    if (event.target.inputMode === "numeric") event.target.value = sanitiseIntegerInput(event.target.value);
    event.target.removeAttribute("aria-invalid");
    scheduleCalculation();
  });
}

bindEvents();
if (!loadDraft()) addAppliance();
calculate({ showErrors: false });
