import React from "react";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLeaflet } from "./LeafletContext";
import { deleteOverlay, selectOverlays } from "./mapSlice";

const ShapeTable: React.FC<{ as: string | React.ElementType }> = ({
  as: Table = "table",
  ...tableProps
}) => {
  const { map, control } = useLeaflet();
  const overlays = useAppSelector(selectOverlays);
  const dispatch = useAppDispatch();
  const overlaysArr = Object.entries(overlays);

  function getLayers() {
    const layers: L.Layer[] = [];
    map?.eachLayer((l) => layers.push(l));
    return layers;
  }

  /**
   * warning: while internal _layers will have `overlay` boolean value
   * they won't have `off` method defined which is needed for removal
   */
  function getControlLayers() {
    return control?.layers?._layers;
  }

  /**
   * the overlays should keep order so we could use the
   * less exact index in array to remove
   */
  function leafletRemoveByIndex(index: number) {
    const layers = getLayers();
    debugger;
    //layerToRemove.remove();
    const rem = map?.removeLayer; //(layerToRemove);
    control?.layers.removeLayer(layers[0]);
  }

  /**
   * if order doesn't get maintained switch to this
   */
  function leafletRemoveByName(name: string) {
    const layers = control?.layers?._layers;
    const [layerToRemove] =
      layers
        ?.filter((layer) => layer?.name === name)
        .map((layer) => layer?.layer) ?? [];
    if (layerToRemove) {
      control?.layers.removeLayer(layerToRemove);
      map?.removeLayer(layerToRemove);
    } else {
      console.log(`could not find layer by the name of "${name}" to remove`);
    }
  }

  return (
    <Table
      {...tableProps}
      className={`table-${overlaysArr.length === 0 ? "secondary" : "primary"}`}
    >
      <thead>
        <tr>
          <th>id</th>
          <th>control</th>
          <th>type</th>
          <th>coordinates</th>
        </tr>
      </thead>
      <tbody>
        {overlaysArr.length === 0 && (
          <tr>
            <td colSpan={4}>start drawing shapes on the map</td>
          </tr>
        )}
        {overlaysArr.map(([key, overlay]: [string, any], index) => {
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <Button
                  onClick={() => {
                    //leafletRemoveByIndex(index);
                    leafletRemoveByName(key);
                    dispatch(deleteOverlay(key));
                  }}
                >
                  delete
                </Button>
              </td>
              <td>{overlay.geometry.type}</td>
              <td>{JSON.stringify((overlay.geometry as any)?.coordinates)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ShapeTable;
