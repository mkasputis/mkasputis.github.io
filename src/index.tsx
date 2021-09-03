import React from "react";
import { render } from "react-dom";

import "./index.scss";
import Pages from "./pages";
import { ReduxProvider } from "./app/store";

render(
  <ReduxProvider>
    <Pages />
  </ReduxProvider>,
  document.getElementById("app")
);
