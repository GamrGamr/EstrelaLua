import type { MediaInfoTrack, VideoParseResult } from "../types.js";

interface MediaInfoInstance {
  analyzeData(size: number, readChunk: (chunkSize: number, offset: number) => Promise<Uint8Array>): Promise<unknown>;
  close(): void;
}

interface MediaInfoModule {
  default(options?: Record<string, unknown>): Promise<MediaInfoInstance>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function extractTracks(raw: Record<string, unknown>): MediaInfoTrack[] {
  const media = isRecord(raw.media) ? raw.media : undefined;
  const tracks = media?.track;
  if (!Array.isArray(tracks)) return [];
  return tracks.filter(isRecord) as MediaInfoTrack[];
}

export async function parseVideo(file: File): Promise<VideoParseResult> {
  const moduleUrl = new URL("../../vendor/mediainfo.js", import.meta.url).href;
  const wasmUrl = new URL("../../vendor/MediaInfoModule.wasm", import.meta.url).href;
  const module = await import(moduleUrl) as unknown as MediaInfoModule;
  const mediaInfo = await module.default({
    format: "object",
    full: true,
    coverData: false,
    chunkSize: 1024 * 1024,
    locateFile: () => wasmUrl,
  });

  try {
    const result = await mediaInfo.analyzeData(file.size, async (chunkSize, offset) => {
      const buffer = await file.slice(offset, offset + chunkSize).arrayBuffer();
      return new Uint8Array(buffer);
    });
    const raw = isRecord(result) ? result : {};
    return { raw, tracks: extractTracks(raw), warnings: [] };
  } finally {
    mediaInfo.close();
  }
}
