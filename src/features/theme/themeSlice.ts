import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ThemeState {
  primary: string;
}

export const themeSlice = createSlice({
  name: "theme",
  initialState: { primary: "darkblue" } as ThemeState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.primary = action.payload;
    },
  },
});

export const { change } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme;
export const selectPrimary = (state: RootState) => state.theme.primary;
export default themeSlice.reducer;
