import { detectMedia } from "./file-signature.js";
import { parseImage } from "./image-parser.js";
import { normaliseImage, normaliseVideo } from "./normalizer.js";
import { parseVideo } from "./video-parser.js";
const MAX_FILE_BYTES = 20 * 1024 * 1024 * 1024;
export async function inspectMedia(file) {
    if (!(file instanceof File) || file.size <= 0)
        throw new Error("EMPTY_FILE");
    if (file.size > MAX_FILE_BYTES)
        throw new Error("FILE_TOO_LARGE");
    const detected = await detectMedia(file);
    if (detected.kind === "image")
        return normaliseImage(file, detected, await parseImage(file));
    return normaliseVideo(file, detected, await parseVideo(file));
}
