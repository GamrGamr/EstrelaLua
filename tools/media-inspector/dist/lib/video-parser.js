function isRecord(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function extractTracks(raw) {
    const media = isRecord(raw.media) ? raw.media : undefined;
    const tracks = media?.track;
    if (!Array.isArray(tracks))
        return [];
    return tracks.filter(isRecord);
}
export async function parseVideo(file) {
    const moduleUrl = new URL("../../vendor/mediainfo.js", import.meta.url).href;
    const wasmUrl = new URL("../../vendor/MediaInfoModule.wasm", import.meta.url).href;
    const module = await import(moduleUrl);
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
    }
    finally {
        mediaInfo.close();
    }
}
