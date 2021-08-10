import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectOverlays } from "./mapSlice";

const ShapeTable: React.FC<{ as: string | React.ElementType }> = ({
  as: Table = "table",
  ...tableProps
}) => {
  const overlays = useAppSelector(selectOverlays);
  return (
    <Table {...tableProps}>
      <thead>
        <tr>
          <th>id</th>
          <th>type</th>
          <th>coordinates</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(overlays).map(([key, overlay]) => {
          return (
            <tr>
              <td>{key}</td>
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
