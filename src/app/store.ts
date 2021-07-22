import { configureStore } from "@reduxjs/toolkit";
import overlays from "../features/overlays/overlaysSlice";
import theme from "../features/theme/themeSlice";

const store = configureStore({
  reducer: {
    overlays,
    theme,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
