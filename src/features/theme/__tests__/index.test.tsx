import React from "react";
import { screen, render, waitFor, fireEvent } from "../../../test-utils";
import reducer, { change } from "../themeSlice";
import { hexIsTooLight } from "../colorUtils";

describe("theme features", () => {
  test("should return initial state", () => {
    const state = reducer(undefined, { type: undefined });
    expect(state?.primary).toEqual("darkblue");
  });

  test("should change primary color", async () => {
    const state = reducer(undefined, change("#007bff"));
    expect(state?.primary).toEqual("#007bff");
  });

  test("should have red contrast white & yellow w/ black", () => {
    const red = "#ff0000";
    const yellow = "#ffff00";
    expect(hexIsTooLight(red)).toBe(false);
    expect(hexIsTooLight(yellow)).toBe(true);
  });
});
