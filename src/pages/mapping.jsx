/**
 * WARNING: including a component anywhere else besides the unused import statement
 * will add it's larger mapping modules to the webpack bundle
 */
import React from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { LeafletProvider } from "../features/map/LeafletContext";
import LeafletMap from "../features/map/LeafletMap";
import ShapeTable from "../features/map/ShapeTable";
import Download from "../features/map/Download";

export const MappingPage = () => {
  const mapRef = React.useRef(null);

  return (
    <LeafletProvider mapRef={mapRef}>
      <Row>
        <Col>
          <div className="d-flex justify-content-center">
            <h2>Map Component</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="mb-4" style={{ height: "300px" }}>
            <LeafletMap ref={mapRef} center={[42.366, -71.975]} zoom={9} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Download as={Button} className="mb-4 bg-gradient" variant="primary">
            Download
          </Download>
        </Col>
      </Row>
      <Row>
        <Col>
          <ShapeTable as={Table} striped bordered hover variant="primary" />
        </Col>
      </Row>
    </LeafletProvider>
  );
};

export default MappingPage;
