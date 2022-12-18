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

jest.mock("../Dropdown.js", () => ({ children, x, y, containerSize }) => (
  <>
    {children}
    <div data-testid="xy">{`${x}, ${y}`}</div>
    <div data-testid="container">{JSON.stringify(containerSize)}</div>
  </>
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

describe("Dropdown", () => {
  it("should show dropdown of characters on click of image with x and y coords", () => {
    render(
      <MemoryRouter initialEntries={["/levels/1234"]}>
        <Routes>
          <Route path="/levels/:id" element={<GameLevel />} />
        </Routes>
      </MemoryRouter>
    );

    // Start the game first
    userEvent.click(screen.getByTestId("mock-start-game"));

    // Should not show up immediately
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();

    const gameImage = screen.getByRole("button", { name: "test level" });

    jest.spyOn(gameImage, "scrollHeight", "get").mockImplementation(() => 100);
    userEvent.click(gameImage, {
      clientX: 50,
      clientY: 34,
    });
    // Passes in correct container (gameImage)
    expect(JSON.parse(screen.getByTestId("container").textContent)).toEqual({
      height: 100, // Mock height of 100
      width: 0,
    });

    expect(screen.getByTestId("xy").textContent).toBe("50, 34");

    const options = screen.getAllByRole("option");
    expect(options[0].textContent).toBe("john doe");
    // value should be character's id
    expect(options[0].value).toBe("0");
  });
});

it("should not allow user to play if game not started", () => {
  render(
    <MemoryRouter initialEntries={["/levels/1234"]}>
      <Routes>
        <Route path="/levels/:id" element={<GameLevel />} />
      </Routes>
    </MemoryRouter>
  );
  const gameImage = screen.getByRole("button", { name: "test level" });

  userEvent.click(gameImage, { clientX: 50, clientY: 34 });
  // Dropdown shouldn't appear to click on characters
  expect(screen.queryByRole("option")).not.toBeInTheDocument();
});

it("should hide overflow when game started", () => {
  render(
    <MemoryRouter initialEntries={["/levels/1234"]}>
      <Routes>
        <Route path="/levels/:id" element={<GameLevel />} />
      </Routes>
    </MemoryRouter>
  );
  expect(document.body).toHaveStyle({ overflow: "hidden" });
  userEvent.click(screen.getByTestId("mock-start-game"));
  expect(document.body).toHaveStyle({ overflow: "unset" });
});

// will implement later
it.todo("when game ends, interval should be cleared");
