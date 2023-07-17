import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import LevelPreviewCard from "../LevelPreviewCard";

const mockLevel = {
  name: "insert level name here",
  photo: "./dummy.png",
  id: 0,
  characters: [
    { photo: "john.png", id: 12345 },
    { photo: "doe.jpg", id: 54321 },
  ],
};

it("should show photo, characters, and level name", () => {
  render(
    <MemoryRouter>
      <LevelPreviewCard level={mockLevel} showCharacters />
    </MemoryRouter>
  );

  const img = screen.getByRole("img", { name: mockLevel.name });

  expect(img).toHaveAttribute("src", mockLevel.photo);
  expect(screen.getByText("insert level name here")).toBeInTheDocument();

  const characters = screen.getAllByRole("img", { name: "character" });
  expect(characters[0]).toHaveAttribute("src", "john.png");
  expect(characters[1]).toHaveAttribute("src", "doe.jpg");
});

it("should not show characters", () => {
  render(
    <MemoryRouter>
      <LevelPreviewCard level={mockLevel} showCharacters={false} />
    </MemoryRouter>
  );

  expect(
    screen.queryByRole("img", { name: "character" })
  ).not.toBeInTheDocument();
});
