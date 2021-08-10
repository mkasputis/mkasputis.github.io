import React from "react";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteOverlay, selectOverlays } from "./mapSlice";

const ShapeTable: React.FC<{ as: string | React.ElementType }> = ({
  as: Table = "table",
  ...tableProps
}) => {
  const overlays = useAppSelector(selectOverlays);
  const dispatch = useAppDispatch();
  const overlaysArr = Object.entries(overlays);
  return (
    <Table {...tableProps}>
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
        {overlaysArr.map(([key, overlay]) => {
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <Button onClick={() => dispatch(deleteOverlay(key))}>
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
