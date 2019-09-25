import React from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid:
    "header" 1fr
    "body" 10fr;
  height: 100vh;
  margin: 0;
`;

const Nav = (props) => {
  const Styled = styled.nav`
    grid-area: header;
    height: 100%;
    background: darkblue;
    box-shadow: 0 3px 5px rgba(0,0,0,0.5);
    ul {
      display: flex;
      align-items: center;
      height: inherit;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li {
      flex: 1;
      height: 100%;
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      color: white;
      font-size: 20px;
      font-weight: bold;
      text-decoration: none;
      :hover {
        background-color: rgba(255,255,255,0.1);
      }
    }
  `;
  return (
    <Styled>
      <ul>
        <li style={{ flex: 2 }}>
          <Avatar />
        </li>
        {props.children}
      </ul>
    </Styled>
  );
};

const Avatar = () => (
  <>
  {/*<img src='' alt='profile img' />*/}
  </>
);

const NavLink = (props) => (
  <li>
    <Link {...props}>{props.children}</Link>
  </li>
);

const Body = styled.div`
  grid-area: body;
  padding: 0 1em;
`;

const Index = () => (
  <p>work in progress</p>
);

const Skills = () => (
  <ul>
    <li>Javascript</li>
    <li>Python</li>
    <li>React</li>
    <li>ArcGIS</li>
    <li></li>
  </ul>
);

const Mapping = () => (
  <p>blurb about mapping</p>
);

const About = () => (
  <p>blurb about me</p>
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
