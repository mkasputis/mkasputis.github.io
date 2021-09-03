import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export const SkillsPage = () => (
  <Accordion defaultActiveKey="0">
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          Typescript / Javascript
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>React</ListGroup.Item>
            <ListGroup.Item>Redux</ListGroup.Item>
            <ListGroup.Item>Bootstrap (react-bootstrap)</ListGroup.Item>
            <ListGroup.Item>Node</ListGroup.Item>
            <ListGroup.Item>Express</ListGroup.Item>
            <ListGroup.Item>Apollo Graphql</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Accordion.Collapse>
    </Card>

    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="1">
          Python
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="1">
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Django</ListGroup.Item>
            <ListGroup.Item>Arcpy</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Accordion.Collapse>
    </Card>

    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="2">
          Php
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="2">
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Laravel</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Accordion.Collapse>
    </Card>

    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="3">
          Other
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="3">
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>ArcGIS 3.3 / 9 / 10.2</ListGroup.Item>
            <ListGroup.Item>VSCode</ListGroup.Item>
            <ListGroup.Item>Docker</ListGroup.Item>
            <ListGroup.Item>AWS</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  </Accordion>
);

export default SkillsPage;
