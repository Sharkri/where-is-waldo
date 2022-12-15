import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import userEvent from "@testing-library/user-event";
import PhotoLevel from "../PhotoLevel";

const onClickMock = jest.fn();

it("should show photo and level name", () => {
  const levelName = "insert level name here";
  const levelSrc = "./dummy.png";
  render(
    <PhotoLevel name={levelName} photo={levelSrc} onClick={onClickMock} />
  );

  const img = screen.getByRole("img", { name: levelName });
  expect(img).toHaveAttribute("src", levelSrc);
  expect(screen.getByText("insert level name here")).toBeInTheDocument();
});

it("should call onClick", () => {
  render(
    <PhotoLevel
      name="level name or something"
      photo="./img.png"
      onClick={onClickMock}
    />
  );
  expect(onClickMock).not.toBeCalled();

  const levelButton = screen.getByRole("button");
  userEvent.click(levelButton);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});

describe("bad inputs", () => {
  beforeEach(() => jest.spyOn(console, "error"));
  afterEach(() => expect(console.error).toBeCalled());

  it("should warn for level name", () => {
    const levelName = ["NOT A STRING LOL", "ALSO NOT A STRING"];
    const levelSrc = "./image.png";

    render(<PhotoLevel name={levelName} photo={levelSrc} />);
  });

  it("should warn for level src", () => {
    const levelName = "actually a string";
    const levelSrc = () => "not an image src!!";

    render(<PhotoLevel name={levelName} photo={levelSrc} />);
  });

  it("should warn for onClick", () => {
    const levelName = "also a string";
    const levelSrc = "./image.png";
    const onClick = "not a function lol";

    render(<PhotoLevel name={levelName} photo={levelSrc} onClick={onClick} />);
  });
});
