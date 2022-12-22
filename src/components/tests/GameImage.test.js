import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import GameImage from "../GameImage";
import "@testing-library/jest-dom";

const onImageClick = jest.fn();
const foundList = [
  { x: 2, y: 5, id: 22412 },
  { x: 53, y: 69, id: 12345 },
];

it("should show image", () => {
  render(
    <GameImage
      photo="test.png"
      name="test name"
      onImageClick={onImageClick}
      foundList={foundList}
    />
  );

  expect(screen.getByRole("button", { name: "test name" })).toHaveAttribute(
    "src",
    "test.png"
  );
});

it("should call onImageClick", () => {
  render(
    <GameImage
      photo="test.png"
      name="test name"
      onImageClick={onImageClick}
      foundList={foundList}
    />
  );

  userEvent.click(screen.getByRole("button", { name: "test name" }));

  expect(onImageClick).toHaveBeenCalledTimes(1);
});

it("should display a circle at each found item", () => {
  render(
    <GameImage
      photo="test.png"
      name="test name"
      onImageClick={onImageClick}
      foundList={foundList}
    />
  );

  const circles = screen.getAllByTestId("circle");

  expect(circles).toHaveLength(2);

  expect(circles[0].style.left).toBe("2px");
  expect(circles[0].style.top).toBe("5px");
  expect(circles[1].style.left).toBe("53px");
  expect(circles[1].style.top).toBe("69px");
});
