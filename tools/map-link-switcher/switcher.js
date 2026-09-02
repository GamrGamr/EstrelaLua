import { buildProviderUrl, LocationParseError, parseLocation } from "./parser.js";
import { applyTranslations, createLanguageSwitch, getLanguage, saveLanguage } from "../../assets/i18n-core.js";

const translations = {
  en: {
    description: "Open one destination in Google Maps, Waze, Apple Maps, Bing Maps, or OpenStreetMap.", skip: "Skip to converter", home: "EstrelaLuaApps home", nav: "App navigation", allApps: "All apps", about: "About", kicker: "Map link converter", title: "One place.", titleEm: "Any map.", intro: "Paste a map link, address, place name, or coordinates. Choose where to open it.", inputLabel: "Paste a link or location", placeholder: "Google Maps link, address, place name, or 38.7223, -9.1393", paste: "Paste", help: "Full map links work best. Shortened links may hide the destination.", empty: "Paste a destination to begin.", choose: "Choose a map app", open: "Open destination", privacy: "Processed only in this browser. Nothing is uploaded or saved.", legal: "Trademark & copyright", coordinatesFound: "Exact coordinates found", placeFound: "Place or address found", from: "from", unreadable: "That destination could not be read.", clipboard: "Clipboard access was blocked. Paste into the box with Ctrl+V or press and hold on mobile.",
    errors: { empty: "Paste a destination to begin.", "invalid-coordinates": "Coordinates must use a latitude from -90 to 90 and a longitude from -180 to 180.", "invalid-url": "That does not look like a complete map link.", "short-link": "This shortened link hides its destination. Open it first and copy the full address from the browser, or paste the place name instead.", unsupported: "That link does not contain a destination this browser can safely extract.", provider: "Choose a supported map app." },
  },
  pt: {
    description: "Abra o mesmo destino no Google Maps, Waze, Apple Maps, Bing Maps ou OpenStreetMap.", skip: "Saltar para o conversor", home: "Página inicial da EstrelaLuaApps", nav: "Navegação da aplicação", allApps: "Todas as apps", about: "Sobre", kicker: "Conversor de links de mapas", title: "Um lugar.", titleEm: "Qualquer mapa.", intro: "Cole um link de mapa, morada, nome de local ou coordenadas. Escolha onde o quer abrir.", inputLabel: "Cole um link ou local", placeholder: "Link do Google Maps, morada, local ou 38.7223, -9.1393", paste: "Colar", help: "Os links completos funcionam melhor. Os links encurtados podem esconder o destino.", empty: "Cole um destino para começar.", choose: "Escolha uma app de mapas", open: "Abrir destino", privacy: "Processado apenas neste navegador. Nada é enviado ou guardado.", legal: "Marcas e direitos de autor", coordinatesFound: "Coordenadas exatas encontradas", placeFound: "Local ou morada encontrados", from: "origem", unreadable: "Não foi possível interpretar esse destino.", clipboard: "O acesso à área de transferência foi bloqueado. Cole na caixa com Ctrl+V ou mantenha premido no telemóvel.",
    errors: { empty: "Cole um destino para começar.", "invalid-coordinates": "A latitude deve estar entre -90 e 90 e a longitude entre -180 e 180.", "invalid-url": "Isto não parece ser um link de mapa completo.", "short-link": "Este link encurtado esconde o destino. Abra-o primeiro e copie o endereço completo do navegador, ou cole o nome do local.", unsupported: "Esse link não contém um destino que este navegador consiga extrair em segurança.", provider: "Escolha uma app de mapas suportada." },
  },
};

let language = getLanguage();
const t = (key) => translations[language][key] ?? translations.en[key] ?? key;
const sourceLabel = (value) => language === "pt" ? ({ "Plain text": "Texto simples", "Place or address": "Local ou morada", "Map link": "Link de mapa", Coordinates: "Coordenadas", "Apple Maps": "Apple Maps", "Google Maps": "Google Maps", Waze: "Waze", "Bing Maps": "Bing Maps", OpenStreetMap: "OpenStreetMap" })[value] || value : value;
const destinationLabel = (value) => language === "pt" && value === "Pinned location" ? "Localização marcada" : value;

const input = document.querySelector("#destination-input");
const pasteButton = document.querySelector("#paste-button");
const status = document.querySelector("#parse-status");
const fieldset = document.querySelector("#provider-fieldset");
const openButton = document.querySelector("#open-button");
const form = document.querySelector("#switcher-form");
let parsedLocation = null;

function applyLanguage(next) {
  language = saveLanguage(next);
  document.documentElement.lang = language === "pt" ? "pt-PT" : "en";
  document.title = language === "pt" ? "Conversor de Links de Mapas — EstrelaLuaApps" : "Map Link Switcher — EstrelaLuaApps";
  applyTranslations(document, translations, language);
  updateDestination();
}

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
    status.textContent = t("empty");
    updateOpenLink();
    return;
  }

  try {
    parsedLocation = parseLocation(value);
    fieldset.disabled = false;
    status.className = "status success";
    const exact = parsedLocation.coordinates ? t("coordinatesFound") : t("placeFound");
    status.innerHTML = `<span><strong>${escapeHtml(destinationLabel(parsedLocation.label))}</strong><br>${exact} · ${t("from")} ${escapeHtml(sourceLabel(parsedLocation.source))}</span>`;
  } catch (error) {
    parsedLocation = null;
    fieldset.disabled = true;
    status.className = "status error";
    status.textContent = error instanceof LocationParseError ? (translations[language].errors[error.code] || t("unreadable")) : t("unreadable");
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
    status.textContent = t("clipboard");
    input.focus();
  }
});

createLanguageSwitch({ container: document.querySelector("#language-switch"), language, onChange: applyLanguage });
applyLanguage(language);
