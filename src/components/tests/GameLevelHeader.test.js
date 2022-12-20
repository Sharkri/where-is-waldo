/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import GameLevelHeader from "../GameLevelHeader";

jest.mock("../Character.js", () => ({ character }) => (
  <div>{character.name}</div>
));

jest.mock(
  "../Header.js",
  () =>
    ({ children }) =>
      children
);

jest.mock("../GameTimer.js", () => ({ startTime, currentTime }) => (
  <div data-testid="start-end-time">
    {startTime} {currentTime}
  </div>
));

const mockCharacters = [
  { name: "Sonic", photo: "sonic.jpg", id: 0 },
  { name: "test", photo: "test.png", id: 1 },
];

it("should toggle open/close characters dropdown", () => {
  render(
    <GameLevelHeader
      characters={mockCharacters}
      startTime={0}
      currentTime={0}
    />
  );

  userEvent.click(screen.getByRole("button", { name: "open characters list" }));

  const charactersList = screen.getByRole("list");

  expect(charactersList.children.length).toBe(2);
  expect(charactersList.children[0].textContent).toBe("Sonic");
  expect(charactersList.children[1].textContent).toBe("test");

  userEvent.click(screen.getByRole("button", { name: "open characters list" }));

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

it("should render game timer", () => {
  render(
    <GameLevelHeader
      characters={mockCharacters}
      startTime={552}
      currentTime={12344}
    />
  );

  expect(screen.getByTestId("start-end-time").textContent).toBe("552 12344");
});
