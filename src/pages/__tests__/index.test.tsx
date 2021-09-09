import React from "react";
import { screen, render, waitFor, isDbg } from "../../test-utils";
import { SkillsPage } from "../skills";
import { MappingPage } from "../mapping";

/**
 * for more complex tests, narrow the scope down to smaller Components
 * this is more or less simple end-to-end tests minus the routing
 * and if routing's an issue that should quickly become apparent clicking
 * on the nav-links
 */
describe("react-router pages", () => {
  test("should find React in SkillsPage", async () => {
    render(<SkillsPage />);
    const jsNodes = screen.getAllByText(/javascript/i);
    const reactNodes = screen.getAllByText(/react/i);
    expect(jsNodes.length).toBeGreaterThan(0);
    expect(reactNodes.length).toBeGreaterThan(0);
  });

  /**
   * WARNING: because of the import().then(imports => <Page>)
   * syntax for webpack this test will fail if breakpoints
   * are added in the waitFor block or code called in between
   *
   * for more in depth map tests look in ../../features/map/__tests__
   */
  (isDbg ? test.skip : test)(
    "should find leaflet-draw on MappingPage",
    async () => {
      render(<MappingPage />);
      await waitFor(() => {
        expect(screen.getByText(/draw a polyline/i)).toBeTruthy();
      });
      expect(screen.getByText(/draw a polygon/i)).toBeTruthy();
      expect(screen.getByText(/draw a rectangle/i)).toBeTruthy();
    },
    2000
  );
});
