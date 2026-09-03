import { asFiniteNumber, firstText } from "./formatters.js";
import { isValidCoordinate } from "./file-signature.js";
import { findMetadataNumber, findMetadataText, findMetadataValue, hasMeaningfulMetadata } from "./metadata-lookup.js";
import { analysePrivacy } from "./privacy-analyzer.js";
function trackType(track) {
    return firstText(track["@type"])?.toLowerCase() ?? "other";
}
function numberFrom(track, keys) {
    return track ? findMetadataNumber(track, keys) : undefined;
}
function textFrom(track, keys) {
    return track ? findMetadataText(track, keys) : undefined;
}
function parseIso6709(value) {
    if (!value)
        return undefined;
    const match = value.trim().match(/^([+-]\d{2}(?:\.\d+)?)([+-]\d{3}(?:\.\d+)?)([+-]\d+(?:\.\d+)?)?/);
    if (!match)
        return undefined;
    const latitude = Number(match[1]);
    const longitude = Number(match[2]);
    const altitude = match[3] === undefined ? undefined : Number(match[3]);
    if (!isValidCoordinate(latitude, longitude))
        return undefined;
    return Number.isFinite(altitude) ? { latitude, longitude, altitude } : { latitude, longitude };
}
function imageLocation(parsed) {
    const coordinates = parsed.rawSources.coordinates;
    const latitude = findMetadataNumber(coordinates, ["latitude"]) ?? findMetadataNumber(parsed.rawSources, ["latitude", "GPSLatitude"]);
    const longitude = findMetadataNumber(coordinates, ["longitude"]) ?? findMetadataNumber(parsed.rawSources, ["longitude", "GPSLongitude"]);
    if (latitude === undefined || longitude === undefined || !isValidCoordinate(latitude, longitude))
        return undefined;
    const altitude = findMetadataNumber(parsed.rawSources, ["GPSAltitude", "Altitude"]);
    const direction = findMetadataNumber(parsed.rawSources, ["GPSImgDirection", "GPSDestBearing", "ImageDirection"]);
    const accuracy = findMetadataNumber(parsed.rawSources, ["GPSHPositioningError", "GPSAccuracy", "HorizontalAccuracy"]);
    const speed = findMetadataNumber(parsed.rawSources, ["GPSSpeed", "Speed"]);
    const timestamp = findMetadataValue(parsed.rawSources, ["GPSDateTime", "GPSDateStamp", "GPSTimeStamp"]);
    return {
        latitude,
        longitude,
        ...(altitude !== undefined ? { altitude } : {}),
        ...(direction !== undefined ? { direction } : {}),
        ...(accuracy !== undefined ? { accuracy } : {}),
        ...(speed !== undefined ? { speed } : {}),
        ...(timestamp !== undefined ? { timestamp } : {}),
    };
}
function videoLocation(raw) {
    const isoLocation = parseIso6709(findMetadataText(raw, ["com.apple.quicktime.location.ISO6709", "Location_ISO6709", "Recorded_Location"]));
    if (isoLocation)
        return isoLocation;
    const latitude = findMetadataNumber(raw, ["Latitude"]);
    const longitude = findMetadataNumber(raw, ["Longitude"]);
    return latitude !== undefined && longitude !== undefined && isValidCoordinate(latitude, longitude) ? { latitude, longitude } : undefined;
}
function normaliseVideoTrack(track, index) {
    return {
        id: textFrom(track, ["ID", "StreamOrder"]) ?? String(index + 1),
        ...(textFrom(track, ["Format"]) ? { format: textFrom(track, ["Format"]) } : {}),
        ...(textFrom(track, ["CodecID", "CodecID_Hint", "InternetMediaType"]) ? { codec: textFrom(track, ["CodecID", "CodecID_Hint", "InternetMediaType"]) } : {}),
        ...(textFrom(track, ["Format_Profile", "FormatProfile"]) ? { profile: textFrom(track, ["Format_Profile", "FormatProfile"]) } : {}),
        ...(numberFrom(track, ["Width"]) !== undefined ? { width: numberFrom(track, ["Width"]) } : {}),
        ...(numberFrom(track, ["Height"]) !== undefined ? { height: numberFrom(track, ["Height"]) } : {}),
        ...(numberFrom(track, ["FrameRate"]) !== undefined ? { frameRate: numberFrom(track, ["FrameRate"]) } : {}),
        ...(textFrom(track, ["FrameRate_Mode"]) ? { frameRateMode: textFrom(track, ["FrameRate_Mode"]) } : {}),
        ...(numberFrom(track, ["BitRate"]) !== undefined ? { bitRate: numberFrom(track, ["BitRate"]) } : {}),
        ...(numberFrom(track, ["BitDepth"]) !== undefined ? { bitDepth: numberFrom(track, ["BitDepth"]) } : {}),
        ...(textFrom(track, ["ChromaSubsampling"]) ? { chromaSubsampling: textFrom(track, ["ChromaSubsampling"]) } : {}),
        ...(textFrom(track, ["HDR_Format", "HDRFormat"]) ? { hdrFormat: textFrom(track, ["HDR_Format", "HDRFormat"]) } : {}),
        ...(textFrom(track, ["colour_primaries", "ColorPrimaries"]) ? { colourPrimaries: textFrom(track, ["colour_primaries", "ColorPrimaries"]) } : {}),
        ...(textFrom(track, ["transfer_characteristics", "TransferCharacteristics"]) ? { transferCharacteristics: textFrom(track, ["transfer_characteristics", "TransferCharacteristics"]) } : {}),
        ...(numberFrom(track, ["Duration"]) !== undefined ? { durationSeconds: numberFrom(track, ["Duration"]) } : {}),
        ...(numberFrom(track, ["StreamSize"]) !== undefined ? { streamSize: numberFrom(track, ["StreamSize"]) } : {}),
    };
}
function normaliseAudioTrack(track, index) {
    return {
        id: textFrom(track, ["ID", "StreamOrder"]) ?? String(index + 1),
        ...(textFrom(track, ["Format"]) ? { format: textFrom(track, ["Format"]) } : {}),
        ...(textFrom(track, ["CodecID", "CodecID_Hint", "InternetMediaType"]) ? { codec: textFrom(track, ["CodecID", "CodecID_Hint", "InternetMediaType"]) } : {}),
        ...(numberFrom(track, ["BitRate"]) !== undefined ? { bitRate: numberFrom(track, ["BitRate"]) } : {}),
        ...(numberFrom(track, ["SamplingRate"]) !== undefined ? { sampleRate: numberFrom(track, ["SamplingRate"]) } : {}),
        ...(numberFrom(track, ["Channels"]) !== undefined ? { channels: numberFrom(track, ["Channels"]) } : {}),
        ...(textFrom(track, ["ChannelLayout", "ChannelPositions"]) ? { channelLayout: textFrom(track, ["ChannelLayout", "ChannelPositions"]) } : {}),
        ...(numberFrom(track, ["BitDepth"]) !== undefined ? { bitDepth: numberFrom(track, ["BitDepth"]) } : {}),
        ...(textFrom(track, ["Language", "Language_String"]) ? { language: textFrom(track, ["Language", "Language_String"]) } : {}),
        ...(numberFrom(track, ["Duration"]) !== undefined ? { durationSeconds: numberFrom(track, ["Duration"]) } : {}),
        ...(numberFrom(track, ["StreamSize"]) !== undefined ? { streamSize: numberFrom(track, ["StreamSize"]) } : {}),
    };
}
function deviceFrom(source) {
    const manufacturer = findMetadataText(source, ["Make", "Encoded_Application_CompanyName", "com.apple.quicktime.make"]);
    const model = findMetadataText(source, ["Model", "DeviceModelName", "com.apple.quicktime.model"]);
    const lensMake = findMetadataText(source, ["LensMake"]);
    const lensModel = findMetadataText(source, ["LensModel", "Lens"]);
    const software = findMetadataText(source, ["Software", "Encoded_Application", "WritingApplication", "com.apple.quicktime.software"]);
    const firmware = findMetadataText(source, ["Firmware"]);
    const serialNumber = findMetadataText(source, ["SerialNumber", "BodySerialNumber", "CameraSerialNumber", "InternalSerialNumber"]);
    const ownerName = findMetadataText(source, ["OwnerName", "CameraOwnerName", "Creator", "Artist", "Author"]);
    return {
        ...(manufacturer ? { manufacturer } : {}),
        ...(model ? { model } : {}),
        ...(lensMake ? { lensMake } : {}),
        ...(lensModel ? { lensModel } : {}),
        ...(software ? { software } : {}),
        ...(firmware ? { firmware } : {}),
        ...(serialNumber ? { serialNumber } : {}),
        ...(ownerName ? { ownerName } : {}),
    };
}
function captureFrom(source) {
    const iso = findMetadataNumber(source, ["ISO", "PhotographicSensitivity", "ISOSpeedRatings"]);
    const exposureTime = findMetadataNumber(source, ["ExposureTime"]);
    const aperture = findMetadataNumber(source, ["FNumber", "ApertureValue"]);
    const focalLength = findMetadataNumber(source, ["FocalLength"]);
    const focalLength35mm = findMetadataNumber(source, ["FocalLengthIn35mmFormat", "FocalLength35efl"]);
    const exposureCompensation = findMetadataNumber(source, ["ExposureCompensation", "ExposureBiasValue"]);
    const meteringMode = findMetadataText(source, ["MeteringMode"]);
    const exposureMode = findMetadataText(source, ["ExposureMode", "ExposureProgram"]);
    const whiteBalance = findMetadataText(source, ["WhiteBalance"]);
    const flash = findMetadataText(source, ["Flash"]);
    const focusMode = findMetadataText(source, ["FocusMode", "AFMode"]);
    return {
        ...(iso !== undefined ? { iso } : {}),
        ...(exposureTime !== undefined ? { exposureTime } : {}),
        ...(aperture !== undefined ? { aperture } : {}),
        ...(focalLength !== undefined ? { focalLength } : {}),
        ...(focalLength35mm !== undefined ? { focalLength35mm } : {}),
        ...(exposureCompensation !== undefined ? { exposureCompensation } : {}),
        ...(meteringMode ? { meteringMode } : {}),
        ...(exposureMode ? { exposureMode } : {}),
        ...(whiteBalance ? { whiteBalance } : {}),
        ...(flash ? { flash } : {}),
        ...(focusMode ? { focusMode } : {}),
    };
}
function datesFrom(source, file) {
    const captured = findMetadataValue(source, ["DateTimeOriginal", "CreateDate", "CreationDate"]);
    const digitised = findMetadataValue(source, ["DateTimeDigitized", "DigitizedDate"]);
    const modifiedEmbedded = findMetadataValue(source, ["ModifyDate", "DateTime", "Tagged_Date"]);
    const quickTimeCreated = findMetadataValue(source, ["Encoded_Date", "Mastered_Date", "com.apple.quicktime.creationdate"]);
    const gpsTimestamp = findMetadataValue(source, ["GPSDateTime", "GPSDateStamp", "GPSTimeStamp"]);
    const timezone = findMetadataText(source, ["OffsetTimeOriginal", "OffsetTime", "TimeZoneOffset"]);
    return {
        fileLastModified: new Date(file.lastModified),
        ...(captured !== undefined ? { captured } : {}),
        ...(digitised !== undefined ? { digitised } : {}),
        ...(modifiedEmbedded !== undefined ? { modifiedEmbedded } : {}),
        ...(quickTimeCreated !== undefined ? { quickTimeCreated } : {}),
        ...(gpsTimestamp !== undefined ? { gpsTimestamp } : {}),
        ...(timezone ? { timezone } : {}),
    };
}
function fileMetadata(file, detected, image, video) {
    const source = image?.merged ?? video?.raw ?? {};
    const videoTrack = video?.tracks.find((track) => trackType(track) === "video");
    const generalTrack = video?.tracks.find((track) => trackType(track) === "general");
    const width = image?.dimensions?.width ?? findMetadataNumber(source, ["ExifImageWidth", "ImageWidth", "PixelXDimension"]) ?? numberFrom(videoTrack, ["Width"]);
    const height = image?.dimensions?.height ?? findMetadataNumber(source, ["ExifImageHeight", "ImageHeight", "PixelYDimension"]) ?? numberFrom(videoTrack, ["Height"]);
    const durationSeconds = numberFrom(generalTrack, ["Duration"]) ?? numberFrom(videoTrack, ["Duration"]);
    const bitRate = numberFrom(generalTrack, ["OverallBitRate", "BitRate"]);
    const colourSpace = findMetadataText(source, ["ColorSpace", "ColourSpace"]) ?? textFrom(videoTrack, ["colour_description_present", "ColorSpace"]);
    const bitDepth = findMetadataNumber(source, ["BitsPerSample", "BitDepth"]) ?? numberFrom(videoTrack, ["BitDepth"]);
    const orientation = findMetadataText(source, ["Orientation"]);
    return {
        name: file.name,
        extension: detected.extension,
        mimeType: detected.mimeType,
        size: file.size,
        format: textFrom(generalTrack, ["Format", "Format_Commercial_IfAny"]) ?? detected.format,
        mediaType: detected.kind,
        lastModified: new Date(file.lastModified),
        ...(width !== undefined ? { width } : {}),
        ...(height !== undefined ? { height } : {}),
        ...(durationSeconds !== undefined ? { durationSeconds } : {}),
        ...(bitRate !== undefined ? { bitRate } : {}),
        ...(colourSpace ? { colourSpace } : {}),
        ...(bitDepth !== undefined ? { bitDepth } : {}),
        ...(orientation ? { orientation } : {}),
    };
}
export function normaliseImage(file, detected, parsed) {
    const base = {
        detected,
        file: fileMetadata(file, detected, parsed, undefined),
        device: deviceFrom(parsed.rawSources),
        capture: captureFrom(parsed.rawSources),
        dates: datesFrom(parsed.rawSources, file),
        ...(imageLocation(parsed) ? { location: imageLocation(parsed) } : {}),
        videoTracks: [],
        audioTracks: [],
        otherTracks: [],
        rawSources: parsed.rawSources,
        warnings: [...parsed.warnings, ...(!hasMeaningfulMetadata(parsed.rawSources) ? ["LITTLE_OR_NO_METADATA"] : [])],
    };
    const privacy = analysePrivacy(base);
    return { ...base, privacyFindings: privacy.findings, privacyLevel: privacy.level };
}
export function normaliseVideo(file, detected, parsed) {
    const videoSourceTracks = parsed.tracks.filter((track) => trackType(track) === "video");
    const audioSourceTracks = parsed.tracks.filter((track) => trackType(track) === "audio");
    const base = {
        detected,
        file: fileMetadata(file, detected, undefined, parsed),
        device: deviceFrom(parsed.raw),
        capture: captureFrom(parsed.raw),
        dates: datesFrom(parsed.raw, file),
        ...(videoLocation(parsed.raw) ? { location: videoLocation(parsed.raw) } : {}),
        videoTracks: videoSourceTracks.map(normaliseVideoTrack),
        audioTracks: audioSourceTracks.map(normaliseAudioTrack),
        otherTracks: parsed.tracks.filter((track) => !["general", "video", "audio"].includes(trackType(track))),
        rawSources: { MediaInfo: parsed.raw },
        warnings: [...parsed.warnings, ...(!parsed.tracks.length ? ["LITTLE_OR_NO_METADATA"] : [])],
    };
    const privacy = analysePrivacy(base);
    return { ...base, privacyFindings: privacy.findings, privacyLevel: privacy.level };
}
export function parseNumberish(value) {
    return asFiniteNumber(value);
}
