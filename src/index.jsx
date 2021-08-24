import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

import App from "./components/App";
import { GlobalStyle } from "./components/layout/Styles";
import store from "./app/store";
import { debug } from "webpack";

render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById("app")
);
