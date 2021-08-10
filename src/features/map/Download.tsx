import React from "react";
import { Route, Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectOverlays } from "./mapSlice";

export const DownloadUsingRouter: React.FC<{ as: React.ElementType }> = ({
  children,
  ...buttonProps
}) => {
  const overlays = useAppSelector(selectOverlays);
  // TODO: doesn't seem to work, may just delete later
  return (
    <>
      <Link to="/download.xml" download target="_self">
        Download
      </Link>
      <Route path="/download.xml" component={() => <div>test</div>} />
    </>
  );
};

export const Download: React.FC<{ as: React.ElementType }> = ({
  as: Button = "button",
  children,
  ...buttonProps
}) => {
  const overlays = useAppSelector(selectOverlays);
  //const data = `${encodeURIComponent()}`;
  return (
    <Button
      as={"a"}
      download="geo.json"
      target="_self"
      onClick={(event: React.SyntheticEvent<HTMLAnchorElement>) => {
        const geoJSON = Object.values(overlays);
        event.currentTarget.href = `data:text/json;charset=utf-8,${JSON.stringify(
          geoJSON
        )}`;
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export default Download;
