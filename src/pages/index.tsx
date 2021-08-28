import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavLink from "react-bootstrap/NavLink";
import { CssVariables, MyNavbar } from "./layout";
import HomePage from "./home";
import SkillsPage from "./skills";
import MappingPage from "./mapping";
import AboutPage from "./about";

const MyLinkOld: React.FC<{ to: string }> = ({ to, children, ...props }) => (
  <Link {...props} to={to} component={NavLink}>
    {children}
  </Link>
);

/**
 * Note: use <Navlink as={Link}> rather than <Link component={NavLink}>
 * so that react-router doesn't pass invalid props to NavLink like `navigate`
 */
const MyLink: React.FC<{ to: string }> = ({ to, children, ...props }) => (
  <NavLink as={Link} to={to} {...props}>
    {children}
  </NavLink>
);

export default () => (
  <>
    <CssVariables />
    <Router>
      <MyNavbar>
        <MyLink to="/skills">Skills</MyLink>
        <MyLink to="/mapping">Mapping</MyLink>
        <MyLink to="/about">About</MyLink>
      </MyNavbar>
      <Container>
        <Route path="/" exact component={HomePage} />
        <Route path="/skills" component={SkillsPage} />
        <Route path="/mapping" component={MappingPage} />
        <Route path="/about" component={AboutPage} />
      </Container>
    </Router>
  </>
);
