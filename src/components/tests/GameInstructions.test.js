/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameInstructions from "../GameInstructions";
import "@testing-library/jest-dom";

jest.mock("../Characters.js", () => ({ characters }) => (
  <div data-testid="characters">{JSON.stringify(characters)}</div>
));

const fakeLevel = {
  name: "Fake Level",
  photo: "fake-level.png",
  characters: [
    {
      name: "Fake Character",
      photo: "fake-photo.png",
      id: 0,
    },
  ],
  id: 0,
};

const mockOnStart = jest.fn();

it("should call onClick when start game is clicked", () => {
  render(<GameInstructions level={fakeLevel} onStart={mockOnStart} />);

  expect(mockOnStart).not.toBeCalled();

  userEvent.click(screen.getByRole("button", { name: /Start Game/i }));

  expect(mockOnStart).toHaveBeenCalledTimes(1);
});

it("should render level title and photo", () => {
  render(<GameInstructions level={fakeLevel} onStart={mockOnStart} />);

  expect(
    screen.getByRole("heading", { name: "Fake Level" })
  ).toBeInTheDocument();

  expect(screen.getByRole("img", { name: "Fake Level" })).toHaveAttribute(
    "src",
    "fake-level.png"
  );
});

it("should pass in correct props to characters component", () => {
  render(<GameInstructions level={fakeLevel} onStart={mockOnStart} />);

  expect(JSON.parse(screen.getByTestId("characters").textContent)).toEqual(
    fakeLevel.characters
  );
});
