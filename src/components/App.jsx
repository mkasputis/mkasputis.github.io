import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';

import {
  Container,
  Nav,
  NavLink,
  Body,
} from './layout/Styles';
import Map from '../containers/Map';

const Index = () => (
  <p>Welcome to my github page! For now the bulk of this React App can be found in the <a href='#/mapping'>Mapping</a> section. You can view this as more of a proof of concept page for using basic React with Leaflet without the help of react-leaflet.</p>
);

const Skills = () => (
  <ul>
    <li>Javascript
      <ul>
        <li>React</li>
        <li>Redux</li>
        <li>Node</li>
        <li>ES6</li>
      </ul>
    </li>
    <li>Python
      <ul>
        <li>Django</li>
        <li>arcpy</li>
      </ul>
    </li>
    <li>Php
      <ul>
        <li>Laravel</li>
      </ul>
    </li>
    <li>ArcGIS
      <ul>
        <li>v10.2</li>
        <li>v9</li>
        <li>v3.3</li>
      </ul>
    </li>
  </ul>
);

const MapsContainer = styled.div`
  display: flex;
  height: 100%;
  > * {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
`;

const Mapping = () => (
  <MapsContainer>
    <div>
      <p>Map Component</p>
      <Map center={[42.366, -71.975]} zoom={9} />
    </div>
  </MapsContainer>
);

const About = () => (
  <p>My name is Matthew Kasputis and I am a javascript developer with a GIS background. I'm currently working with React to make user interfaces (and this page as well). You can check out my other programming interests in the <a href='#/skills'>skills</a> section.</p>
);

export default () => (
  <Router>
    <Container>
      <Nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/skills'>Skills</NavLink>
        <NavLink to='/mapping'>Mapping</NavLink>
        <NavLink to='/about'>About</NavLink>
      </Nav>
      <Body>
        <Route path='/' exact component={Index} />
        <Route path='/skills' component={Skills} />
        <Route path='/mapping' component={Mapping} />
        <Route path='/about' component={About} />
      </Body>
    </Container>
  </Router>
);
