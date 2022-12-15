/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "../Home";

jest.mock("../../levels.js", () => [
  { name: "cool level", photo: "cool-level.png", id: 0 },
  { name: "awesome level", photo: "awesome-level.png", id: 1 },
]);

jest.mock("../PhotoLevel.js", () => ({ level }) => (
  <div data-testid="photo-level">
    {level.name} {level.photo}
  </div>
));

it("should map through levels and pass in correct props", () => {
  render(<Home />);

  const levels = screen.getAllByTestId("photo-level");

  expect(levels.length).toBe(2);
  expect(levels[0].textContent).toBe("cool level cool-level.png");
  expect(levels[1].textContent).toBe("awesome level awesome-level.png");
});
