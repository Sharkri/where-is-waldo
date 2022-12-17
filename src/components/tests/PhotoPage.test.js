/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PhotoPage from "../PhotoPage";

jest.mock("../Characters.js", () => ({ characters }) => (
  <div data-testid="characters">{JSON.stringify(characters)}</div>
));

jest.mock("../../levels.js", () => [
  {
    id: 0,
    photo: "levelzero.png",
    name: "level zero",
    characters: [],
  },

  {
    id: 1,
    photo: "unknown.png",
    name: "test level",
    characters: [
      {
        name: "john doe",
        photo: "johndoe.jpg",
      },
    ],
  },
]);

jest.mock("../PhotoLevelInstructions.js", () => ({ onStart, level }) => (
  <div data-testid="instructions">
    <div data-testid="level-string">{JSON.stringify(level)}</div>
    <button type="button" onClick={onStart} data-testid="mock-start-game">
      start game
    </button>
  </div>
));

it("should get correct level based on initial entry", () => {
  render(
    <MemoryRouter initialEntries={["/levels/1"]}>
      <Routes>
        <Route path="/levels/:id" element={<PhotoPage />} />
      </Routes>
    </MemoryRouter>
  );

  const photo = screen.getByRole("img", { name: "test level" });
  expect(photo).toHaveAttribute("src", "unknown.png");

  const characters = screen.getByTestId("characters");
  expect(JSON.parse(characters.textContent)).toEqual([
    {
      name: "john doe",
      photo: "johndoe.jpg",
    },
  ]);
});

it("hides instructions when start game button is clicked", () => {
  render(
    <MemoryRouter initialEntries={["/levels/0"]}>
      <Routes>
        <Route path="/levels/:id" element={<PhotoPage />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.queryByTestId("instructions")).toBeInTheDocument();
  // simulate game started
  const startGame = screen.getByTestId("mock-start-game");
  userEvent.click(startGame);
  // check if it instructions are still visible
  expect(screen.queryByTestId("instructions")).not.toBeInTheDocument();
});

it("passes in correct level to instructions", () => {
  render(
    <MemoryRouter initialEntries={["/levels/0"]}>
      <Routes>
        <Route path="/levels/:id" element={<PhotoPage />} />
      </Routes>
    </MemoryRouter>
  );

  expect(JSON.parse(screen.getByTestId("level-string").textContent)).toEqual({
    id: 0,
    photo: "levelzero.png",
    name: "level zero",
    characters: [],
  });
});

// will implement later
it.todo("call onClick");
