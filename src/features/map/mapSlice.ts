import React from "react";
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import type { GeoJSON, GeoJSONRecord } from "./leafletUtils";

export interface MapState {
  overlays: GeoJSONRecord; //Record<string, GeoJSON>;
  shapeCounts: Record<string, number>;
}

export const generateId = createAction("generateId");

let shapeCounts: any = {};
/**
 * returns simple unique ID for display
 * and also so it doesn't overwrite any geoJson in the OverlaysState object
 */
function getId(shapeType: string = "shape"): string {
  if (typeof shapeCounts?.[shapeType] === "undefined") {
    shapeCounts[shapeType] = 0;
  }
  shapeCounts[shapeType] += 1;
  return `${shapeType} ${shapeCounts?.[shapeType]}`;
}

export const mapSlice = createSlice({
  name: "map",
  initialState: { overlays: {}, shapeCounts: {} } as MapState,
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
    XaddOverlay: (
      state,
      action: PayloadAction<{ layerType: string; overlay: any }>
    ) => {
      const { layerType, overlay } = action.payload;
      if (typeof state.shapeCounts?.[layerType] === "undefined") {
        state.shapeCounts[layerType] = 0;
      }
      state.shapeCounts[layerType] += 1;
      let id = `${layerType} ${state.shapeCounts?.[layerType]}`;
      state.overlays[id] = overlay;
    },
  },
});

export const selectOverlays = (state: RootState) => state.map.overlays;
export const selectShapeCounts = (state: RootState) => state.map.shapeCounts;
export const { addOverlay, incrementShapeCount } = mapSlice.actions;
export default mapSlice.reducer;
