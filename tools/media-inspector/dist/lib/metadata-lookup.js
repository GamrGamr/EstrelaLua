import { flattenMetadata, firstText } from "./formatters.js";
function normaliseKey(value) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}
export function findMetadataValue(source, candidates) {
    const wanted = candidates.map(normaliseKey);
    const entries = flattenMetadata(source);
    for (const candidate of wanted) {
        const exact = entries.find((entry) => normaliseKey(entry.key) === candidate || normaliseKey(entry.path).endsWith(candidate));
        if (exact?.value !== undefined && exact.value !== null && (exact.value instanceof Date || firstText(unwrapValue(exact.value)) !== undefined))
            return unwrapValue(exact.value);
    }
    return undefined;
}
export function findMetadataText(source, candidates) {
    return firstText(findMetadataValue(source, candidates));
}
export function findMetadataNumber(source, candidates) {
    const value = findMetadataValue(source, candidates);
    if (typeof value === "number" && Number.isFinite(value))
        return value;
    if (typeof value === "string") {
        const parsed = Number.parseFloat(value.replace(",", "."));
        if (Number.isFinite(parsed))
            return parsed;
    }
    return undefined;
}
export function unwrapValue(value) {
    if (value && typeof value === "object" && !Array.isArray(value) && "value" in value) {
        return value.value;
    }
    return value;
}
export function hasMeaningfulMetadata(source) {
    return flattenMetadata(source).some((entry) => {
        const key = normaliseKey(entry.key);
        return !["errors", "thumbnailoffset", "thumbnaillength"].includes(key) && (entry.value instanceof Date || firstText(unwrapValue(entry.value)) !== undefined);
    });
}
