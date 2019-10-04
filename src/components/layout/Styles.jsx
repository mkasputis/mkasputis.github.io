import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

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

export const Container = styled.div`
  display: grid;
  grid:
    "header" 1fr
    "body" 10fr;
  height: 100vh;
  margin: 0;
`;

export const Nav = ({ children, color }) => {
  const Styled = styled.nav`
    grid-area: header;
    height: 100%;
    background: ${color ? color : "darkblue"};
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
      font-size: 1rem;
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
        <li style={{ flex: 1 }}>
          <Avatar />
        </li>
        {children}
      </ul>
    </Styled>
  );
};

const Avatar = () => (
  <>
  {/*<img src='' alt='profile img' />*/}
  </>
);

export const NavLink = (props) => (
  <li>
    <Link {...props}>{props.children}</Link>
  </li>
);

export const Body = styled.div`
  grid-area: body;
  padding: 0 1em;
`;
