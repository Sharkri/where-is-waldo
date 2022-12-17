/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import GameLevel from "../GameLevel";

jest.mock("../Character.js", () => ({ character }) => (
  <div>{character.name}</div>
));

jest.mock("../../levels.js", () => [
  {
    id: 0,
    photo: "levelzero.png",
    name: "level zero",
    characters: [],
  },

  {
    id: 1234,
    photo: "unknown.png",
    name: "test level",
    characters: [
      {
        name: "john doe",
        photo: "johndoe.jpg",
        id: 0,
      },
    ],
  },
]);

jest.mock("../GameInstructions.js", () => ({ onStart, level }) => (
  <div data-testid="instructions">
    <div data-testid="level">{level.id}</div>
    <button type="button" onClick={onStart} data-testid="mock-start-game">
      start game
    </button>
  </div>
));

jest.mock(
  "../Header.js",
  () =>
    ({ children }) =>
      children
);

jest.mock("../GameTimer.js", () => ({ startTime, currentTime }) => (
  <div data-testid="time-elapsed">{currentTime - startTime}</div>
));

it("hides instructions when start game button is clicked", () => {
  render(
    <MemoryRouter initialEntries={["/levels/0"]}>
      <Routes>
        <Route path="/levels/:id" element={<GameLevel />} />
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
    <MemoryRouter initialEntries={["/levels/1234"]}>
      <Routes>
        <Route path="/levels/:id" element={<GameLevel />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByTestId("level").textContent).toBe("1234");
});

it("should toggle open characters list", () => {
  render(
    <MemoryRouter initialEntries={["/levels/1234"]}>
      <Routes>
        <Route path="/levels/:id" element={<GameLevel />} />
      </Routes>
    </MemoryRouter>
  );
  // Characters should be appear by default
  expect(screen.queryByText("john doe")).not.toBeInTheDocument();

  const openCharactersList = screen.getByRole("button", {
    name: "open characters list",
  });

  userEvent.click(openCharactersList);
  expect(screen.getByText("john doe")).toBeInTheDocument();

  userEvent.click(openCharactersList);
  expect(screen.queryByText("john doe")).not.toBeInTheDocument();
});

it("should display timer in real time", () => {
  jest.useFakeTimers();

  render(
    <MemoryRouter initialEntries={["/levels/0"]}>
      <Routes>
        <Route path="/levels/:id" element={<GameLevel />} />
      </Routes>
    </MemoryRouter>
  );
  // Timer should not have ticked yet
  expect(screen.getByTestId("time-elapsed").textContent).toBe("0");

  // Start game (Timer should now begin)
  userEvent.click(screen.getByTestId("mock-start-game"));
  // Advance 1000 ms
  act(() => jest.advanceTimersByTime(1000));
  // Timer should have been ticked to 1000 ms
  expect(screen.getByTestId("time-elapsed").textContent).toBe("1000");
});

// will implement later
it.todo("should show dropdown of characters on click of image");
it.todo("when game ends, interval should be cleared");
