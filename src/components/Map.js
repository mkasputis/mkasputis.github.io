import React from 'react';
import styled from 'styled-components';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({ iconUrl, shadowUrl });

const Div = styled.div`
  height: 100%;
  margin: 5px;
  background: #eee;
  .leaflet-control-layers {
    text-align: left;
  }
`;
const OSM_URL = '';
//const OSM_URL = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
const ErrorMsg = (props) => (
  <Div>
    <p style={{ color: 'red' }}>Could not load maps</p>
  </Div>
);

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 'mapid',
      overlays: [],
      error: null,
      counts: {},
    };
  }

  componentDidMount() {
    const loadedState = this.loadSession();
    const overlays = loadedState === null ? [] : loadedState.overlays;
    const layers = overlays.map(L.geoJSON);
    this.tileLayer = L.tileLayer(OSM_URL);
    this.map = L.map(this.state.id, {
      center: [49.8419, 24.0315],
      zoom: 16,
      drawControl: true,
      layers: [this.tileLayer, ...layers],
    });
    this.layerControl = L.control.layers(
      { 'osm': this.tileLayer },
      layers,
    );
    this.layerControl.addTo(this.map);
    this.map.on(L.Draw.Event.CREATED, this.addOverlay);
  }

  loadSession = () => {
    if (sessionStorage) {
      const string = sessionStorage.getItem('state');
      let state;
      try {
        state = JSON.parse(string);
      } catch(e) {
        state = null;
      }
      if (state !== null) {
        this.setState(state);
      }
      return state;
    }
  }

  saveSession = () => {
    if (sessionStorage) {
      const string = JSON.stringify(this.state || '');
      sessionStorage.setItem('state', string);
    }
  }

  addOverlay = (event) => {
    const { layer, layerType } = event;
    let count = this.state.counts[layerType] || 0;
    const name = `${layerType} ${++count}`;
    this.layerControl.addOverlay(layer, name);
    this.map.addLayer(layer);
    const { overlays } = this.state;
    this.setState({
      overlays: [...overlays, layer.toGeoJSON()],
      counts: { ...this.state.counts, [layerType]: count },
    });
    this.saveSession();
  }

  render() {
    const { id, error } = this.state;
    return (
      <Div id={id}>
        { error && <ErrorMsg /> }
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

export default (props) => (
  <MapErrorBoundary>
    <Map {...props}/>
  </MapErrorBoundary>
);
