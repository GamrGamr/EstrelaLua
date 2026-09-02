export const LANGUAGE_KEY = "estrelalua-language";

export function normaliseLanguage(value) {
  return value === "pt" ? "pt" : "en";
}

export function getLanguage() {
  const queryLanguage = new URLSearchParams(globalThis.location?.search || "").get("lang");
  if (queryLanguage === "pt" || queryLanguage === "en") return queryLanguage;
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch {}
  return globalThis.navigator?.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

export function saveLanguage(language) {
  const next = normaliseLanguage(language);
  try { localStorage.setItem(LANGUAGE_KEY, next); } catch {}
  return next;
}

export function createLanguageSwitch({
  container,
  language = getLanguage(),
  onChange,
  className = "language-switch",
} = {}) {
  if (!container) return null;
  const existing = container.querySelector(`.${className}`);
  if (existing) return existing;

  const control = document.createElement("div");
  control.className = className;
  control.setAttribute("role", "group");
  control.setAttribute("aria-label", "Language / Idioma");
  control.innerHTML = '<button type="button" data-language="pt">PT</button><button type="button" data-language="en">EN</button>';

  const update = (nextLanguage) => {
    control.querySelectorAll("button[data-language]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.language === nextLanguage));
    });
  };

  control.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-language]");
    if (!button) return;
    const next = saveLanguage(button.dataset.language);
    try {
      const url = new URL(globalThis.location.href);
      url.searchParams.set("lang", next);
      globalThis.history.replaceState(null, "", url);
    } catch {}
    update(next);
    onChange?.(next);
    globalThis.dispatchEvent(new CustomEvent("estrelalua:languagechange", { detail: { language: next } }));
  });

  update(normaliseLanguage(language));
  container.append(control);
  return control;
}

export function applyTranslations(root, translations, language) {
  root.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = translations[language]?.[element.dataset.i18n] ?? translations.en?.[element.dataset.i18n];
    if (value !== undefined) element.textContent = value;
  });
  root.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = translations[language]?.[element.dataset.i18nHtml] ?? translations.en?.[element.dataset.i18nHtml];
    if (value !== undefined) element.innerHTML = value;
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = translations[language]?.[element.dataset.i18nPlaceholder] ?? translations.en?.[element.dataset.i18nPlaceholder];
    if (value !== undefined) element.placeholder = value;
  });
  root.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const value = translations[language]?.[element.dataset.i18nAriaLabel] ?? translations.en?.[element.dataset.i18nAriaLabel];
    if (value !== undefined) element.setAttribute("aria-label", value);
  });
  root.querySelectorAll("[data-i18n-content]").forEach((element) => {
    const value = translations[language]?.[element.dataset.i18nContent] ?? translations.en?.[element.dataset.i18nContent];
    if (value !== undefined) element.setAttribute("content", value);
  });
}
