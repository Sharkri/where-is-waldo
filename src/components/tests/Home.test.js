/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "../Home";

jest.mock("../../levels.js", () => [
  { name: "cool level", photo: "cool-level.png", id: 0 },
  { name: "awesome level", photo: "awesome-level.png", id: 1 },
]);

jest.mock("../PhotoLevel.js", () => ({ name, photo }) => (
  <div data-testid="photo-level">
    {name} {photo}
  </div>
));

it("should map through levels properly", () => {
  render(<Home />);

  const levels = screen.getAllByTestId("photo-level");

  expect(levels.length).toBe(2);
  expect(levels[0].textContent).toBe("cool level cool-level.png");
  expect(levels[1].textContent).toBe("awesome level awesome-level.png");
});

it.todo("test onclick");
