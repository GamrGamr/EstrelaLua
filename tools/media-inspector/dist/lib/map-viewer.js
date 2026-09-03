let activeMap;
export async function createPrivacyMap(container, location, onError) {
    activeMap?.remove();
    const moduleUrl = new URL("../../vendor/maplibre-gl.mjs", import.meta.url).href;
    const workerUrl = new URL("../../vendor/maplibre-gl-worker.mjs", import.meta.url).href;
    const maplibre = await import(moduleUrl);
    maplibre.setWorkerUrl(workerUrl);
    const center = [location.longitude, location.latitude];
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
export function destroyPrivacyMap() {
    activeMap?.remove();
    activeMap = undefined;
}
