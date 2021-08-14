import React from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import {
  useLeaflet,
  WorkingContext,
  LeafletProvider,
  WorkingProvider,
} from "../features/map/useLeaflet";

const WIPLayer = () => {
  const { map } = useLeaflet();
  return <div>WIPLayer</div>;
};

const WorkingLayer = () => {
  const { map } = React.useContext(WorkingContext);
  return <div>layer</div>;
};

export const TempPage = () => {
  const ref = React.useRef(null);

  return (
    <>
      <WorkingProvider>
        <WorkingLayer />
      </WorkingProvider>
      <LeafletProvider mapRef={ref}>
        <WIPLayer />
        <div style={{ height: "100px" }} ref={ref}>
          WIPMap
        </div>
      </LeafletProvider>
    </>
  );
};

export default TempPage;
