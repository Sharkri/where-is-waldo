/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import GameLevel from "../GameLevel";
import CharactersDropdown from "../CharactersDropdown";
import GameInstructions from "../GameInstructions";
import GameLevelHeader from "../GameLevelHeader";
import getLevelById from "../../helper/getLevelById";

jest.mock("../CharactersDropdown.js", () =>
  jest.fn(() => <div data-testid="CharactersDropdown" />)
);

jest.mock("../GameEnd.js", () => jest.fn());

jest.mock("../LoadingScreen.js", () => () => <div>Loading...</div>);
jest.mock("../PageNotFound.js", () => () => <div>page not found</div>);
jest.mock("../../helper/getLevelById.js", () =>
  jest.fn((id) =>
    Promise.resolve({
      photo: "fake_level.png",
      name: "fake level",
      id,
      characters: [
        {
          name: "character name",
          photo: "johndoe.png",
          id: 0,
          coords: { x: { start: 25, end: 26 }, y: { start: 64, end: 69 } },
        },
      ],
    })
  )
);

jest.mock("../GameInstructions.js", () =>
  jest.fn(({ onStart }) => (
    <div data-testid="instructions">
      <button type="button" onClick={onStart} data-testid="mock-start-game">
        start game
      </button>
    </div>
  ))
);

jest.mock("../GameLevelHeader.js", () =>
  jest.fn(({ timeTaken }) => <div data-testid="time-elapsed">{timeTaken}</div>)
);

jest.mock("../GameImage.js", () =>
  jest.fn(({ onImageClick, photo, name }) => (
    <input type="image" src={photo} alt={name} onClick={onImageClick} />
  ))
);

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

  await waitFor(() => screen.getByTestId("instructions"));

  expect(GameInstructions).toBeCalledWith(
    expect.objectContaining({
      level: expect.objectContaining({
        name: "fake level",
        id: 1234,
      }),
    }),
    expect.anything()
  );
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

it("should display characters in header", async () => {
  render(
    <MemoryRouter initialEntries={["/levels/0"]}>
      <Routes>
        <Route path="/levels/:id" element={<GameLevel />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(GameLevelHeader).toHaveBeenCalledWith(
      expect.objectContaining({
        characters: expect.arrayContaining([
          expect.objectContaining({
            name: "character name",
            photo: "johndoe.png",
            id: 0,
          }),
        ]),
      }),
      expect.anything()
    );
  });
});

describe("Characters Dropdown", () => {
  it("should toggle open dropdown", async () => {
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
    expect(screen.queryByTestId("CharactersDropdown")).not.toBeInTheDocument();

    const gameImage = screen.getByRole("button", { name: /fake level/i });

    const [mockX, mockY] = [50, 34];

    // Click at coordinates (50, 34)
    userEvent.click(gameImage, {
      clientX: mockX,
      clientY: mockY,
    });

    // Dropdown should now be appearing
    expect(screen.getByTestId("CharactersDropdown")).toBeInTheDocument();
    // Should also be called with correct stuff
    expect(CharactersDropdown).toBeCalledWith(
      expect.objectContaining({
        coordinates: { x: mockX, y: mockY },
        containerSize: { height: 0, width: 0 },
        characters: expect.arrayContaining([
          expect.objectContaining({
            name: "character name",
            photo: "johndoe.png",
            id: 0,
          }),
        ]),
      }),
      expect.anything()
    );

    // Should toggle close dropdown
    userEvent.click(gameImage);
    expect(screen.queryByTestId("CharactersDropdown")).not.toBeInTheDocument();
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
  expect(screen.queryByTestId("CharactersDropdown")).not.toBeInTheDocument();
  // Game has started!
  userEvent.click(screen.getByTestId("mock-start-game"));
  // Attempt to open the list of possible characters again
  userEvent.click(screen.queryByRole("button", { name: "fake level" }));
  // Now dropdown should be able to appear
  expect(screen.getByTestId("CharactersDropdown")).toBeInTheDocument();
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

it("should show page not found when initialEntries is a not found level", async () => {
  getLevelById.mockImplementation(() => {
    throw new Error("No level found");
  });

  render(
    <MemoryRouter initialEntries={["/levels/not-found-level"]}>
      <Routes>
        <Route path="/levels/:id" element={<GameLevel />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() =>
    expect(screen.getByText("page not found")).toBeInTheDocument()
  );
});
