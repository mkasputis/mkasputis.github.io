import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import App from './components/App';
import reducer from './reducers';
import { loadState, saveState } from './browserStorage';

const storedState = loadState(sessionStorage);
const store = createStore(
  reducer,
  storedState,
  window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => {
  saveState(store.getState(), sessionStorage);
});

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
    font-size: 1.125em;
    color: #444;
    margin: 0;
    padding: 0;
    font-family: Helvetica, sans-serif;
  }
`;

render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('app')
);

