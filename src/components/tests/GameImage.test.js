import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import GameImage from "../GameImage";
import "@testing-library/jest-dom";

const onImageClick = jest.fn();
const foundList = [
  { x: 2, y: 5, id: 22412, name: "bob" },
  { x: 53, y: 69, id: 12345, name: "robert" },
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

it("should display found items", () => {
  render(
    <GameImage
      photo="test.png"
      name="test name"
      onImageClick={onImageClick}
      foundList={foundList}
    />
  );

  const found = screen.getAllByTestId("found-item");

  expect(found).toHaveLength(2);

  expect(found[0].style.left).toBe("2px");
  expect(found[0].style.top).toBe("5px");
  expect(found[0]).toHaveTextContent("bob");

  expect(found[1].style.left).toBe("53px");
  expect(found[1].style.top).toBe("69px");
  expect(found[1]).toHaveTextContent("robert");
});
