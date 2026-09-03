import test from "node:test";
import assert from "node:assert/strict";

import {
  compassDirection,
  flattenMetadata,
  formatAperture,
  formatAspectRatio,
  formatFileSize,
  formatShutterSpeed,
  serialiseMetadata,
} from "../dist/lib/formatters.js";
import { detectMedia, isValidCoordinate } from "../dist/lib/file-signature.js";
import { inspectMedia } from "../dist/lib/inspector.js";
import { normaliseImage, normaliseVideo } from "../dist/lib/normalizer.js";

const jpegDetected = { kind: "image", format: "JPEG", extension: "jpg", mimeType: "image/jpeg", confidence: "signature" };
const mp4Detected = { kind: "video", format: "MPEG-4", extension: "mp4", mimeType: "video/mp4", confidence: "signature" };
const movDetected = { kind: "video", format: "QuickTime", extension: "mov", mimeType: "video/quicktime", confidence: "signature" };

function mockFile(name, type = "application/octet-stream", size = 20) {
  return new File([new Uint8Array(size)], name, { type, lastModified: Date.UTC(2026, 8, 3, 17, 42, 0) });
}

test("formats common shutter speeds", () => {
  assert.equal(formatShutterSpeed(0.004), "1/250 sec");
  assert.equal(formatShutterSpeed(1.5), "1.5 sec");
  assert.equal(formatShutterSpeed(1.5, "pt"), "1,5 s");
  assert.equal(formatShutterSpeed(0), "—");
});

test("formats apertures", () => {
  assert.equal(formatAperture(1.8), "f/1.8");
  assert.equal(formatAperture(-1), "—");
});

test("formats file sizes without invalid output", () => {
  assert.equal(formatFileSize(0), "0 B");
  assert.equal(formatFileSize(1024, "en"), "1 KB");
  assert.equal(formatFileSize(Number.NaN), "—");
});

test("validates coordinate boundaries", () => {
  assert.equal(isValidCoordinate(38.7223, -9.1393), true);
  assert.equal(isValidCoordinate(90, 180), true);
  assert.equal(isValidCoordinate(90.01, 0), false);
  assert.equal(isValidCoordinate(0, -180.01), false);
});

test("converts compass bearings in both languages", () => {
  assert.equal(compassDirection(247, "en"), "South-west");
  assert.equal(compassDirection(247, "pt"), "Sudoeste");
  assert.equal(compassDirection(450, "en"), "East");
});

test("formats common and uncommon aspect ratios", () => {
  assert.equal(formatAspectRatio(3840, 2160), "16:9");
  assert.equal(formatAspectRatio(4000, 3000), "4:3");
  assert.equal(formatAspectRatio(0, 10), "—");
});

test("normalises a DSLR JPEG with full EXIF", () => {
  const file = mockFile("portrait.jpg", "image/jpeg", 2048);
  const rawSources = {
    ifd0: { Make: "Sony", Model: "ILCE-7M4", ImageWidth: 7008, ImageHeight: 4672 },
    exif: { LensModel: "FE 35mm F1.4 GM", ISO: 100, ExposureTime: 0.002, FNumber: 2, FocalLength: 35, DateTimeOriginal: new Date("2026-09-03T17:42:00Z") },
  };
  const result = normaliseImage(file, jpegDetected, { dimensions: { width: 7008, height: 4672 }, rawSources, merged: { ...rawSources.ifd0, ...rawSources.exif }, warnings: [] });
  assert.equal(result.device.model, "ILCE-7M4");
  assert.equal(result.capture.exposureTime, 0.002);
  assert.equal(result.file.width, 7008);
  assert.equal(result.location, undefined);
  assert.equal(result.privacyLevel, "medium");
});

test("normalises a smartphone image with GPS and flags it high", () => {
  const file = mockFile("IMG_4832.jpg", "image/jpeg", 4096);
  const rawSources = {
    ifd0: { Make: "Apple", Model: "iPhone 16 Pro" },
    exif: { DateTimeOriginal: "2026:09:03 18:42:00" },
    gps: { GPSAltitude: 74, GPSImgDirection: 247 },
    coordinates: { latitude: 38.7223, longitude: -9.1393 },
  };
  const result = normaliseImage(file, jpegDetected, { dimensions: { width: 8064, height: 6048 }, rawSources, merged: {}, warnings: [] });
  assert.equal(result.location?.latitude, 38.7223);
  assert.equal(result.location?.direction, 247);
  assert.equal(result.privacyLevel, "high");
  assert.equal(result.privacyFindings[0]?.id, "precise-location");
});

test("handles an image whose embedded metadata was stripped", () => {
  const result = normaliseImage(mockFile("shared.jpg", "image/jpeg"), jpegDetected, { dimensions: { width: 1200, height: 800 }, rawSources: {}, merged: {}, warnings: [] });
  assert.deepEqual(result.device, {});
  assert.equal(result.warnings.includes("LITTLE_OR_NO_METADATA"), true);
  assert.equal(result.privacyLevel, "low");
});

test("normalises an MP4 smartphone video and its audio track", () => {
  const file = mockFile("clip.mp4", "video/mp4", 8192);
  const raw = { media: { track: [
    { "@type": "General", Format: "MPEG-4", Duration: 134, OverallBitRate: 81_400_000, "com.apple.quicktime.location.ISO6709": "+38.7223-009.1393+074.0/" },
    { "@type": "Video", ID: "1", Format: "HEVC", CodecID: "hvc1", Format_Profile: "Main 10", Width: 3840, Height: 2160, FrameRate: 59.94, BitRate: 80_000_000, BitDepth: 10, HDR_Format: "Dolby Vision", Duration: 134 },
    { "@type": "Audio", ID: "2", Format: "AAC", BitRate: 256000, SamplingRate: 48000, Channels: 2, ChannelLayout: "L R", Duration: 134 },
  ] } };
  const tracks = raw.media.track;
  const result = normaliseVideo(file, mp4Detected, { raw, tracks, warnings: [] });
  assert.equal(result.videoTracks[0]?.width, 3840);
  assert.equal(result.audioTracks[0]?.sampleRate, 48000);
  assert.equal(result.location?.longitude, -9.1393);
  assert.equal(result.privacyLevel, "high");
});

test("normalises a MOV camera video with multiple stream kinds", () => {
  const file = mockFile("camera.mov", "video/quicktime", 5000);
  const raw = { media: { track: [
    { "@type": "General", Format: "QuickTime", Duration: 8 },
    { "@type": "Video", Format: "AVC", Width: 1920, Height: 1080, FrameRate: 25 },
    { "@type": "Audio", Format: "PCM", SamplingRate: 48000, Channels: 2 },
    { "@type": "Text", Format: "Timed Text", Language: "en" },
  ] } };
  const result = normaliseVideo(file, movDetected, { raw, tracks: raw.media.track, warnings: [] });
  assert.equal(result.file.format, "QuickTime");
  assert.equal(result.videoTracks.length, 1);
  assert.equal(result.audioTracks.length, 1);
  assert.equal(result.otherTracks.length, 1);
});

test("detects signatures before trusting an incorrect extension", async () => {
  const bytes = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const detected = await detectMedia(new File([bytes], "wrong.mp4", { type: "video/mp4" }));
  assert.equal(detected.kind, "image");
  assert.equal(detected.format, "JPEG");
  assert.equal(detected.confidence, "signature");
});

test("rejects a corrupted or unsupported file gracefully", async () => {
  await assert.rejects(() => inspectMedia(new File(["not media"], "broken.bin", { type: "application/octet-stream" })), /UNSUPPORTED_FORMAT/);
});

test("serialises dates, byte arrays and circular values safely", () => {
  const value = { date: new Date("2026-09-03T00:00:00Z"), bytes: new Uint8Array([1, 2]) };
  value.self = value;
  assert.deepEqual(serialiseMetadata(value), { date: "2026-09-03T00:00:00.000Z", bytes: [1, 2], self: "[Circular]" });
});

test("flattens nested raw metadata for fast search", () => {
  const values = flattenMetadata({ EXIF: { Camera: { Model: "A7 IV" } }, GPS: { Latitude: 38.7 } });
  assert.equal(values.some((entry) => entry.path === "EXIF.Camera.Model" && entry.value === "A7 IV"), true);
  assert.equal(values.some((entry) => entry.path === "GPS.Latitude"), true);
});
