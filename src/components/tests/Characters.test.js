/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
import React from "react";
import { render, screen } from "@testing-library/react";
import Characters from "../Characters";

jest.mock("../Character.js", () => ({ character }) => (
  <div data-testid="character">
    {character.name} {character.photo}
  </div>
));

it("should display multiple characters", () => {
  const characters = [
    { name: "Yoshi", photo: "yoshi.jpg" },
    { name: "Bowser", photo: "bowser_image.avif" },
  ];

  render(<Characters characters={characters} />);

  const domCharacters = screen.getAllByTestId("character");

  expect(domCharacters[0].textContent).toBe("Yoshi yoshi.jpg");
  expect(domCharacters[1].textContent).toBe("Bowser bowser_image.avif");
});
