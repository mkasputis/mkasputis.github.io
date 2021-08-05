/**
 * WARNING: including a component anywhere else besides the unused import statement
 * will add it's larger mapping modules to the webpack bundle
 */
import React from "react";
import styled from "styled-components";
import { Row, Col, Button, Table } from "react-bootstrap";
import LeafletMap from "../features/map/LeafletMap";
import ReactLeafletMap from "../features/map/ReactLeafletMap";
import SimpleMap from "../features/map/SimpleMap";
import D3Map from "../features/map/D3Map";
import D3Globe from "../features/map/D3Globe";

const BootstrapExample = () => (
  <>
    <Row>
      <Col>
        <Button className="mb-4 bg-gradient" variant="primary">
          sup
        </Button>
      </Col>
    </Row>
    <Row>
      <Col>
        <Table striped bordered hover variant="primary">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  </>
);

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
    <BootstrapExample />
  </>
);

export default MappingPage;
