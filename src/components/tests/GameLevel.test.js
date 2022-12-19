/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { act, render, screen, waitFor } from "@testing-library/react";
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

jest.mock(
  "../../helper/getLevelById.js",
  () => (id) =>
    Promise.resolve({
      photo: "fake_level.png",
      name: "fake level",
      id,
      characters: [{ name: "character name", photo: "johndoe.png", id: 0 }],
    })
);

jest.mock("../GameInstructions.js", () => ({ onStart, level }) => (
  <div data-testid="instructions">
    <div data-testid="instructions-level">{level.name}</div>
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

it("hides instructions when start game button is clicked", async () => {
  render(
    <MemoryRouter initialEntries={["/levels/0"]}>
      <Routes>
        <Route path="/levels/:id" element={<GameLevel />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() =>
    expect(screen.getByTestId("instructions")).toBeInTheDocument()
  );

  // Start game, now instructions should disappear
  userEvent.click(screen.getByTestId("mock-start-game"));

  expect(screen.queryByTestId("instructions")).not.toBeInTheDocument();
});

it("gives correct level to game instructions", async () => {
  render(
    <MemoryRouter initialEntries={["/levels/1234"]}>
      <Routes>
        <Route path="/levels/:id" element={<GameLevel />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() =>
    expect(screen.getByTestId("instructions-level").textContent).toBe(
      "fake level"
    )
  );
});

it("should toggle open characters list", async () => {
  render(
    <MemoryRouter initialEntries={["/levels/1234"]}>
      <Routes>
        <Route path="/levels/:id" element={<GameLevel />} />
      </Routes>
    </MemoryRouter>
  );
  // Wait for all state updates
  await waitFor(() =>
    screen.getByRole("button", {
      name: "open characters list",
    })
  );

  // Characters list shouldn't appear by default
  expect(screen.queryByText("character name")).not.toBeInTheDocument();

  const openCharactersList = screen.getByRole("button", {
    name: "open characters list",
  });

  // Open characters list clicked, character should now show up
  userEvent.click(openCharactersList);
  expect(screen.getByText("character name")).toBeInTheDocument();
  // If clicked again, toggle back to showing nothing
  userEvent.click(openCharactersList);
  expect(screen.queryByText("character name")).not.toBeInTheDocument();
});

it("should display timer in real time", async () => {
  jest.useFakeTimers();

  render(
    <MemoryRouter initialEntries={["/levels/0"]}>
      <Routes>
        <Route path="/levels/:id" element={<GameLevel />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() =>
    // Timer should not have ticked yet
    expect(screen.getByTestId("time-elapsed").textContent).toBe("0")
  );

  // Start game (Timer should now begin)
  userEvent.click(screen.getByTestId("mock-start-game"));
  // Advance 1000 ms
  act(() => jest.advanceTimersByTime(1000));
  // Timer should have been ticked to 1000 ms
  expect(screen.getByTestId("time-elapsed").textContent).toBe("1000");
});

describe("Dropdown", () => {
  it("should show dropdown of characters on click of image with x and y coords", async () => {
    render(
      <MemoryRouter initialEntries={["/levels/1234"]}>
        <Routes>
          <Route path="/levels/:id" element={<GameLevel />} />
        </Routes>
      </MemoryRouter>
    );

    // Start the game first
    await waitFor(() => userEvent.click(screen.getByTestId("mock-start-game")));

    // List of characters does not show up immediately
    expect(
      screen.queryByRole("option", {
        name: "character name",
      })
    ).not.toBeInTheDocument();

    const gameImage = screen.getByRole("button", { name: /fake level/i });
    // Click at coordinates (50, 34)
    userEvent.click(gameImage, {
      clientX: 50,
      clientY: 34,
    });

    expect(screen.getByTestId("xy").textContent).toBe("50, 34");

    const option = screen.getByRole("option", { name: "character name" });
    expect(option.textContent).toBe("character name");
    // value should be character's id
    expect(option.value).toBe("0");
  });
});

it("should not allow user to play if game not started", async () => {
  render(
    <MemoryRouter initialEntries={["/levels/1234"]}>
      <Routes>
        <Route path="/levels/:id" element={<GameLevel />} />
      </Routes>
    </MemoryRouter>
  );

  // Attempt to open the list of possible characters
  await waitFor(() =>
    userEvent.click(screen.queryByRole("button", { name: "fake level" }))
  );

  // Game hasn't started yet, should not allow user to play the game.
  expect(screen.queryByRole("option")).not.toBeInTheDocument();
  // Game has started!
  userEvent.click(screen.getByTestId("mock-start-game"));

  // Now dropdown should be able to appear
  userEvent.click(screen.queryByRole("button", { name: "fake level" }));

  expect(
    screen.getByRole("option", { name: "character name" })
  ).toBeInTheDocument();
});

it("should hide overflow when game started", async () => {
  render(
    <MemoryRouter initialEntries={["/levels/1234"]}>
      <Routes>
        <Route path="/levels/:id" element={<GameLevel />} />
      </Routes>
    </MemoryRouter>
  );
  expect(document.body).toHaveStyle({ overflow: "hidden" });

  await waitFor(() => userEvent.click(screen.queryByTestId("mock-start-game")));

  expect(document.body).toHaveStyle({ overflow: "unset" });
});

it("should show loading screen when is loading", async () => {
  render(
    <MemoryRouter initialEntries={["/levels/1234"]}>
      <Routes>
        <Route path="/levels/:id" element={<GameLevel />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => userEvent.click(screen.queryByTestId("mock-start-game")));

  expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
});

// will implement later
it.todo("when game ends, interval should be cleared");
it.todo("when character is found, remove from dropdown list");
