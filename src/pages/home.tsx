import React from "react";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { useAppDispatch } from "../app/hooks";
import { change as changeTheme } from "../features/theme/themeSlice";
import { hexIsTooLight } from "../features/theme/colorUtils";
import { throttle } from "../utils";

const ColorAlert: React.FC<{ value: string }> = ({ value }) => {
  if (typeof value !== "undefined" && hexIsTooLight(value)) {
    return (
      <Alert className="mt-2" variant="danger">
        Warning: this color may make map shapes and links harder to see
      </Alert>
    );
  }
  return null;
};

export const HomePage = () => {
  const [colorValue, setColorValue] = React.useState<string>();
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
        Also feel free to change the color theme around which will also change
        components' style on other pages.
      </p>
      <Card>
        <Card.Body>
          <Card.Title>Color Picker</Card.Title>
          <input
            className="btn btn-primary"
            style={{ padding: ".5rem", height: "3rem", width: "5rem" }}
            type="color"
            onChange={(event) => {
              const { value } = event.target;
              throttledDispatch((dispatch: any) => {
                setColorValue(value);
                return dispatch(changeTheme(value));
              });
            }}
          />
          <ColorAlert value={colorValue ?? ""} />
        </Card.Body>
      </Card>
    </>
  );
};

export default HomePage;
