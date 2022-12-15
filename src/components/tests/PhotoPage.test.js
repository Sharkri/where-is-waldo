/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import PhotoPage from "../PhotoPage";

jest.mock("../Characters.js", () => ({ characters }) => (
  <div data-testid="characters">{JSON.stringify(characters)}</div>
));

const onClickMock = jest.fn();

const photo = { src: "./photo.png", alt: "photo" };
const characters = [
  { name: "Mario", photo: "./mario.png" },
  { name: "Luigi", photo: "./luigi.png" },
];

it("should render background photo", () => {
  render(
    <PhotoPage photo={photo} characters={characters} onClick={onClickMock} />
  );

  const image = screen.getByRole("img", { name: "photo" });
  expect(image).toHaveAttribute("src", "./photo.png");
});

it("should pass in correct params to characters component", () => {
  render(
    <PhotoPage photo={photo} characters={characters} onClick={onClickMock} />
  );

  expect(JSON.parse(screen.getByTestId("characters").textContent)).toEqual(
    characters
  );
});

// will implement later
it.todo("call onClick");
