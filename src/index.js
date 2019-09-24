import React from 'react';
import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import App from './App';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root,
  .app,
  body > div {
    height: 100%;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica, sans-serif;
  }
`;

render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('app')
);

