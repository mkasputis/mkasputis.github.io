import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectOverlays } from "./mapSlice";

export const Download: React.FC<{ as: React.ElementType }> = ({
  as: Button = "button",
  children,
  ...buttonProps
}) => {
  const overlays = useAppSelector(selectOverlays);
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
