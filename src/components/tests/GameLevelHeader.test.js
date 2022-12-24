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

jest.mock("../GameTimer.js", () => ({ timeTaken }) => (
  <div data-testid="time-taken">{timeTaken}</div>
));

const mockCharacters = [
  { name: "Sonic", photo: "sonic.jpg", id: 0, found: true },
  { name: "test", photo: "test.png", id: 1 },
];

it("should toggle open/close characters dropdown", () => {
  render(<GameLevelHeader characters={mockCharacters} timeTaken={0} />);

  userEvent.click(screen.getByRole("button", { name: "1" }));

  const charactersList = screen.getByRole("list");

  expect(charactersList.children.length).toBe(2);
  expect(charactersList.children[0].textContent).toBe("Sonic");
  expect(charactersList.children[0]).toHaveAttribute("data-found", "true");
  expect(charactersList.children[1].textContent).toBe("test");
  expect(charactersList.children[1]).toHaveAttribute("data-found", "false");

  userEvent.click(screen.getByRole("button", { name: "1" }));

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

it("should render game timer", () => {
  render(<GameLevelHeader characters={mockCharacters} timeTaken={1234} />);

  expect(screen.getByTestId("time-taken").textContent).toBe("1234");
});
