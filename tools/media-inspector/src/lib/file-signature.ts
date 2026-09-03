import type { DetectedMedia, MediaKind } from "../types.js";

const imageExtensions = new Set(["jpg", "jpeg", "png", "webp", "tif", "tiff", "heic", "heif", "avif"]);
const videoExtensions = new Set(["mp4", "mov", "m4v", "webm"]);

function extensionOf(name: string): string {
  const match = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  return match?.[1] ?? "";
}

function ascii(bytes: Uint8Array, start: number, length: number): string {
  return String.fromCharCode(...bytes.slice(start, start + length));
}

function result(kind: MediaKind, format: string, extension: string, mimeType: string, confidence: DetectedMedia["confidence"]): DetectedMedia {
  return { kind, format, extension, mimeType, confidence };
}

export async function detectMedia(file: File): Promise<DetectedMedia> {
  const extension = extensionOf(file.name);
  const bytes = new Uint8Array(await file.slice(0, 64).arrayBuffer());

  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return result("image", "JPEG", extension || "jpg", file.type || "image/jpeg", "signature");
  if (bytes[0] === 0x89 && ascii(bytes, 1, 3) === "PNG") return result("image", "PNG", extension || "png", file.type || "image/png", "signature");
  if (ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 4) === "WEBP") return result("image", "WebP", extension || "webp", file.type || "image/webp", "signature");
  if ((ascii(bytes, 0, 4) === "II*\0") || (ascii(bytes, 0, 4) === "MM\0*")) return result("image", "TIFF", extension || "tiff", file.type || "image/tiff", "signature");
  if (bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3) return result("video", "WebM / Matroska", extension || "webm", file.type || "video/webm", "signature");

  if (ascii(bytes, 4, 4) === "ftyp") {
    const brand = ascii(bytes, 8, 4).toLowerCase();
    if (["heic", "heix", "hevc", "hevx", "heim", "heis", "mif1", "msf1", "avif", "avis"].includes(brand)) {
      const format = brand.startsWith("avi") ? "AVIF" : "HEIC / HEIF";
      return result("image", format, extension || (format === "AVIF" ? "avif" : "heic"), file.type || (format === "AVIF" ? "image/avif" : "image/heic"), "signature");
    }
    const format = brand.includes("qt") || extension === "mov" ? "QuickTime" : "MPEG-4";
    return result("video", format, extension || (format === "QuickTime" ? "mov" : "mp4"), file.type || (format === "QuickTime" ? "video/quicktime" : "video/mp4"), "signature");
  }

  if (file.type.startsWith("image/")) return result("image", file.type.slice(6).toUpperCase(), extension, file.type, "mime");
  if (file.type.startsWith("video/")) return result("video", file.type.slice(6).toUpperCase(), extension, file.type, "mime");
  if (imageExtensions.has(extension)) return result("image", extension.toUpperCase(), extension, file.type || "application/octet-stream", "extension");
  if (videoExtensions.has(extension)) return result("video", extension.toUpperCase(), extension, file.type || "application/octet-stream", "extension");
  throw new Error("UNSUPPORTED_FORMAT");
}

export function isValidCoordinate(latitude: number, longitude: number): boolean {
  return Number.isFinite(latitude) && Number.isFinite(longitude) && latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
}
