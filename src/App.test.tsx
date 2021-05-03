import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { APP_TITLE } from "./constants";

test("renders app title", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const titleElement = screen.getByText(APP_TITLE);
  expect(titleElement).toBeInTheDocument();
});
