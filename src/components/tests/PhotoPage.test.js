/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PhotoPage from "../PhotoPage";

jest.mock("../Characters.js", () => ({ characters }) => (
  <div data-testid="characters">{JSON.stringify(characters)}</div>
));

jest.mock("../../levels.js", () => [
  { id: 0 },
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

it.only("should get correct level based on initial entry", () => {
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

// will implement later
it.todo("call onClick");
