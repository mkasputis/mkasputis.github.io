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

L.Marker.prototype.options.icon = L.icon({ iconUrl, shadowUrl });

const OSM_URL = "https://{s}.tile.osm.org/{z}/{x}/{y}.png";
const OSM_ATTRIB =
  '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors';
const OSM_OPTS = { attribution: OSM_ATTRIB };
const ID = "mapid";

export const createOsmTileLayer = () => L.tileLayer(OSM_URL, OSM_OPTS);

export type GeoJSON = Parameters<typeof L.geoJSON>[0];
export type GeoJSONRecord = Record<string, GeoJSON.Feature>;
export type LayerRecord = Record<string, L.Layer>;

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

export const createMap = ({
  center,
  zoom,
  layers,
  tileLayer,
  geoJsonLayers,
}: {
  center: [number, number];
  zoom: number;
  layers: L.Layer[];
  tileLayer: L.TileLayer;
  geoJsonLayers: any;
}) => {
  const map = L.map(ID, {
    center,
    zoom,
    layers,
    //drawControl: true,
  });
  // layer control shows on top right by default
  const layerControl = L.control.layers({ osm: tileLayer }, geoJsonLayers);
  layerControl.addTo(map);

  // @ts-ignore
  // draw control
  const drawControl = new L.Control.Draw({
    draw: {
      // TODO: wth it's not boolean???
      polyline: true,
      polygon: true,
      rectangle: true,
      circle: false,
      marker: false,
      circlemarker: false,
    },
  });
  drawControl.addTo(map);

  return { map, layerControl };
};
