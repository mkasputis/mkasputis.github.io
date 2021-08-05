import React from "react";
import { useAppDispatch } from "../app/hooks";
import { change as changeTheme } from "../features/theme/themeSlice";
import { throttle } from "../utils";

export const HomePage = (props) => {
  const dispatch = useAppDispatch();
  const throttledDispatch = throttle(dispatch, 200);
  return (
    <>
      <p>
        Welcome to my github page! For now the bulk of this React App can be
        found in the <a href="#/mapping">Mapping</a> section. You can view this
        as more of a proof of concept page for using basic React with Leaflet
        without the help of react-leaflet.
      </p>
      <p>
        Also feel free to change the color theme around. Don't be surprised if
        the map follows suit!
      </p>
      <input
        type="color"
        onChange={(event) => {
          const { value } = event.target;
          throttledDispatch(changeTheme(value));
        }}
      />
    </>
  );
};

export default HomePage;
