import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import CharactersDropdown from "../CharactersDropdown";
import Dropdown from "../Dropdown";

jest.mock("../Dropdown.js", () => jest.fn(({ children }) => children));

const testCharacters = [
  { name: "character1", photo: "c1.png", id: 0, found: true },
  { name: "character2", photo: "c2.png", id: 1 },
];

const mockOnCharacterClick = jest.fn((e) => e.preventDefault());

const coordinatesMock = { x: 52, y: 24 };
const containerSize = { height: 125, width: 460 };

it("should only show characters not found yet", () => {
  render(
    <CharactersDropdown
      characters={testCharacters}
      onCharacterClick={mockOnCharacterClick}
      coordinates={coordinatesMock}
      containerSize={containerSize}
    />
  );

  expect(screen.queryByText("character1")).not.toBeInTheDocument();
  expect(screen.getByText("character2")).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "character" })).toHaveAttribute(
    "src",
    "c2.png"
  );
});

it("should call onCharacterClick", () => {
  render(
    <CharactersDropdown
      characters={testCharacters}
      onCharacterClick={mockOnCharacterClick}
      coordinates={coordinatesMock}
      containerSize={containerSize}
    />
  );

  userEvent.click(screen.getByText("character2"));
  expect(mockOnCharacterClick).toHaveBeenCalledTimes(1);
});

it("should render dropdown correctly", () => {
  render(
    <CharactersDropdown
      characters={testCharacters}
      onCharacterClick={mockOnCharacterClick}
      coordinates={coordinatesMock}
      containerSize={containerSize}
    />
  );

  // Validate that dropdown is given these props
  expect(Dropdown).toHaveBeenCalledWith(
    expect.objectContaining({
      x: 52,
      y: 24,
      containerSize: { height: 125, width: 460 },
    }),
    expect.anything()
  );
});
