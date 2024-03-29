/**
 * WARNING: including a component anywhere else besides the unused import statement
 * will add it's larger mapping modules to the webpack bundle
 * use `import(/ * webpackChuckName: "anotherMap" * / "../path").then(imports => ...)
 */
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export const MappingPage = () => {
  const [contents, setContents] = React.useState(null);
  const mapRef = React.useRef(null);

  if (!contents) {
    setContents(<div>Loading...</div>);
    import(/* webpackChunkName: "map" */ "../features/map").then(
      ({ LeafletMap, Download, ShapeTable, LeafletProvider }) => {
        setContents(
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
                  <LeafletMap
                    ref={mapRef}
                    center={[42.366, -71.975]}
                    zoom={9}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Download
                  as={Button}
                  className="mb-4 bg-gradient"
                  variant="primary"
                >
                  Download
                </Download>
              </Col>
            </Row>
            <Row>
              <Col>
                <ShapeTable
                  as={Table}
                  striped
                  bordered
                  hover
                  variant="primary"
                />
              </Col>
            </Row>
          </LeafletProvider>
        );
      }
    );
  }
  return contents;
};

export default MappingPage;
