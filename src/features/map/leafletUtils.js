/**
 * high level Leaflet wrappers/utils to clean up the Map Components
 * and make them more declaritive rather than show too much
 * imperative Leaflet code and style options
 */
import L from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Marker.prototype.options.icon = L.icon({ iconUrl, shadowUrl });

const OSM_URL = "https://{s}.tile.osm.org/{z}/{x}/{y}.png";
const OSM_ATTRIB =
  '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors';
const OSM_OPTS = { attribution: OSM_ATTRIB };
const ID = "mapid";

export const createOsmTileLayer = () => L.tileLayer(OSM_URL, OSM_OPTS);
export const overlaysToGeoJson = (overlays = [], color = "blue") => {
  let record = {};
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
