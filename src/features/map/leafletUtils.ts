/**
 * high level Leaflet wrappers/utils to clean up the Map Components
 * and make them more declaritive rather than show too much
 * imperative Leaflet code and style options
 */
import L from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
// @ts-ignore
import iconUrl from "leaflet/dist/images/marker-icon.png";
// @ts-ignore
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { DeferredControl } from "./LeafletContext";

L.Marker.prototype.options.icon = L.icon({ iconUrl, shadowUrl });

export type GeoJSON = Parameters<typeof L.geoJSON>[0];
export type GeoJSONRecord = Record<string, GeoJSON.Feature>;
export type LayerRecord = Record<string, L.Layer>;

const OSM_URL = "https://{s}.tile.osm.org/{z}/{x}/{y}.png";
const OSM_ATTRIB =
  '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors';
const OSM_OPTS = { attribution: OSM_ATTRIB };
export const CONTAINER_ID = "MapContainer";

export const createOsmTileLayer = () => L.tileLayer(OSM_URL, OSM_OPTS);

export const overlaysToGeoJson = (
  overlays = {} as GeoJSONRecord,
  color = "blue"
) => {
  let record: Record<string, L.GeoJSON> = {};
  for (let name in overlays) {
    record[name] = L.geoJSON(overlays[name], {
      style: { color, opacity: 0.5, weight: 4 },
    });
  }
  return record;
};

export const initializeMap = (
  map: L.Map,
  {
    center,
    zoom,
    control,
    layers,
    tileLayer,
    geoJsonLayers,
  }: {
    center: [number, number];
    zoom?: number;
    control?: DeferredControl;
    layers?: L.Layer[];
    tileLayer?: L.TileLayer;
    geoJsonLayers?: LayerRecord;
  } = { center: [0, 0] }
) => {
  map.setView(center, zoom);
  if (typeof tileLayer === "undefined") {
    tileLayer = createOsmTileLayer();
    layers = [tileLayer, ...layers!];
  }
  map.addLayer(L.layerGroup(layers));
  // layer control shows on top right by default
  if (control?.layers) {
    control.layers.addBaseLayer(tileLayer, "osm");
    if (geoJsonLayers) {
      Object.entries(geoJsonLayers).map(([name, layer]) =>
        control.layers.addOverlay(layer, name)
      );
    }
  } else {
    const layerControl = L.control.layers({ osm: tileLayer }, geoJsonLayers);
    layerControl.addTo(map);
  }

  // @ts-ignore
  // draw control
  const drawControl = new L.Control.Draw({
    draw: {
      // @ts-ignore
      // TODO: wth it's not boolean???
      polyline: true,
      // @ts-ignore
      polygon: true,
      // @ts-ignore
      rectangle: true,
      circle: false,
      marker: false,
      circlemarker: false,
    },
  });
  drawControl.addTo(map);
  //return { map, layerControl };
};
