import { isValidCoordinate } from "./file-signature.js";

export interface NavigationLinks {
  googleMaps: string;
  waze: string;
  appleMaps: string;
  openStreetMap: string;
}

export function buildNavigationLinks(latitude: number, longitude: number): NavigationLinks | undefined {
  if (!isValidCoordinate(latitude, longitude)) return undefined;

  const coordinates = `${latitude},${longitude}`;
  const encodedCoordinates = encodeURIComponent(coordinates);
  return {
    googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodedCoordinates}`,
    waze: `https://www.waze.com/ul?ll=${encodedCoordinates}&navigate=yes`,
    appleMaps: `https://maps.apple.com/place?coordinate=${encodedCoordinates}`,
    openStreetMap: `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=16`,
  };
}
