import React from "react";
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
//import type { GeoJSON, GeoJSONRecord } from "./leafletUtils";

export interface MapState {
  removeLayerId: string | null;
  //overlays: GeoJSONRecord; //Record<string, GeoJSON>;
  overlays: any;
  shapeCounts: Record<string, number>;
  position: { lat: number; lng: number; zoom: number };
}

export const generateId = createAction("generateId");

let shapeCounts: any = {};

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    overlays: {},
    shapeCounts: {},
    position: { lat: 42.366, lng: -71.975, zoom: 9 },
  } as MapState,
  reducers: {
    incrementShapeCount: (
      state,
      { payload: shapeType }: PayloadAction<string>
    ) => {
      if (typeof state.shapeCounts?.[shapeType] === "undefined") {
        state.shapeCounts[shapeType] = 0;
      }
      state.shapeCounts[shapeType] += 1;
    },
    addOverlay: (
      state,
      { payload: { id, overlay } }: PayloadAction<{ id: string; overlay: any }>
    ) => {
      state.overlays[id] = overlay;
    },
    deleteOverlay: (state, { payload: id }) => {
      delete state.overlays[id];
    },
    updatePosition: (
      state,
      {
        payload: { lat, lng, zoom },
      }: PayloadAction<{ lat: number; lng: number; zoom: number }>
    ) => {
      state.position = { ...state.position, lat, lng, zoom };
    },
  },
});

export const selectOverlays = (state: RootState) => state.map.overlays;
export const selectShapeCounts = (state: RootState) => state.map.shapeCounts;
export const selectPosition = (state: RootState) => state.map.position;
export const {
  addOverlay,
  deleteOverlay,
  incrementShapeCount,
  updatePosition,
} = mapSlice.actions;
export default mapSlice.reducer;
