import { createStore } from "redux";

import reducer from "./reducers";
import { loadState, saveState } from "./browserStorage";

const storedState = loadState(sessionStorage);

const store = createStore(
  reducer,
  storedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState(store.getState(), sessionStorage);
});

export default store;
