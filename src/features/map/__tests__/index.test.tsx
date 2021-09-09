import React from "react";
import { screen, render, waitFor, fireEvent } from "../../../test-utils";
import { LeafletProvider } from "../LeafletContext";
import { LeafletMap } from "..";

const renderMap = (mapProps: any, siblings = null) => {
  const mapRef = React.createRef<HTMLDivElement>();
  return {
    mapRef,
    ...render(
      <LeafletProvider mapRef={mapRef}>
        {siblings}
        <LeafletMap {...mapProps} ref={mapRef} />
      </LeafletProvider>
    ),
  };
};

describe("map features", () => {
  test("should see 'loading' initially", async () => {
    render(<LeafletMap center={[0, 0]} zoom={8} />);
    expect(screen.getByText(/loading/i)).toBeTruthy();
  });

  test("should see leaflet-draw", async () => {
    const { mapRef } = renderMap({ center: [0, 0], zoom: 8 });
    await waitFor(() => {
      expect(screen.getByText(/draw a polyline/i)).toBeTruthy();
    });
    expect(screen.getByText(/draw a polygon/i)).toBeTruthy();
    expect(screen.getByText(/draw a rectangle/i)).toBeTruthy();
  });

  test("should see cancel draw button", async () => {
    const { container } = renderMap({ center: [0, 0], zoom: 8 });
    const drawBtn = container.querySelector(".leaflet-draw-draw-rectangle");
    if (drawBtn == null) throw new Error("draw button not found");
    fireEvent.click(drawBtn);
    expect(screen.queryByText(/cancel/i)).toBeTruthy();
  });
});
