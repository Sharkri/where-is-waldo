/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Home from "../Home";

jest.mock(
  "../../helper/levels.js",
  () => () =>
    Promise.resolve([
      { name: "cool level", photo: "cool-level.png", id: 0 },
      { name: "awesome level", photo: "awesome-level.png", id: 1 },
    ])
);

jest.mock("../LevelPreviewCard.js", () => ({ level }) => (
  <div data-testid="photo-level">
    {level.name}, {level.photo}
  </div>
));

it("should map through levels and pass in correct props", async () => {
  render(<Home />);

  await waitFor(() => screen.getAllByTestId("photo-level"));

  const levels = screen.getAllByTestId("photo-level");

  expect(levels.length).toBe(2);
  expect(levels[0].textContent).toBe("cool level, cool-level.png");
  expect(levels[1].textContent).toBe("awesome level, awesome-level.png");
});

it("should show loading screen", async () => {
  render(<Home />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => screen.getAllByTestId("photo-level"));

  expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
});
