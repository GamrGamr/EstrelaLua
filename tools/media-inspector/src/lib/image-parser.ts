import type { Dimensions, ImageParseResult } from "../types.js";

interface ExifrApi {
  parse(input: Blob, options: Record<string, unknown> | boolean): Promise<unknown>;
  gps(input: Blob): Promise<{ latitude?: number; longitude?: number } | undefined>;
}

interface ExifrModule {
  default: ExifrApi;
}

const parseOptions: Record<string, unknown> = {
  tiff: true,
  ifd0: true,
  ifd1: false,
  exif: true,
  gps: true,
  interop: true,
  jfif: true,
  xmp: true,
  iptc: true,
  icc: true,
  makerNote: true,
  userComment: true,
  mergeOutput: false,
  translateKeys: true,
  translateValues: true,
  reviveValues: true,
  sanitize: true,
  silentErrors: true,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeObjects(value: unknown, output: Record<string, unknown> = {}): Record<string, unknown> {
  if (!isRecord(value)) return output;
  for (const [key, nested] of Object.entries(value)) {
    if (isRecord(nested) && !ArrayBuffer.isView(nested)) mergeObjects(nested, output);
    else if (nested !== undefined && output[key] === undefined) output[key] = nested;
  }
  return output;
}

async function readDimensions(file: File): Promise<Dimensions | undefined> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file);
      const dimensions = { width: bitmap.width, height: bitmap.height };
      bitmap.close();
      if (dimensions.width > 0 && dimensions.height > 0) return dimensions;
    } catch {}
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const dimensions = await new Promise<Dimensions>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
      image.onerror = () => reject(new Error("IMAGE_PREVIEW_UNSUPPORTED"));
      image.src = objectUrl;
    });
    return dimensions.width > 0 && dimensions.height > 0 ? dimensions : undefined;
  } catch {
    return undefined;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export async function parseImage(file: File): Promise<ImageParseResult> {
  const warnings: string[] = [];
  const moduleUrl = new URL("../../vendor/exifr.full.esm.js", import.meta.url).href;
  const module = await import(moduleUrl) as unknown as ExifrModule;
  let parsed: unknown;
  try {
    parsed = await module.default.parse(file, parseOptions);
  } catch (error) {
    warnings.push(error instanceof Error ? error.message : "IMAGE_METADATA_PARSE_FAILED");
  }

  const rawSources = isRecord(parsed) ? parsed : {};
  try {
    const gps = await module.default.gps(file);
    if (gps && Number.isFinite(gps.latitude) && Number.isFinite(gps.longitude)) {
      rawSources.coordinates = { latitude: gps.latitude, longitude: gps.longitude };
    }
  } catch {}

  const dimensions = await readDimensions(file);
  return { dimensions, rawSources, merged: mergeObjects(rawSources), warnings };
}
