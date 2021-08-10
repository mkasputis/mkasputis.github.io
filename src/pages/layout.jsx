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
import { colorToHsl, hexIsTooLight } from "../features/theme/colorUtils";

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

export const MyNavLink = (props) => (
  <NavLink>
    <Link {...props}>{props.children}</Link>
  </NavLink>
);

/**
 * uses Router links as children and wraps them in bootstrap links
 */
export const MyNavbar = ({ children }) => {
  const primary = useAppSelector(selectPrimary);
  const variant = hexIsTooLight(primary) ? "light" : "dark";
  return (
    <Navbar
      className="mb-4"
      bg="primary"
      variant={variant}
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
