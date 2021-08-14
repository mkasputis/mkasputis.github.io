import React from "react";
import L from "leaflet";

export type DeferredMap = L.Map | null;
export type DeferredControl = {
  layers: L.Control.Layers & { _layers?: any[] };
} | null;

export const LeafletContext = React.createContext<{
  map?: DeferredMap;
  control?: DeferredControl;
}>({});

/**
 * use:
 * const mapRef = React.useRef(null)
 * return (
 *  <LeafletProvider mapRef={mapRef}>
 *    <div ref={mapRef}></div>
 *    <CallsUseLeafletHook />
 *  </LeafletProvider>
 * )
 */
export const LeafletProvider: React.FC<{
  mapRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ mapRef, children }) => {
  if (typeof mapRef === "undefined") {
    throw new Error("a React ref must be passed to the `mapRef` prop");
  }
  if (typeof mapRef?.current === "undefined") {
    throw new Error("mapRef.current must be defined");
  }
  const [value, setValue] = React.useState<{
    map: DeferredMap;
    control: DeferredControl;
  }>({ map: null, control: null });
  React.useEffect(() => {
    if (mapRef.current && value?.map == null) {
      const map = new L.Map(mapRef.current);
      const control = { layers: new L.Control.Layers() };
      control.layers.addTo(map);
      setValue({ map, control });
    }
  }, [mapRef, value?.map]);
  return (
    <LeafletContext.Provider
      value={{ map: value?.map, control: value?.control }}
    >
      {children}
    </LeafletContext.Provider>
  );
};

export const LeafletProvider2 = React.forwardRef<any, any>(
  ({ mapRef, children }, ref) => {
    if (typeof mapRef === "undefined") {
      throw new Error("a React ref must be passed to the `mapRef` prop");
    }
    if (typeof mapRef?.current === "undefined") {
      throw new Error("mapRef.current must be defined");
    }
    const [map, setMap] = React.useState<DeferredMap>(null);
    React.useEffect(() => {
      if (mapRef.current && map == null) {
        const instance = new L.Map(mapRef.current);
        setMap(instance);
      }
    }, [mapRef, map, setMap]);
    return (
      <LeafletContext.Provider value={{ map }}>
        {children}
      </LeafletContext.Provider>
    );
  }
);

export const useLeaflet = () => {
  return React.useContext(LeafletContext);
};

export default LeafletContext;
