import type { LocationMetadata } from "../types.js";

interface MapInstance {
  addControl(control: unknown, position?: string): void;
  jumpTo(options: { center: [number, number]; zoom: number }): void;
  remove(): void;
  on(type: string, listener: (event?: unknown) => void): void;
}

interface MarkerInstance {
  setLngLat(coordinates: [number, number]): MarkerInstance;
  addTo(map: MapInstance): MarkerInstance;
}

interface MapLibreModule {
  Map: new (options: Record<string, unknown>) => MapInstance;
  Marker: new (options?: Record<string, unknown>) => MarkerInstance;
  NavigationControl: new (options?: Record<string, unknown>) => unknown;
  AttributionControl: new (options?: Record<string, unknown>) => unknown;
  setWorkerUrl(url: string): void;
}

let activeMap: MapInstance | undefined;

export async function createPrivacyMap(container: HTMLElement, location: LocationMetadata, onError: () => void): Promise<() => void> {
  activeMap?.remove();
  const moduleUrl = new URL("../../vendor/maplibre-gl.mjs", import.meta.url).href;
  const workerUrl = new URL("../../vendor/maplibre-gl-worker.mjs", import.meta.url).href;
  const maplibre = await import(moduleUrl) as unknown as MapLibreModule;
  maplibre.setWorkerUrl(workerUrl);
  const center: [number, number] = [location.longitude, location.latitude];
  const map = new maplibre.Map({
    container,
    center,
    zoom: 14,
    attributionControl: false,
    style: {
      version: 8,
      sources: {
        osm: {
          type: "raster",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          attribution: "© OpenStreetMap contributors",
          maxzoom: 19,
        },
      },
      layers: [{ id: "osm", type: "raster", source: "osm" }],
    },
  });
  map.addControl(new maplibre.NavigationControl({ showCompass: true }), "top-right");
  map.addControl(new maplibre.AttributionControl({ compact: true }), "bottom-right");
  new maplibre.Marker({ color: "#ffb547" }).setLngLat(center).addTo(map);
  map.on("error", onError);
  activeMap = map;
  return () => map.jumpTo({ center, zoom: 14 });
}

export function destroyPrivacyMap(): void {
  activeMap?.remove();
  activeMap = undefined;
}
