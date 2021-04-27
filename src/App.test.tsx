import { render, screen } from "@testing-library/react";
import React from "react";

import App from "./App";
import { APP_TITLE } from "./constants";

test("renders app title", () => {
  render(<App />);
  const titleElement = screen.getByText(APP_TITLE);
  expect(titleElement).toBeInTheDocument();
});
