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
  overlaysToGeoJson,
} from "./leafletUtils";

const Div = styled.div`
  height: 100%;
  margin: 5px;
  background: #eee;
  .leaflet-control-layers {
    text-align: left;
  }
`;
let globalShapeCounts = {};
let count, setCount;

const Map = ({ center, zoom }) => {
  //const id = "mapid";
  let geoJsonLayers = {};
  let tileLayer;
  let map;
  let layerControl;
  const dispatch = useAppDispatch();
  const primaryColor = useAppSelector(selectPrimary);
  const overlays = useAppSelector(selectOverlays);
  const shapeCountsRef = useAppSelectorRef(selectShapeCounts);
  const shapeCounts = useAppSelector(selectShapeCounts);
  globalShapeCounts = useAppSelector(selectShapeCounts);
  //const temp = [count, setCount] = React.useState(0);
  const temp = React.useState(0);
  count = temp[0];
  setCount = temp[1];

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

    // add listener to for drawing events that dispatch to store
    map.on(L.Draw.Event.CREATED, handleCreateEvent);
  }, []);

  function handleCreateEvent(event) {
    const { layer, layerType } = event;
    layer.setStyle({ color: primaryColor });

    /**
     * temp
     */
    const [] = [shapeCountsRef];
    [shapeCounts, globalShapeCounts];
    [count];
    setCount(1);

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
class MapErrorBoundary extends React.Component {
  state = { error: null };

  componentDidCatch(error, info) {
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

const LeafletMap = (props) => (
  <MapErrorBoundary>
    <Map {...props} />
  </MapErrorBoundary>
);

export default LeafletMap;
