import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { APP_TITLE } from "./constants";

test("renders app title", () => {
  render(<App />);
  const titleElement = screen.getByText(APP_TITLE);
  expect(titleElement).toBeInTheDocument();
});
