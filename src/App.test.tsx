import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import * as Constants from "./Constants";

test("renders app title", () => {
  render(<App />);
  const titleElement = screen.getByText(Constants.APP_TITLE);
  expect(titleElement).toBeInTheDocument();
});
