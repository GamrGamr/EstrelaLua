import type { Language } from "../types.js";
import { flattenMetadata, firstText, serialiseMetadata } from "./formatters.js";

type Translator = (key: string, replacements?: Record<string, string | number>) => string;

function formatRawValue(value: unknown, language: Language): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return new Intl.DateTimeFormat(language === "pt" ? "pt-PT" : "en-GB", { dateStyle: "medium", timeStyle: "medium" }).format(value);
  const text = firstText(value);
  if (text !== undefined) return text;
  return JSON.stringify(serialiseMetadata(value));
}

function copyButton(value: unknown, t: Translator): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "raw-copy";
  button.textContent = t("copy");
  button.addEventListener("click", async () => {
    const text = typeof value === "string" ? value : JSON.stringify(serialiseMetadata(value), null, 2);
    await navigator.clipboard.writeText(text);
    button.textContent = t("copied");
    window.setTimeout(() => { button.textContent = t("copy"); }, 1400);
  });
  return button;
}

function renderLeaf(key: string, value: unknown, t: Translator, language: Language): HTMLElement {
  const row = document.createElement("div");
  row.className = "raw-leaf";
  const keyElement = document.createElement("code");
  keyElement.textContent = key;
  const valueElement = document.createElement("span");
  valueElement.textContent = formatRawValue(value, language);
  row.append(keyElement, valueElement, copyButton(value, t));
  return row;
}

function renderNode(key: string, value: unknown, t: Translator, language: Language, depth = 0): HTMLElement {
  if (value === null || value instanceof Date || ArrayBuffer.isView(value) || value instanceof ArrayBuffer || typeof value !== "object") return renderLeaf(key, value, t, language);
  const entries = Array.isArray(value) ? value.map((item, index) => [String(index), item] as const) : Object.entries(value);
  const details = document.createElement("details");
  details.className = "raw-node";
  details.open = depth < 1;
  const summary = document.createElement("summary");
  const label = document.createElement("code");
  label.textContent = key;
  const count = document.createElement("span");
  count.textContent = `${entries.length} ${t("fields")}`;
  summary.append(label, count);
  const children = document.createElement("div");
  children.className = "raw-children";
  const actions = document.createElement("div");
  actions.className = "raw-node-actions";
  const copySection = copyButton(value, t);
  copySection.setAttribute("aria-label", `${t("copy")} ${key}`);
  actions.append(copySection);
  if (!entries.length) children.append(renderLeaf("value", Array.isArray(value) ? "[]" : "{}", t, language));
  for (const [childKey, childValue] of entries) children.append(renderNode(childKey, childValue, t, language, depth + 1));
  details.append(summary, actions, children);
  return details;
}

export interface RawExplorerOptions {
  container: HTMLElement;
  rawSources: Record<string, unknown>;
  query: string;
  source: string;
  language: Language;
  t: Translator;
}

export function renderRawExplorer({ container, rawSources, query, source, language, t }: RawExplorerOptions): void {
  container.replaceChildren();
  const selected: Record<string, unknown> = source === "all" ? rawSources : { [source]: rawSources[source] };
  const search = query.trim().toLowerCase();
  if (search) {
    const results = flattenMetadata(selected).filter((entry) => `${entry.path} ${formatRawValue(entry.value, language)}`.toLowerCase().includes(search)).slice(0, 500);
    if (!results.length) {
      const empty = document.createElement("p");
      empty.className = "raw-empty";
      empty.textContent = t("noMatches");
      container.append(empty);
      return;
    }
    const list = document.createElement("div");
    list.className = "raw-search-results";
    results.forEach((entry) => list.append(renderLeaf(entry.path, entry.value, t, language)));
    container.append(list);
    return;
  }

  const entries = Object.entries(selected).filter(([, value]) => value !== undefined);
  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "raw-empty";
    empty.textContent = t("rawEmpty");
    container.append(empty);
    return;
  }
  for (const [key, value] of entries) container.append(renderNode(key, value, t, language));
}
