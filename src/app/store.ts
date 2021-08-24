import { configureStore } from "@reduxjs/toolkit";
import map from "../features/map/mapSlice";
import theme from "../features/theme/themeSlice";

const store = configureStore({
  reducer: {
    map,
    theme,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
