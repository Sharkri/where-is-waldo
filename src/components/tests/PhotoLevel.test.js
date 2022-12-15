import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import userEvent from "@testing-library/user-event";
import PhotoLevel from "../PhotoLevel";

const onClickMock = jest.fn();

it("should show photo and level name", () => {
  const level = { name: "insert level name here", photo: "./dummy.png" };

  render(<PhotoLevel level={level} onClick={onClickMock} />);

  const img = screen.getByRole("img", { name: level.name });
  expect(img).toHaveAttribute("src", level.photo);
  expect(screen.getByText("insert level name here")).toBeInTheDocument();
});

it("should call onClick", () => {
  const level = { name: "level name or something", photo: "./img.png" };

  render(<PhotoLevel level={level} onClick={onClickMock} />);
  expect(onClickMock).not.toBeCalled();

  const levelButton = screen.getByRole("button");
  userEvent.click(levelButton);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});

describe("bad inputs", () => {
  beforeEach(() => jest.spyOn(console, "error"));
  afterEach(() => expect(console.error).toBeCalled());

  it("should warn for level name", () => {
    const level = {
      name: ["NOT A STRING LOL", "ALSO NOT A STRING"],
      photo: "./image.png",
    };

    render(<PhotoLevel level={level} onClick={onClickMock} />);
  });

  it("should warn for level src", () => {
    const level = {
      name: "actually a string",
      photo: () => "not an image src!!",
    };

    render(<PhotoLevel level={level} onClick={onClickMock} />);
  });

  it("should warn for onClick", () => {
    const level = {
      name: "also actually a string",
      photo: "./image.png",
    };
    const onClick = "not a function lol";

    render(<PhotoLevel level={level} onClick={onClick} />);
  });
});
