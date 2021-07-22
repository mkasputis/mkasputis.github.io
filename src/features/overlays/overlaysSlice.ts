import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface OverlaysState {
  [id: string]: any;
}
export const overlaysSlice = createSlice({
  name: "overlays",
  initialState: {} as OverlaysState,
  reducers: {
    add: (state, action: PayloadAction<{ id: string; overlay: any }>) => {
      const { id, overlay } = action.payload;
      state[id] = overlay;
    },
    delete: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const selectOverlays = (state: RootState) => state.overlays;
export const { add, delete: del } = overlaysSlice.actions;
export default overlaysSlice.reducer;
