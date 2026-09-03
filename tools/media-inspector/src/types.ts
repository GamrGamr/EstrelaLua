export type Language = "pt" | "en";
export type MediaKind = "image" | "video";
export type PrivacySeverity = "high" | "medium" | "low";

export interface DetectedMedia {
  kind: MediaKind;
  format: string;
  extension: string;
  mimeType: string;
  confidence: "signature" | "mime" | "extension";
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface ImageParseResult {
  dimensions?: Dimensions;
  rawSources: Record<string, unknown>;
  merged: Record<string, unknown>;
  warnings: string[];
}

export interface MediaInfoTrack extends Record<string, unknown> {
  "@type"?: string;
}

export interface VideoParseResult {
  raw: Record<string, unknown>;
  tracks: MediaInfoTrack[];
  warnings: string[];
}

export interface FileMetadata {
  name: string;
  extension: string;
  mimeType: string;
  size: number;
  format: string;
  mediaType: MediaKind;
  lastModified: Date;
  width?: number;
  height?: number;
  durationSeconds?: number;
  bitRate?: number;
  colourSpace?: string;
  bitDepth?: number;
  orientation?: string;
}

export interface DeviceMetadata {
  manufacturer?: string;
  model?: string;
  lensMake?: string;
  lensModel?: string;
  software?: string;
  firmware?: string;
  serialNumber?: string;
  ownerName?: string;
}

export interface CaptureMetadata {
  iso?: number;
  exposureTime?: number;
  aperture?: number;
  focalLength?: number;
  focalLength35mm?: number;
  exposureCompensation?: number;
  meteringMode?: string;
  exposureMode?: string;
  whiteBalance?: string;
  flash?: string;
  focusMode?: string;
}

export interface DateMetadata {
  captured?: unknown;
  digitised?: unknown;
  modifiedEmbedded?: unknown;
  quickTimeCreated?: unknown;
  gpsTimestamp?: unknown;
  timezone?: string;
  fileLastModified: Date;
}

export interface LocationMetadata {
  latitude: number;
  longitude: number;
  altitude?: number;
  timestamp?: unknown;
  direction?: number;
  accuracy?: number;
  speed?: number;
}

export interface NormalisedVideoTrack {
  id: string;
  format?: string;
  codec?: string;
  profile?: string;
  width?: number;
  height?: number;
  frameRate?: number;
  frameRateMode?: string;
  bitRate?: number;
  bitDepth?: number;
  chromaSubsampling?: string;
  hdrFormat?: string;
  colourPrimaries?: string;
  transferCharacteristics?: string;
  durationSeconds?: number;
  streamSize?: number;
}

export interface NormalisedAudioTrack {
  id: string;
  format?: string;
  codec?: string;
  bitRate?: number;
  sampleRate?: number;
  channels?: number;
  channelLayout?: string;
  bitDepth?: number;
  language?: string;
  durationSeconds?: number;
  streamSize?: number;
}

export interface PrivacyFinding {
  id: string;
  severity: PrivacySeverity;
  titleKey: string;
  descriptionKey: string;
  value?: string;
}

export interface MediaMetadata {
  detected: DetectedMedia;
  file: FileMetadata;
  device: DeviceMetadata;
  capture: CaptureMetadata;
  dates: DateMetadata;
  location?: LocationMetadata;
  videoTracks: NormalisedVideoTrack[];
  audioTracks: NormalisedAudioTrack[];
  otherTracks: MediaInfoTrack[];
  rawSources: Record<string, unknown>;
  privacyFindings: PrivacyFinding[];
  privacyLevel: PrivacySeverity | "none";
  warnings: string[];
}

export interface DisplayField {
  key: string;
  labelKey: string;
  value: string;
  explanationKey?: string;
  sensitive?: boolean;
}
