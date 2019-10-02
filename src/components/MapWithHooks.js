import React from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({ iconUrl, shadowUrl });
const mapStyle = {
  height: '100%',
  margin: '5px',
  background: '#eee',
};

//const OSM_URL = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
const OSM_URL = '';
const ErrorMsg = (props) => (
  <div style={mapStyle}>
    <p style={{ color: 'red' }}>Could not load maps</p>
  </div>
);

const useMap = (id, props) => {
  const [map, setMap] = React.useState(null);
  const [layerControl, setLayerControl] = React.useState(null);
  React.useEffect(() => {
    const tileLayer = L.tileLayer(OSM_URL);
    const control = L.control.layers({ 'osm': tileLayer });
    const initMap = L.map(id, {
      center: [49.8419, 24.0315],
      zoom: 16,
      drawControl: true,
      layers: [tileLayer],
    });
    initMap.on(L.Draw.Event.CREATED, addShape);
    control.addTo(initMap);
    setMap(initMap);
    setLayerControl(control);
  }, []);
  return [map, setMap, layerControl];
}

const addShape = ({ layer }) => {
  let self = this;
  debugger;
  //TODO: add shape to layers
};

const Map = (props) => {
  const id = 'mapIdFn';
  const [map, setMap] = useMap(id, props);
  return (
    <div id={id} style={mapStyle}>
    </div>
  );
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
