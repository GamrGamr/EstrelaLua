const localeFor = (language) => language === "pt" ? "pt-PT" : "en-GB";
export function asFiniteNumber(value) {
    if (typeof value === "number" && Number.isFinite(value))
        return value;
    if (typeof value !== "string" || !value.trim())
        return undefined;
    const normalised = value.trim().replace(/\s/g, "").replace(",", ".");
    const parsed = Number.parseFloat(normalised);
    return Number.isFinite(parsed) ? parsed : undefined;
}
export function firstText(value) {
    if (typeof value === "string")
        return value.trim() || undefined;
    if (typeof value === "number" && Number.isFinite(value))
        return String(value);
    if (typeof value === "boolean")
        return value ? "Yes" : "No";
    if (Array.isArray(value)) {
        const items = value.map(firstText).filter((item) => Boolean(item));
        return items.length ? items.join(", ") : undefined;
    }
    return undefined;
}
export function formatFileSize(bytes, language = "en") {
    if (!Number.isFinite(bytes) || bytes < 0)
        return "—";
    if (bytes === 0)
        return "0 B";
    const units = ["B", "KB", "MB", "GB", "TB"];
    const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const value = bytes / (1024 ** unitIndex);
    return `${new Intl.NumberFormat(localeFor(language), { maximumFractionDigits: value >= 100 ? 0 : value >= 10 ? 1 : 2 }).format(value)} ${units[unitIndex]}`;
}
export function formatBitRate(bitsPerSecond, language = "en") {
    if (!Number.isFinite(bitsPerSecond) || bitsPerSecond < 0)
        return "—";
    const divisor = bitsPerSecond >= 1_000_000 ? 1_000_000 : 1_000;
    const unit = divisor === 1_000_000 ? "Mb/s" : "kb/s";
    return `${new Intl.NumberFormat(localeFor(language), { maximumFractionDigits: 2 }).format(bitsPerSecond / divisor)} ${unit}`;
}
export function formatDuration(seconds, language = "en") {
    if (!Number.isFinite(seconds) || seconds < 0)
        return "—";
    const rounded = Math.round(seconds);
    const hours = Math.floor(rounded / 3600);
    const minutes = Math.floor((rounded % 3600) / 60);
    const remainingSeconds = rounded % 60;
    const clock = hours > 0
        ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
        : `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    return language === "pt" ? `${clock}` : clock;
}
export function formatShutterSpeed(seconds, language = "en") {
    if (!Number.isFinite(seconds) || seconds <= 0)
        return "—";
    if (seconds >= 1)
        return `${new Intl.NumberFormat(localeFor(language), { maximumFractionDigits: 2 }).format(seconds)} ${language === "pt" ? "s" : "sec"}`;
    const denominator = Math.round(1 / seconds);
    return `1/${denominator} ${language === "pt" ? "s" : "sec"}`;
}
export function formatAperture(value) {
    if (!Number.isFinite(value) || value <= 0)
        return "—";
    return `f/${Number(value.toFixed(1))}`;
}
export function formatFocalLength(value) {
    if (!Number.isFinite(value) || value <= 0)
        return "—";
    return `${Number(value.toFixed(1))} mm`;
}
export function formatCoordinate(value, language = "en") {
    return new Intl.NumberFormat(localeFor(language), { minimumFractionDigits: 5, maximumFractionDigits: 7 }).format(value);
}
export function compassDirection(degrees, language = "en") {
    if (!Number.isFinite(degrees))
        return "—";
    const normalised = ((degrees % 360) + 360) % 360;
    const index = Math.round(normalised / 45) % 8;
    const labels = language === "pt"
        ? ["Norte", "Nordeste", "Este", "Sudeste", "Sul", "Sudoeste", "Oeste", "Noroeste"]
        : ["North", "North-east", "East", "South-east", "South", "South-west", "West", "North-west"];
    return labels[index] ?? "—";
}
export function greatestCommonDivisor(a, b) {
    let first = Math.abs(Math.round(a));
    let second = Math.abs(Math.round(b));
    while (second !== 0)
        [first, second] = [second, first % second];
    return first || 1;
}
export function formatAspectRatio(width, height) {
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0)
        return "—";
    const ratio = width / height;
    const common = [[16 / 9, "16:9"], [4 / 3, "4:3"], [3 / 2, "3:2"], [1, "1:1"], [9 / 16, "9:16"], [3 / 4, "3:4"], [2 / 3, "2:3"]];
    const match = common.find(([candidate]) => Math.abs(candidate - ratio) < 0.012);
    if (match)
        return match[1];
    const divisor = greatestCommonDivisor(width, height);
    const left = Math.round(width / divisor);
    const right = Math.round(height / divisor);
    if (left <= 50 && right <= 50)
        return `${left}:${right}`;
    return `${ratio.toFixed(2)}:1`;
}
export function formatDateValue(value, language = "en") {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return new Intl.DateTimeFormat(localeFor(language), { dateStyle: "long", timeStyle: "medium" }).format(value);
    }
    if (typeof value === "string" && value.trim())
        return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) {
        const date = new Date(value);
        if (!Number.isNaN(date.getTime()))
            return new Intl.DateTimeFormat(localeFor(language), { dateStyle: "long", timeStyle: "medium" }).format(date);
    }
    return undefined;
}
export function serialiseMetadata(value) {
    const seen = new WeakSet();
    const visit = (current) => {
        if (current === null || typeof current === "string" || typeof current === "number" || typeof current === "boolean")
            return current;
        if (typeof current === "bigint")
            return current.toString();
        if (current instanceof Date)
            return Number.isNaN(current.getTime()) ? "Invalid date" : current.toISOString();
        if (ArrayBuffer.isView(current))
            return Array.from(new Uint8Array(current.buffer, current.byteOffset, current.byteLength));
        if (current instanceof ArrayBuffer)
            return Array.from(new Uint8Array(current));
        if (Array.isArray(current))
            return current.map(visit);
        if (typeof current === "object") {
            if (seen.has(current))
                return "[Circular]";
            seen.add(current);
            const output = {};
            for (const [key, nested] of Object.entries(current))
                output[key] = visit(nested);
            return output;
        }
        return String(current);
    };
    return visit(value);
}
export function flattenMetadata(value, parent = "", output = []) {
    if (Array.isArray(value)) {
        value.forEach((item, index) => flattenMetadata(item, `${parent}[${index}]`, output));
        return output;
    }
    if (value instanceof Date || ArrayBuffer.isView(value) || value instanceof ArrayBuffer || value === null || typeof value !== "object") {
        const key = parent.split(/[.[]/).filter(Boolean).at(-1) ?? parent;
        output.push({ path: parent, key, value });
        return output;
    }
    for (const [key, nested] of Object.entries(value)) {
        const path = parent ? `${parent}.${key}` : key;
        flattenMetadata(nested, path, output);
    }
    return output;
}
