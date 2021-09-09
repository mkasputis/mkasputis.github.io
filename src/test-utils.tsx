import React from "react";
import { render as rtlRender } from "@testing-library/react";
import "@testing-library/jest-dom";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import map from "./features/map/mapSlice";
import theme from "./features/theme/themeSlice";

const reducer = combineReducers({ map, theme });

/**
 * render with redux store
 * no need to redux-persist anything yet
 */
function render(
  ui: any,
  {
    preloadedState,
    store = configureStore({ reducer, preloadedState }),
    useLeaflet,
    ...renderOptions
  }: any = {}
) {
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

const isDbg = ["--runInBand", "--inspect", "--inspect-brk"].some((flag) =>
  process.argv.includes(flag)
);

export * from "@testing-library/react";
// override RTL's render
export { render, isDbg };
