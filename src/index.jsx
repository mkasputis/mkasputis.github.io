import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import reducer from './reducers';
import { loadState, saveState } from './browserStorage';
import { GlobalStyle } from './components/layout/Styles';

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

render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('app')
);

