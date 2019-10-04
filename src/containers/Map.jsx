import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import { addOverlay, incrementCount } from '../actions';

L.Marker.prototype.options.icon = L.icon({ iconUrl, shadowUrl });

const Div = styled.div`
  height: 100%;
  margin: 5px;
  background: #eee;
  .leaflet-control-layers {
    text-align: left;
  }
`;
//const OSM_URL = '';
const OSM_URL = 'https://{s}.tile.osm.org/{z}/{x}/{y}.png';
const OSM_OPTS = {
  attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
};
const ErrorMsg = (props) => (
  <Div>
    <p style={{ color: 'red' }}>Could not load maps</p>
  </Div>
);

class Map extends React.Component {
  id = 'mapid'

  componentDidMount() {
    // get overlays from store and create leaflet layers
    const { overlays, shapeColor, center, zoom } = this.props;
    let geoJsonLayers = {};
    if (overlays) {
      // TODO: add style option to geoJSON factory function to match current App theme
      for (let name in overlays) {
        geoJsonLayers[name] = L.geoJSON(
          overlays[name],
          { style: { color: shapeColor } }
        );
      }
    }

    // initialize leaflet map with base tile layer and overlay layers
    this.tileLayer = L.tileLayer(OSM_URL, OSM_OPTS);
    const layers = [this.tileLayer, ...Object.values(geoJsonLayers)];
    this.map = L.map(this.id, {
      center,
      zoom,
      layers,
      //drawControl: true,
    });

    // layer control shows on top right by default
    this.layerControl = L.control.layers(
      { 'osm': this.tileLayer },
      geoJsonLayers,
    );
    this.layerControl.addTo(this.map);

    // draw control
    const drawControl = new L.Control.Draw({
      draw: {
        polyline: true,
        polygon: true,
        rectangle: true,
        circle: false,
        marker: false,
        circlemarker: false,
      },
    });
    drawControl.addTo(this.map);

    // add listener to for drawing events that dispatch to store
    this.map.on(L.Draw.Event.CREATED, this.addOverlay);
  }

  addOverlay = (event) => {
    const { dispatch, counts, shapeColor } = this.props;
    const { layer, layerType } = event;
    layer.setStyle({ color: shapeColor });

    // get a unique layer name based on shape
    let count = counts[layerType] || 0;
    const name = `${layerType} ${++count}`;

    // add to both control and map so leaflet can update it's state
    this.layerControl.addOverlay(layer, name);
    this.map.addLayer(layer);

    // add to store so data can be used elsewhere
    const geoJSON = layer.toGeoJSON();
    dispatch(addOverlay(name, geoJSON));
    dispatch(incrementCount(layerType));
  }

  render() {
    return (
      <Div id={this.id}>
      </Div>
    );
  }
}

class MapErrorBoundary extends React.Component {
  state = { error: null };

  componentDidCatch(error, info) {
    this.setState({ error });
  }

  render() {
    return this.state.error ? <ErrorMsg /> : this.props.children;
  }
}

const mapStateToProps = ({ overlays, counts, theme }) => ({
  overlays,
  counts,
  shapeColor: theme.color,
});

export default connect(mapStateToProps)((props) => (
  <MapErrorBoundary>
    <Map {...props}/>
  </MapErrorBoundary>
));
