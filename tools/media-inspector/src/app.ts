import { translations, createTranslator } from "./translations.js";
import type {
  DisplayField,
  Language,
  MediaInfoTrack,
  MediaMetadata,
  NormalisedAudioTrack,
  NormalisedVideoTrack,
} from "./types.js";
import {
  compassDirection,
  firstText,
  formatAperture,
  formatAspectRatio,
  formatBitRate,
  formatCoordinate,
  formatDateValue,
  formatDuration,
  formatFileSize,
  formatFocalLength,
  formatShutterSpeed,
  serialiseMetadata,
} from "./lib/formatters.js";
import { inspectMedia } from "./lib/inspector.js";
import { createPrivacyMap, destroyPrivacyMap } from "./lib/map-viewer.js";
import { renderRawExplorer } from "./lib/raw-explorer.js";

interface I18nCore {
  getLanguage(): Language;
  saveLanguage(language: Language): Language;
  createLanguageSwitch(options: {
    container: HTMLElement;
    language: Language;
    onChange(language: Language): void;
  }): HTMLElement | null;
  applyTranslations(root: ParentNode, dictionary: typeof translations, language: Language): void;
}

const coreUrl = new URL("../../../assets/i18n-core.js", import.meta.url).href;
const i18n = await import(coreUrl) as unknown as I18nCore;

function element<T extends HTMLElement>(selector: string): T {
  const found = document.querySelector<T>(selector);
  if (!found) throw new Error(`Missing required interface element: ${selector}`);
  return found;
}

const landing = element<HTMLElement>("#landing");
const analysisState = element<HTMLElement>("#analysis-state");
const analysisTitle = element<HTMLElement>("#analysis-title");
const analysisStep = element<HTMLElement>("#analysis-step");
const analysisProgress = element<HTMLElement>("#analysis-progress");
const errorState = element<HTMLElement>("#error-state");
const errorMessage = element<HTMLElement>("#error-message");
const errorTechnical = element<HTMLElement>("#error-technical");
const report = element<HTMLElement>("#report");
const dropzone = element<HTMLElement>("#dropzone");
const fileInput = element<HTMLInputElement>("#file-input");
const mapDialog = element<HTMLDialogElement>("#map-consent");
const rawSearch = element<HTMLInputElement>("#raw-search");
const rawSource = element<HTMLSelectElement>("#raw-source");

let language = i18n.getLanguage();
let metadata: MediaMetadata | undefined;
let previewUrl: string | undefined;
let activeMode: "simple" | "advanced" = "simple";
let recenterMap: (() => void) | undefined;
let mapLoaded = false;

const t = (key: string): string => createTranslator(language)(key);
const nextFrame = (): Promise<void> => new Promise((resolve) => requestAnimationFrame(() => resolve()));

function setVisible(target: HTMLElement, visible: boolean): void {
  target.hidden = !visible;
}

function applyLanguage(nextLanguage: Language): void {
  language = i18n.saveLanguage(nextLanguage);
  document.documentElement.lang = language === "pt" ? "pt-PT" : "en";
  i18n.applyTranslations(document, translations, language);
  document.title = t("pageTitle");
  if (metadata) renderReport(metadata);
}

function updateProgress(labelKey: string, percentage: number): void {
  analysisStep.textContent = t(labelKey);
  analysisProgress.style.width = `${Math.max(0, Math.min(100, percentage))}%`;
}

function cleanPreview(): void {
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = undefined;
}

function resetInspector(): void {
  cleanPreview();
  destroyPrivacyMap();
  metadata = undefined;
  recenterMap = undefined;
  mapLoaded = false;
  fileInput.value = "";
  rawSearch.value = "";
  rawSource.replaceChildren();
  setVisible(landing, true);
  setVisible(analysisState, false);
  setVisible(errorState, false);
  setVisible(report, false);
  landing.scrollIntoView({ behavior: "smooth", block: "start" });
}

function errorKey(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("UNSUPPORTED_FORMAT")) return "unsupported";
  if (message.includes("EMPTY_FILE")) return "emptyFile";
  if (message.includes("FILE_TOO_LARGE")) return "tooLarge";
  return "parseFailed";
}

async function analyseFile(file: File): Promise<void> {
  cleanPreview();
  destroyPrivacyMap();
  mapLoaded = false;
  recenterMap = undefined;
  setVisible(landing, false);
  setVisible(errorState, false);
  setVisible(report, false);
  setVisible(analysisState, true);
  analysisTitle.textContent = file.name;
  updateProgress("readingFile", 12);
  await nextFrame();

  try {
    const videoHint = file.type.startsWith("video/") || /\.(?:mp4|mov|webm|m4v)$/i.test(file.name);
    updateProgress(videoHint ? "analysingVideo" : "extractingImage", 38);
    await nextFrame();
    const result = await inspectMedia(file);
    updateProgress("normalising", 76);
    await nextFrame();
    updateProgress("privacyScanStep", 94);
    metadata = result;
    previewUrl = URL.createObjectURL(file);
    renderReport(result);
    updateProgress("privacyScanStep", 100);
    setVisible(analysisState, false);
    setVisible(report, true);
    report.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    setVisible(analysisState, false);
    setVisible(errorState, true);
    errorMessage.textContent = t(errorKey(error));
    errorTechnical.textContent = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  }
}

function addText(parent: HTMLElement, tag: keyof HTMLElementTagNameMap, value: string, className?: string): HTMLElement {
  const child = document.createElement(tag);
  child.textContent = value;
  if (className) child.className = className;
  parent.append(child);
  return child;
}

function fieldContainer(field: DisplayField): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = `metadata-field${field.sensitive ? " sensitive" : ""}`;
  addText(wrapper, "dt", t(field.labelKey));
  addText(wrapper, "dd", field.value);
  if (field.explanationKey) addText(wrapper, "small", t(field.explanationKey));
  return wrapper;
}

function renderFields(selector: string, fields: DisplayField[], emptyText = t("unavailable")): void {
  const container = element<HTMLElement>(selector);
  container.replaceChildren();
  if (!fields.length) {
    addText(container, "p", emptyText, "empty-section");
    return;
  }
  fields.forEach((field) => container.append(fieldContainer(field)));
}

function summaryMetric(labelKey: string, value: string): HTMLElement {
  const metric = document.createElement("div");
  metric.className = "summary-metric";
  addText(metric, "span", t(labelKey));
  addText(metric, "strong", value);
  return metric;
}

function renderPreview(data: MediaMetadata): void {
  const container = element<HTMLElement>("#media-preview");
  container.replaceChildren();
  if (!previewUrl) return;
  if (data.file.mediaType === "image") {
    const image = document.createElement("img");
    image.src = previewUrl;
    image.alt = t("imagePreview");
    image.addEventListener("error", () => renderPreviewPlaceholder(container));
    container.append(image);
  } else {
    const video = document.createElement("video");
    video.src = previewUrl;
    video.controls = true;
    video.preload = "metadata";
    video.setAttribute("aria-label", t("videoPreview"));
    video.addEventListener("error", () => renderPreviewPlaceholder(container));
    container.append(video);
  }
}

function renderPreviewPlaceholder(container: HTMLElement): void {
  container.replaceChildren();
  const placeholder = document.createElement("p");
  placeholder.className = "preview-placeholder";
  addText(placeholder, "span", "◇");
  placeholder.append(document.createTextNode(t("previewUnavailable")));
  container.append(placeholder);
}

function renderOverview(data: MediaMetadata): void {
  element<HTMLElement>("#report-file-name").textContent = data.file.name;
  element<HTMLElement>("#overview-title").textContent = data.file.name;
  element<HTMLElement>("#summary-type").textContent = t(data.file.mediaType);

  const metrics = element<HTMLElement>("#summary-metrics");
  metrics.replaceChildren(summaryMetric("fileSize", formatFileSize(data.file.size, language)));
  if (data.file.width && data.file.height) metrics.append(summaryMetric("dimensions", `${data.file.width} × ${data.file.height}`));
  if (data.file.durationSeconds !== undefined) metrics.append(summaryMetric("duration", formatDuration(data.file.durationSeconds, language)));
  if (metrics.children.length < 3) metrics.append(summaryMetric("format", data.file.format));

  const primaryVideo = data.videoTracks[0];
  const lineParts = data.file.mediaType === "video" ? [
    primaryVideo?.format,
    primaryVideo?.codec,
    primaryVideo?.profile,
    primaryVideo?.frameRate !== undefined ? `${primaryVideo.frameRate.toFixed(3).replace(/\.0+$/, "")} fps` : undefined,
    primaryVideo?.bitRate !== undefined ? formatBitRate(primaryVideo.bitRate, language) : undefined,
  ] : [
    [data.device.manufacturer, data.device.model].filter(Boolean).join(" "),
    data.capture.focalLength !== undefined ? formatFocalLength(data.capture.focalLength) : undefined,
    data.capture.aperture !== undefined ? formatAperture(data.capture.aperture) : undefined,
    data.capture.exposureTime !== undefined ? formatShutterSpeed(data.capture.exposureTime, language) : undefined,
    data.capture.iso !== undefined ? `ISO ${data.capture.iso}` : undefined,
  ];
  const readableParts = lineParts.filter((value): value is string => Boolean(value));
  element<HTMLElement>("#summary-line").textContent = readableParts.join(" · ") || (data.warnings.includes("LITTLE_OR_NO_METADATA") ? t("littleMetadata") : data.file.format);
  element<HTMLElement>("#summary-date").textContent = formatDateValue(data.dates.captured, language) ?? t("unavailable");
  element<HTMLElement>("#summary-location").textContent = data.location ? t("gpsFound") : t("noGps");
}

function renderFile(data: MediaMetadata): void {
  const file = data.file;
  const fields: DisplayField[] = [
    { key: "name", labelKey: "fileName", value: file.name },
    { key: "format", labelKey: "format", value: file.format },
    { key: "mime", labelKey: "mimeType", value: file.mimeType },
    { key: "size", labelKey: "fileSize", value: formatFileSize(file.size, language) },
  ];
  if (file.width && file.height) {
    fields.push({ key: "dimensions", labelKey: "dimensions", value: `${file.width} × ${file.height}` });
    fields.push({ key: "megapixels", labelKey: "megapixels", value: `${(file.width * file.height / 1_000_000).toFixed(1)} MP` });
    fields.push({ key: "aspect", labelKey: "aspectRatio", value: formatAspectRatio(file.width, file.height) });
  }
  if (file.durationSeconds !== undefined) fields.push({ key: "duration", labelKey: "duration", value: formatDuration(file.durationSeconds, language) });
  if (file.bitRate !== undefined) fields.push({ key: "bitrate", labelKey: "bitRate", value: formatBitRate(file.bitRate, language) });
  if (file.colourSpace) fields.push({ key: "colour", labelKey: "colourSpace", value: file.colourSpace });
  if (file.bitDepth !== undefined) fields.push({ key: "depth", labelKey: "bitDepth", value: language === "pt" ? `${file.bitDepth} bits` : `${file.bitDepth}-bit` });
  if (file.orientation) fields.push({ key: "orientation", labelKey: "orientation", value: file.orientation });
  renderFields("#file-fields", fields);
}

function renderDevice(data: MediaMetadata): void {
  const device = data.device;
  const fields: DisplayField[] = [];
  if (device.manufacturer) fields.push({ key: "manufacturer", labelKey: "manufacturer", value: device.manufacturer });
  if (device.model) fields.push({ key: "model", labelKey: "model", value: device.model });
  if (device.lensMake) fields.push({ key: "lensMake", labelKey: "lensMake", value: device.lensMake });
  if (device.lensModel) fields.push({ key: "lens", labelKey: "lensModel", value: device.lensModel });
  if (device.software) fields.push({ key: "software", labelKey: "software", value: device.software });
  if (device.firmware) fields.push({ key: "firmware", labelKey: "firmware", value: device.firmware });
  if (device.serialNumber) fields.push({ key: "serial", labelKey: "serialNumber", value: device.serialNumber, sensitive: true });
  if (device.ownerName) fields.push({ key: "owner", labelKey: "ownerName", value: device.ownerName, sensitive: true });
  renderFields("#device-fields", fields);
  element<HTMLElement>("#device-section").hidden = !fields.length;
}

function renderCapture(data: MediaMetadata): void {
  const capture = data.capture;
  const fields: DisplayField[] = [];
  if (capture.iso !== undefined) fields.push({ key: "iso", labelKey: "iso", value: String(capture.iso), explanationKey: "isoHelp" });
  if (capture.exposureTime !== undefined) fields.push({ key: "shutter", labelKey: "shutterSpeed", value: formatShutterSpeed(capture.exposureTime, language), explanationKey: "shutterHelp" });
  if (capture.aperture !== undefined) fields.push({ key: "aperture", labelKey: "aperture", value: formatAperture(capture.aperture), explanationKey: "apertureHelp" });
  if (capture.focalLength !== undefined) fields.push({ key: "focal", labelKey: "focalLength", value: formatFocalLength(capture.focalLength) });
  if (capture.focalLength35mm !== undefined) fields.push({ key: "focal35", labelKey: "focalLength35", value: formatFocalLength(capture.focalLength35mm) });
  if (capture.exposureCompensation !== undefined) fields.push({ key: "ev", labelKey: "exposureCompensation", value: `${capture.exposureCompensation > 0 ? "+" : ""}${capture.exposureCompensation} EV` });
  for (const [key, labelKey, value] of [
    ["meter", "meteringMode", capture.meteringMode], ["exposure", "exposureMode", capture.exposureMode],
    ["white", "whiteBalance", capture.whiteBalance], ["flash", "flash", capture.flash], ["focus", "focusMode", capture.focusMode],
  ] as Array<[string, string, string | undefined]>) if (value) fields.push({ key, labelKey, value });
  renderFields("#capture-fields", fields);
  element<HTMLElement>("#capture-section").hidden = !fields.length;
}

function renderDates(data: MediaMetadata): void {
  const dates: Array<[string, unknown]> = [
    ["originalCapture", data.dates.captured], ["digitised", data.dates.digitised],
    ["embeddedModified", data.dates.modifiedEmbedded], ["quickTimeCreated", data.dates.quickTimeCreated],
    ["gpsTimestamp", data.dates.gpsTimestamp], ["timezone", data.dates.timezone],
    ["fileModified", data.dates.fileLastModified],
  ];
  const timeline = element<HTMLElement>("#date-fields");
  timeline.replaceChildren();
  for (const [labelKey, value] of dates) {
    const formatted = labelKey === "timezone" ? firstText(value) : formatDateValue(value, language);
    if (!formatted) continue;
    const item = document.createElement("div");
    item.className = "timeline-item";
    addText(item, "span", t(labelKey));
    addText(item, "strong", formatted);
    timeline.append(item);
  }
}

function renderLocation(data: MediaMetadata): void {
  const section = element<HTMLDetailsElement>("#location-section");
  const actions = element<HTMLElement>("#map-actions");
  const mapShell = element<HTMLElement>("#map-shell");
  if (!data.location) {
    renderFields("#location-fields", [], t("noGps"));
    actions.hidden = true;
    mapShell.hidden = true;
    section.open = false;
    return;
  }
  const location = data.location;
  const fields: DisplayField[] = [
    { key: "latitude", labelKey: "latitude", value: formatCoordinate(location.latitude, language), explanationKey: "gpsHelp", sensitive: true },
    { key: "longitude", labelKey: "longitude", value: formatCoordinate(location.longitude, language), explanationKey: "gpsHelp", sensitive: true },
  ];
  if (location.altitude !== undefined) fields.push({ key: "altitude", labelKey: "altitude", value: `${location.altitude.toFixed(1)} m`, sensitive: true });
  if (location.timestamp !== undefined) fields.push({ key: "gpsDate", labelKey: "gpsTimestamp", value: formatDateValue(location.timestamp, language) ?? firstText(location.timestamp) ?? t("unavailable") });
  if (location.direction !== undefined) fields.push({ key: "direction", labelKey: "direction", value: `${location.direction.toFixed(1)}° · ${compassDirection(location.direction, language)}`, sensitive: true });
  if (location.accuracy !== undefined) fields.push({ key: "accuracy", labelKey: "accuracy", value: `±${location.accuracy.toFixed(1)} m` });
  if (location.speed !== undefined) fields.push({ key: "speed", labelKey: "speed", value: `${location.speed.toFixed(1)} km/h` });
  renderFields("#location-fields", fields);
  if (location.direction !== undefined) {
    const visual = document.createElement("div");
    visual.className = "direction-visual";
    visual.setAttribute("aria-label", `${t("direction")}: ${location.direction.toFixed(1)}°, ${compassDirection(location.direction, language)}`);
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.style.setProperty("--bearing", `${location.direction}deg`);
    arrow.textContent = "↑";
    const copy = document.createElement("div");
    addText(copy, "small", t("direction"));
    addText(copy, "strong", compassDirection(location.direction, language));
    visual.append(arrow, copy);
    element<HTMLElement>("#location-fields").append(visual);
  }
  actions.hidden = mapLoaded;
  mapShell.hidden = !mapLoaded;
}

function trackCard(title: string, fields: DisplayField[]): HTMLElement {
  const card = document.createElement("article");
  card.className = "track-card";
  addText(card, "h3", title);
  const list = document.createElement("dl");
  for (const field of fields) {
    const item = document.createElement("div");
    addText(item, "dt", t(field.labelKey));
    addText(item, "dd", field.value);
    list.append(item);
  }
  card.append(list);
  return card;
}

function videoFields(track: NormalisedVideoTrack): DisplayField[] {
  const fields: DisplayField[] = [];
  if (track.format) fields.push({ key: "format", labelKey: "format", value: track.format });
  if (track.codec) fields.push({ key: "codec", labelKey: "codec", value: track.codec });
  if (track.profile) fields.push({ key: "profile", labelKey: "profile", value: track.profile });
  if (track.width && track.height) fields.push({ key: "resolution", labelKey: "resolution", value: `${track.width} × ${track.height}` });
  if (track.frameRate !== undefined) fields.push({ key: "fps", labelKey: "frameRate", value: `${track.frameRate.toFixed(3).replace(/\.0+$/, "")} fps` });
  if (track.frameRateMode) fields.push({ key: "fpsmode", labelKey: "frameRateMode", value: track.frameRateMode });
  if (track.bitRate !== undefined) fields.push({ key: "bitrate", labelKey: "bitRate", value: formatBitRate(track.bitRate, language) });
  if (track.bitDepth !== undefined) fields.push({ key: "depth", labelKey: "bitDepth", value: language === "pt" ? `${track.bitDepth} bits` : `${track.bitDepth}-bit` });
  if (track.chromaSubsampling) fields.push({ key: "chroma", labelKey: "chroma", value: track.chromaSubsampling });
  if (track.hdrFormat) fields.push({ key: "hdr", labelKey: "hdr", value: track.hdrFormat });
  if (track.colourPrimaries) fields.push({ key: "primaries", labelKey: "colourPrimaries", value: track.colourPrimaries });
  if (track.transferCharacteristics) fields.push({ key: "transfer", labelKey: "transfer", value: track.transferCharacteristics });
  if (track.durationSeconds !== undefined) fields.push({ key: "duration", labelKey: "duration", value: formatDuration(track.durationSeconds, language) });
  if (track.streamSize !== undefined) fields.push({ key: "size", labelKey: "streamSize", value: formatFileSize(track.streamSize, language) });
  return fields;
}

function audioFields(track: NormalisedAudioTrack): DisplayField[] {
  const fields: DisplayField[] = [];
  if (track.format) fields.push({ key: "format", labelKey: "format", value: track.format });
  if (track.codec) fields.push({ key: "codec", labelKey: "codec", value: track.codec });
  if (track.bitRate !== undefined) fields.push({ key: "bitrate", labelKey: "bitRate", value: formatBitRate(track.bitRate, language) });
  if (track.sampleRate !== undefined) fields.push({ key: "sample", labelKey: "sampleRate", value: `${new Intl.NumberFormat(language === "pt" ? "pt-PT" : "en-GB").format(track.sampleRate / 1000)} kHz` });
  if (track.channels !== undefined) fields.push({ key: "channels", labelKey: "channels", value: String(track.channels) });
  if (track.channelLayout) fields.push({ key: "layout", labelKey: "channelLayout", value: track.channelLayout });
  if (track.bitDepth !== undefined) fields.push({ key: "depth", labelKey: "bitDepth", value: language === "pt" ? `${track.bitDepth} bits` : `${track.bitDepth}-bit` });
  if (track.language) fields.push({ key: "language", labelKey: "language", value: track.language });
  if (track.durationSeconds !== undefined) fields.push({ key: "duration", labelKey: "duration", value: formatDuration(track.durationSeconds, language) });
  if (track.streamSize !== undefined) fields.push({ key: "size", labelKey: "streamSize", value: formatFileSize(track.streamSize, language) });
  return fields;
}

function renderTracks(data: MediaMetadata): void {
  const video = element<HTMLElement>("#video-tracks");
  const audio = element<HTMLElement>("#audio-tracks");
  const other = element<HTMLElement>("#other-tracks");
  video.replaceChildren(); audio.replaceChildren(); other.replaceChildren();
  data.videoTracks.forEach((track, index) => video.append(trackCard(`${t("stream")} ${index + 1}`, videoFields(track))));
  data.audioTracks.forEach((track, index) => audio.append(trackCard(`${t("stream")} ${index + 1}`, audioFields(track))));
  data.otherTracks.forEach((track, index) => other.append(trackCard(`${firstText(track["@type"]) ?? t("stream")} ${index + 1}`, otherTrackFields(track))));
  element<HTMLElement>("#video-section").hidden = !data.videoTracks.length;
  element<HTMLElement>("#audio-section").hidden = !data.audioTracks.length;
  element<HTMLElement>("#other-section").hidden = !data.otherTracks.length;
}

function otherTrackFields(track: MediaInfoTrack): DisplayField[] {
  return Object.entries(track)
    .filter(([, value]) => firstText(value) !== undefined)
    .slice(0, 18)
    .map(([key, value]) => ({ key, labelKey: key, value: firstText(value) ?? "" }));
}

function renderPrivacy(data: MediaMetadata): void {
  const level = element<HTMLElement>("#privacy-level");
  level.className = `risk-badge ${data.privacyLevel}`;
  level.textContent = t(data.privacyLevel);
  const findings = element<HTMLElement>("#privacy-findings");
  findings.replaceChildren();
  if (!data.privacyFindings.length) {
    const none = document.createElement("p");
    none.className = "privacy-none";
    addText(none, "strong", t("privacyNone"));
    none.append(document.createTextNode(t("privacyNoneCopy")));
    findings.append(none);
    return;
  }
  for (const finding of data.privacyFindings) {
    const card = document.createElement("article");
    card.className = "privacy-finding";
    const header = document.createElement("header");
    addText(header, "h3", t(finding.titleKey));
    addText(header, "span", t(finding.severity), `severity ${finding.severity}`);
    card.append(header);
    if (finding.value) addText(card, "strong", finding.value);
    addText(card, "p", t(finding.descriptionKey));
    findings.append(card);
  }
}

function renderWarnings(data: MediaMetadata): void {
  const warnings = element<HTMLElement>("#warning-list");
  warnings.replaceChildren();
  const keys = new Set(data.warnings.map((warning) => warning === "LITTLE_OR_NO_METADATA" ? "littleMetadata" : "parserWarning"));
  for (const key of keys) addText(warnings, "p", t(key), "warning-item");
  warnings.hidden = !keys.size;
}

function renderRaw(data: MediaMetadata): void {
  const current = rawSource.value || "all";
  const sources = Object.keys(data.rawSources);
  rawSource.replaceChildren();
  const all = document.createElement("option");
  all.value = "all"; all.textContent = t("allSources");
  rawSource.append(all);
  sources.forEach((source) => {
    const option = document.createElement("option");
    option.value = source; option.textContent = source;
    rawSource.append(option);
  });
  rawSource.value = sources.includes(current) ? current : "all";
  renderRawExplorer({
    container: element<HTMLElement>("#raw-tree"),
    rawSources: data.rawSources,
    query: rawSearch.value,
    source: rawSource.value,
    language,
    t,
  });
}

function setMode(mode: "simple" | "advanced"): void {
  activeMode = mode;
  document.querySelectorAll<HTMLButtonElement>("[data-mode]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.mode === mode)));
  element<HTMLElement>("#simple-report").hidden = mode !== "simple";
  element<HTMLElement>("#advanced-report").hidden = mode !== "advanced";
  if (mode === "advanced" && metadata) renderRaw(metadata);
}

function renderReport(data: MediaMetadata): void {
  renderPreview(data);
  renderOverview(data);
  renderFile(data);
  renderDevice(data);
  renderCapture(data);
  renderDates(data);
  renderLocation(data);
  renderTracks(data);
  renderPrivacy(data);
  renderWarnings(data);
  setMode(activeMode);
}

async function loadMap(): Promise<void> {
  if (!metadata?.location || mapLoaded) return;
  mapLoaded = true;
  element<HTMLElement>("#map-actions").hidden = true;
  const shell = element<HTMLElement>("#map-shell");
  shell.hidden = false;
  element<HTMLElement>("#map-error").hidden = true;
  try {
    recenterMap = await createPrivacyMap(element<HTMLElement>("#map"), metadata.location, () => {
      element<HTMLElement>("#map-error").hidden = false;
    });
  } catch {
    element<HTMLElement>("#map-error").hidden = false;
  }
}

dropzone.addEventListener("click", () => fileInput.click());
dropzone.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") { event.preventDefault(); fileInput.click(); }
});
element<HTMLButtonElement>("#choose-file").addEventListener("click", (event) => { event.stopPropagation(); fileInput.click(); });
fileInput.addEventListener("change", () => { const file = fileInput.files?.[0]; if (file) void analyseFile(file); });

for (const type of ["dragenter", "dragover"] as const) dropzone.addEventListener(type, (event) => {
  event.preventDefault(); dropzone.classList.add("is-dragging");
});
for (const type of ["dragleave", "drop"] as const) dropzone.addEventListener(type, (event) => {
  event.preventDefault(); dropzone.classList.remove("is-dragging");
});
dropzone.addEventListener("drop", (event) => { const file = event.dataTransfer?.files[0]; if (file) void analyseFile(file); });

document.querySelectorAll<HTMLElement>("[data-reset]").forEach((button) => button.addEventListener("click", resetInspector));
document.querySelectorAll<HTMLButtonElement>("[data-mode]").forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode === "advanced" ? "advanced" : "simple")));

element<HTMLButtonElement>("#copy-json").addEventListener("click", async (event) => {
  if (!metadata) return;
  await navigator.clipboard.writeText(JSON.stringify(serialiseMetadata({ normalised: metadata, raw: metadata.rawSources }), null, 2));
  const button = event.currentTarget as HTMLButtonElement;
  button.textContent = t("copied");
  window.setTimeout(() => { button.textContent = t("copyJson"); }, 1500);
});

rawSearch.addEventListener("input", () => { if (metadata) renderRaw(metadata); });
rawSource.addEventListener("change", () => { if (metadata) renderRaw(metadata); });
element<HTMLButtonElement>("#request-map").addEventListener("click", () => mapDialog.showModal());
mapDialog.addEventListener("close", () => { if (mapDialog.returnValue === "confirm") void loadMap(); });
element<HTMLButtonElement>("#recenter-map").addEventListener("click", () => recenterMap?.());

i18n.createLanguageSwitch({ container: element<HTMLElement>("#language-switch"), language, onChange: applyLanguage });
applyLanguage(language);
window.addEventListener("beforeunload", () => { cleanPreview(); destroyPrivacyMap(); });
