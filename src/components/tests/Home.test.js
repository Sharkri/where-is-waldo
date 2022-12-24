/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home";

jest.mock(
  "../../helper/levels.js",
  () => () =>
    Promise.resolve([
      { name: "cool level", photo: "cool-level.png", id: 0 },
      { name: "awesome level", photo: "awesome-level.png", id: 1 },
    ])
);

jest.mock("../LoadingScreen.js", () => () => <div>Loading...</div>);

jest.mock("../LevelPreviewCard.js", () => ({ level, showCharacters }) => {
  if (!showCharacters) return null;
  return (
    <div data-testid="photo-level">
      {level.name}, {level.photo}
    </div>
  );
});

it("should map through levels and pass in correct props", async () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  await waitFor(() => screen.getAllByTestId("photo-level"));

  const levels = screen.getAllByTestId("photo-level");

  expect(levels.length).toBe(2);
  expect(levels[0].textContent).toBe("cool level, cool-level.png");
  expect(levels[1].textContent).toBe("awesome level, awesome-level.png");
});

it("should show loading screen", async () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => screen.getAllByTestId("photo-level"));

  expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
});

it("renders correct links", async () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  await waitFor(() => screen.getAllByRole("link"));

  const links = screen.getAllByRole("link", { name: "link to level" });
  expect(links[0]).toHaveAttribute("href", "/levels/0");
  expect(links[1]).toHaveAttribute("href", "/levels/1");
});
