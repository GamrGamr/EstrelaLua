import type { MediaMetadata, PrivacyFinding, PrivacySeverity } from "../types.js";
import { flattenMetadata, firstText, formatCoordinate } from "./formatters.js";

const severityRank: Record<PrivacySeverity | "none", number> = { none: 0, low: 1, medium: 2, high: 3 };

function add(findings: PrivacyFinding[], finding: PrivacyFinding): void {
  if (!findings.some((item) => item.id === finding.id)) findings.push(finding);
}

export function analysePrivacy(metadata: Omit<MediaMetadata, "privacyFindings" | "privacyLevel">): { findings: PrivacyFinding[]; level: PrivacySeverity | "none" } {
  const findings: PrivacyFinding[] = [];

  if (metadata.location) {
    add(findings, {
      id: "precise-location",
      severity: "high",
      titleKey: "privacyPreciseLocation",
      descriptionKey: "privacyPreciseLocationCopy",
      value: `${formatCoordinate(metadata.location.latitude)}, ${formatCoordinate(metadata.location.longitude)}`,
    });
    if (metadata.location.altitude !== undefined) add(findings, { id: "gps-altitude", severity: "medium", titleKey: "privacyAltitude", descriptionKey: "privacyAltitudeCopy", value: `${metadata.location.altitude.toFixed(1)} m` });
    if (metadata.location.direction !== undefined) add(findings, { id: "camera-direction", severity: "medium", titleKey: "privacyDirection", descriptionKey: "privacyDirectionCopy", value: `${metadata.location.direction.toFixed(1)}°` });
  }

  if (metadata.device.serialNumber) add(findings, { id: "serial-number", severity: "high", titleKey: "privacySerial", descriptionKey: "privacySerialCopy", value: metadata.device.serialNumber });
  if (metadata.device.ownerName) add(findings, { id: "owner-name", severity: "high", titleKey: "privacyOwner", descriptionKey: "privacyOwnerCopy", value: metadata.device.ownerName });
  if (metadata.dates.captured) add(findings, { id: "capture-time", severity: "medium", titleKey: "privacyCaptureTime", descriptionKey: "privacyCaptureTimeCopy" });
  if (metadata.device.software) add(findings, { id: "editing-software", severity: "medium", titleKey: "privacySoftware", descriptionKey: "privacySoftwareCopy", value: metadata.device.software });
  if (metadata.device.model) add(findings, { id: "camera-model", severity: "low", titleKey: "privacyCamera", descriptionKey: "privacyCameraCopy", value: [metadata.device.manufacturer, metadata.device.model].filter(Boolean).join(" ") });
  if (metadata.device.lensModel) add(findings, { id: "lens-model", severity: "low", titleKey: "privacyLens", descriptionKey: "privacyLensCopy", value: metadata.device.lensModel });
  if (metadata.file.width && metadata.file.height) add(findings, { id: "resolution", severity: "low", titleKey: "privacyResolution", descriptionKey: "privacyResolutionCopy", value: `${metadata.file.width} × ${metadata.file.height}` });

  const rawEntries = flattenMetadata(metadata.rawSources);
  for (const entry of rawEntries) {
    const key = entry.path.toLowerCase().replace(/[^a-z0-9]/g, "");
    const value = firstText(entry.value);
    if (!value) continue;
    if (/(email|contact|creatoraddress|creatorphone)/.test(key)) add(findings, { id: "creator-contact", severity: "high", titleKey: "privacyContact", descriptionKey: "privacyContactCopy", value });
    if (/(mediauniqueidentifier|deviceidentifier|contentidentifier|instanceid|documentid)/.test(key)) add(findings, { id: "unique-identifier", severity: "high", titleKey: "privacyIdentifier", descriptionKey: "privacyIdentifierCopy", value });
  }

  findings.sort((a, b) => severityRank[b.severity] - severityRank[a.severity]);
  const level = findings.reduce<PrivacySeverity | "none">((highest, finding) => severityRank[finding.severity] > severityRank[highest] ? finding.severity : highest, "none");
  return { findings, level };
}
