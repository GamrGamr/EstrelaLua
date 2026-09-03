import { copyFile, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const vendor = join(root, "vendor");

const files = [
  ["node_modules/exifr/dist/full.esm.js", "exifr.full.esm.js"],
  ["node_modules/exifr/LICENSE", "licenses/exifr-LICENSE"],
  ["node_modules/mediainfo.js/dist/esm-bundle/index.min.js", "mediainfo.js"],
  ["node_modules/mediainfo.js/dist/MediaInfoModule.wasm", "MediaInfoModule.wasm"],
  ["node_modules/mediainfo.js/LICENSE.txt", "licenses/mediainfo.js-LICENSE.txt"],
  ["node_modules/maplibre-gl/dist/maplibre-gl.mjs", "maplibre-gl.mjs"],
  ["node_modules/maplibre-gl/dist/maplibre-gl-shared.mjs", "maplibre-gl-shared.mjs"],
  ["node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs", "maplibre-gl-worker.mjs"],
  ["node_modules/maplibre-gl/dist/maplibre-gl.css", "maplibre-gl.css"],
  ["node_modules/maplibre-gl/LICENSE.txt", "licenses/maplibre-gl-LICENSE.txt"],
];

await rm(vendor, { recursive: true, force: true });
for (const [source, destination] of files) {
  const target = join(vendor, destination);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(join(root, source), target);
}

console.log(`Copied ${files.length} browser dependencies to vendor/.`);
