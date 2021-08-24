import React from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useStateRef = (init: any) => {
  const [state, _setState] = React.useState(init);
  const stateRef = React.useRef(state);
  const setStateRef = (next: any) => {
    _setState(next);
    stateRef.current = next;
  };
  return [stateRef, setStateRef];
};

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
/**
 * returns a ref which can be used in eventListeners where other state hooks fail to update
 * @param selector
 * @returns { current: value }
 */

export const useAppSelectorRef = (selector: any) => {
  const ref = React.useRef(null);
  return useSelector((state) => {
    const next = selector(state);
    ref.current = next;
    return ref;
  });
};

export const useAppSelectorRef2 = (selector: any) => {
  const ref = { current: null };
  return useSelector((state) => {
    const next = selector(state);
    ref.current = next;
    return ref;
  });
};
