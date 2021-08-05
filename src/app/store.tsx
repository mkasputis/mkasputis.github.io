import React from "react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import map from "../features/map/mapSlice";
import theme from "../features/theme/themeSlice";

const store = configureStore({
  reducer: persistReducer(
    { storage, key: "root", version: 1 },
    combineReducers({
      map,
      theme,
    })
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const ReduxProvider: React.FC = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      {children}
    </PersistGate>
  </Provider>
);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
