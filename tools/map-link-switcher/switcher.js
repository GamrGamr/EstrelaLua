import { buildProviderUrl, LocationParseError, parseLocation } from "./parser.js";

const input = document.querySelector("#destination-input");
const pasteButton = document.querySelector("#paste-button");
const status = document.querySelector("#parse-status");
const fieldset = document.querySelector("#provider-fieldset");
const openButton = document.querySelector("#open-button");
const form = document.querySelector("#switcher-form");
let parsedLocation = null;

function selectedProvider() {
  return form.elements.provider.value;
}

function updateOpenLink() {
  if (!parsedLocation) {
    openButton.removeAttribute("href");
    openButton.removeAttribute("target");
    openButton.removeAttribute("rel");
    openButton.classList.add("is-disabled");
    openButton.setAttribute("aria-disabled", "true");
    return;
  }
  openButton.href = buildProviderUrl(selectedProvider(), parsedLocation);
  openButton.target = "_blank";
  openButton.rel = "noopener noreferrer";
  openButton.classList.remove("is-disabled");
  openButton.setAttribute("aria-disabled", "false");
}

function updateDestination() {
  const value = input.value.trim();
  if (!value) {
    parsedLocation = null;
    fieldset.disabled = true;
    status.className = "status";
    status.textContent = "Paste a destination to begin.";
    updateOpenLink();
    return;
  }

  try {
    parsedLocation = parseLocation(value);
    fieldset.disabled = false;
    status.className = "status success";
    const exact = parsedLocation.coordinates ? "Exact coordinates found" : "Place or address found";
    status.innerHTML = `<span><strong>${escapeHtml(parsedLocation.label)}</strong><br>${exact} · from ${escapeHtml(parsedLocation.source)}</span>`;
  } catch (error) {
    parsedLocation = null;
    fieldset.disabled = true;
    status.className = "status error";
    status.textContent = error instanceof LocationParseError ? error.message : "That destination could not be read.";
  }
  updateOpenLink();
}

function escapeHtml(value) {
  const element = document.createElement("span");
  element.textContent = value;
  return element.innerHTML;
}

input.addEventListener("input", updateDestination);
form.addEventListener("change", event => {
  if (event.target.name === "provider") updateOpenLink();
});
openButton.addEventListener("click", event => {
  if (!parsedLocation) event.preventDefault();
});

pasteButton.addEventListener("click", async () => {
  try {
    input.value = await navigator.clipboard.readText();
    input.focus();
    updateDestination();
  } catch {
    status.className = "status error";
    status.textContent = "Clipboard access was blocked. Paste into the box with Ctrl+V or press and hold on mobile.";
    input.focus();
  }
});

updateDestination();
