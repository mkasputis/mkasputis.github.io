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
  addOverlay,
  incrementShapeCount,
} from "./mapSlice";
import {
  createMap,
  createOsmTileLayer,
  LayerRecord,
  overlaysToGeoJson,
} from "./leafletUtils";

const Div = styled.div`
  height: 100%;
  background: #eee;
  .leaflet-control-layers {
    text-align: left;
  }
`;

type MapProps = { center: [number, number]; zoom: number };

const Map: React.FC<MapProps> = ({ center, zoom }) => {
  let geoJsonLayers: LayerRecord = {};
  let tileLayer: L.TileLayer;
  let map: L.Map;
  let layerControl: L.Control.Layers;
  const dispatch = useAppDispatch();
  const primaryColor = useAppSelector(selectPrimary);
  const overlays = useAppSelector(selectOverlays);
  const shapeCountsRef = useAppSelectorRef(selectShapeCounts);
  const shapeCounts = useAppSelector(selectShapeCounts);

  React.useEffect(() => {
    geoJsonLayers = overlaysToGeoJson(overlays, primaryColor);
    tileLayer = createOsmTileLayer();
    const layers = [tileLayer, ...Object.values(geoJsonLayers)];
    ({ map, layerControl } = createMap({
      center,
      zoom,
      layers,
      tileLayer,
      geoJsonLayers,
    }));

    // @ts-ignore
    // add listener to for drawing events that dispatch to store
    map.on(L.Draw.Event.CREATED, handleCreateEvent);
  }, []);

  function handleCreateEvent(event: any) {
    const { layer, layerType } = event;
    layer.setStyle({ color: primaryColor });

    // get a unique layer name based on shape
    let count = shapeCountsRef?.current?.[layerType] || 0;
    const name = `${layerType} ${++count}`;
    dispatch(incrementShapeCount(layerType));

    // add to both control and map so leaflet can update it's state
    layerControl.addOverlay(layer, name);
    map.addLayer(layer);

    // add to store so data can be used elsewhere
    const geoJSON = layer.toGeoJSON();
    dispatch(addOverlay({ id: name, overlay: geoJSON }));
  }
  return <Div id="mapid"></Div>;
};

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
      <Div>
        <p style={{ color: "red" }}>Could not load maps</p>
      </Div>
    ) : (
      this.props.children
    );
  }
}

const LeafletMap: React.FC<MapProps> = (props) => (
  <MapErrorBoundary>
    <Map {...props} />
  </MapErrorBoundary>
);

export default LeafletMap;
