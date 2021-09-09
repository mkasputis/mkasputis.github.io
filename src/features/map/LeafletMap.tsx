import React from "react";
import styled from "styled-components";
import {
  useAppDispatch,
  useAppSelector,
  useAppSelectorRef,
  useAppSelectorRef2,
} from "../../app/hooks";
import { selectPrimary } from "../theme/themeSlice";
import {
  selectOverlays,
  selectShapeCounts,
  selectPosition,
  addOverlay,
  incrementShapeCount,
  updatePosition,
} from "./mapSlice";
import {
  CONTAINER_ID,
  initializeMap,
  createOsmTileLayer,
  LayerRecord,
  overlaysToGeoJson,
} from "./leafletUtils";
import { useLeaflet } from "./LeafletContext";

type MapProps = { center: [number, number]; zoom: number };

//const Map: React.FC<MapProps> = ({ center, zoom }) => {
const Map = React.forwardRef<HTMLDivElement, MapProps>(
  ({ center, zoom }, ref) => {
    let geoJsonLayers: LayerRecord = {};
    const dispatch = useAppDispatch();
    const { map, control } = useLeaflet();
    const primaryColor = useAppSelector(selectPrimary);
    const overlays = useAppSelector(selectOverlays);
    const position = useAppSelector(selectPosition);
    const shapeCountsRef = useAppSelectorRef(selectShapeCounts);
    if (position) {
      center = [position.lat, position.lng];
      zoom = position.zoom;
    }

    React.useEffect(() => {
      if (map != null) {
        geoJsonLayers = overlaysToGeoJson(overlays, primaryColor);
        initializeMap(map, {
          center,
          zoom,
          control,
          layers: [...Object.values(geoJsonLayers)],
          geoJsonLayers,
        });

        // @ts-ignore
        // add listener to for drawing events that dispatch to store
        map.on(L.Draw.Event.CREATED, handleCreateEvent);
        map.on("move", ({ target }) => {
          const { lat, lng } = target.getCenter();
          const zoom = target.getZoom();
          dispatch(updatePosition({ lat, lng, zoom }));
        });
      }
    }, [map]);

    function handleCreateEvent(event: L.LeafletEvent) {
      // @ts-ignore
      const { layer, layerType } = event;
      layer.setStyle({ color: primaryColor });

      // get a unique layer name based on shape
      let count = shapeCountsRef?.current?.[layerType] || 0;
      const name = `${layerType} ${++count}`;
      dispatch(incrementShapeCount(layerType));

      // add to both control and map so leaflet can update it's state
      control?.layers.addOverlay(layer, name);
      map?.addLayer(layer);

      // add to store so data can be used elsewhere
      const geoJSON = layer.toGeoJSON();
      dispatch(addOverlay({ id: name, overlay: geoJSON }));
    }
    return (
      <div ref={ref} id={CONTAINER_ID} className="LeafletMap__container">
        {typeof map === "undefined" ? "Loading..." : null}
      </div>
    );
  }
);

Map.displayName = "Map";

/**
 * no hook options must use class methods
 */
class MapErrorBoundary extends React.Component<{}, { error: Error | null }> {
  state = { error: null };

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    return this.state.error ? (
      <div
        id={CONTAINER_ID}
        className="LeafletMap__container LeafletMap--error"
      >
        <p className="LeafletMap__text">Could not load maps</p>
      </div>
    ) : (
      this.props.children
    );
  }
}

const LeafletMap = React.forwardRef<HTMLDivElement, MapProps>((props, ref) => (
  <MapErrorBoundary>
    <Map ref={ref} {...props} />
  </MapErrorBoundary>
));

LeafletMap.displayName = "LeafletMap";

export default LeafletMap;
