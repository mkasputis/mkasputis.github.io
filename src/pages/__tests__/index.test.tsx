/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, waitFor } from "@testing-library/react";
import { SkillsPage } from "../skills";

/**
 * for more complex tests, narrow the scope down to smaller Components
 * this is more or less simple end-to-end tests minus the routing
 * and if routing's an issue that should be quickly apparent once `yarn start`ed
 */
describe("simple page testing", () => {
  it("finds React in SkillsPage", async () => {
    const { getByText, getAllByText } = render(<SkillsPage />);
    const jsNodes = await waitFor(() => getAllByText(/javascript/i));
    const reactNodes = await waitFor(() => getAllByText(/react/i));
    expect(jsNodes.length).toBeGreaterThan(0);
    expect(reactNodes.length).toBeGreaterThan(0);
  });
});
