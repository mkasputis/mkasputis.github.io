import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import Nav from "react-bootstrap/Nav";
//import { Nav } from "react-bootstrap"; // Nav.Link is undefined
import { useAppSelector } from "../app/hooks";
import { Globe } from "../svg";
import { selectPrimary } from "../features/theme/themeSlice";
import { colorToHsl } from "../features/theme/colorUtils";

export const RootStyles = createGlobalStyle`
  :root {
    ${(props) =>
      Object.entries(props).map(([variable, color]) => {
        const hslValues = colorToHsl(color);
        /*
        const hslVariables = hslValues.map(
          (suffix) => `--${variable}-${suffix}: null;`
        );
        return hslVariables.join("\n");
        */
        return `
          --${variable}: ${color};
          --${variable}-h: ${hslValues[0]}deg;
          --${variable}-s: ${hslValues[1]}%;
          --${variable}-l: ${hslValues[2]}%;
          --${variable}-a: 1;
        `;
      })}
  }
`;

export const CssVariables = () => {
  const primary = useAppSelector(selectPrimary);
  return <RootStyles primary={primary} />;
};

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root,
  .app,
  body > div {
    height: 100%;
  }
  html,
  body {
    font-size: 20px;
    color: #444;
    margin: 0;
    padding: 0;
    font-family: Helvetica, sans-serif;
    @media (max-width: 600px) {
    /*
      font-size: 35px;
      */
    }
  }
`;

/*
export const Container = styled.div`
  display: grid;
  grid:
    "header" 1fr
    "body" 10fr;
  height: 100vh;
  margin: 0;
`;
*/

/*
export const Nav = ({ children, color }) => {
  const primary = useAppSelector(selectPrimary);
  const Styled = styled.nav`
    grid-area: header;
    height: 100%;
    background: ${primary ? primary : "darkblue"};
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
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
      font-size: 1rem;
      font-weight: bold;
      text-decoration: none;
      :hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  `;
  return (
    <Styled>
      <ul>
        <li style={{ flex: 1 }}>
          <Avatar />
        </li>
        {children}
      </ul>
    </Styled>
  );
};
*/

const Avatar = () => <>{/*<img src='' alt='profile img' />*/}</>;

export const MyNavLink = (props) => (
  <NavLink>
    <Link {...props}>{props.children}</Link>
  </NavLink>
);

export const Body = styled.div`
  grid-area: body;
  padding: 0 1em;
`;

/**
 * uses Router links as children and wraps them in bootstrap links
 */
export const MyNavbar = ({ children }) => {
  return (
    <Navbar
      className="mb-4"
      bg="primary"
      variant="dark"
      expand="md"
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="/">
          <Globe />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse" className="justify-content-end">
          <Nav>
            {children.map((link, key) => (
              <NavItem key={key}>
                <NavLink as="div">{link}</NavLink>
              </NavItem>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

/**
 * children is
 * @param {*} param0
 */
export const Layout = ({ children }) => {
  return (
    <Container>
      <MyNavbar></MyNavbar>
      {children}
    </Container>
  );
};

export default Layout;
