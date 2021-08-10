/**
 * WARNING: including a component anywhere else besides the unused import statement
 * will add it's larger mapping modules to the webpack bundle
 */
import React from "react";
import styled from "styled-components";
import { Row, Col, Button, Table } from "react-bootstrap";
import LeafletMap from "../features/map/LeafletMap";
import ShapeTable from "../features/map/ShapeTable";
import Download from "../features/map/Download";
import ReactLeafletMap from "../features/map/ReactLeafletMap";
import SimpleMap from "../features/map/SimpleMap";
import D3Map from "../features/map/D3Map";
import D3Globe from "../features/map/D3Globe";

export const MappingPage = () => (
  <>
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
          <LeafletMap center={[42.366, -71.975]} zoom={9} />
        </div>
      </Col>
    </Row>
    {/*<D3Globe center={[42.366, -71.975]} zoom={9} />*/}
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
        <Table striped bordered hover variant="primary"></Table>
      </Col>
    </Row>
  </>
);

export default MappingPage;
