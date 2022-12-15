import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import PhotoLevel from "../PhotoLevel";

const mockLevel = {
  name: "insert level name here",
  photo: "./dummy.png",
  id: 0,
};

it("should show photo and level name", () => {
  render(
    <MemoryRouter>
      <PhotoLevel level={mockLevel} />
    </MemoryRouter>
  );

  const img = screen.getByRole("img", { name: mockLevel.name });
  expect(img).toHaveAttribute("src", mockLevel.photo);
  expect(screen.getByText("insert level name here")).toBeInTheDocument();
});

it("renders correct link", () => {
  render(
    <MemoryRouter>
      <PhotoLevel level={mockLevel} />
    </MemoryRouter>
  );

  const link = screen.getByRole("link", { name: "link to level" });
  expect(link).toHaveAttribute("href", "/levels/0");
});

describe("bad inputs", () => {
  beforeEach(() => jest.spyOn(console, "error"));
  afterEach(() => expect(console.error).toBeCalled());

  it("should warn for level name", () => {
    const level = {
      name: ["NOT A STRING LOL", "ALSO NOT A STRING"],
      photo: "./image.png",
      id: 0,
    };

    render(
      <MemoryRouter>
        <PhotoLevel level={level} />
      </MemoryRouter>
    );
  });

  it("should warn for level src", () => {
    const level = {
      name: "actually a string",
      photo: () => "not an image src!!",
      id: 0,
    };

    render(
      <MemoryRouter>
        <PhotoLevel level={level} />
      </MemoryRouter>
    );
  });

  it("should give warning for id that isn't of type string nor number", () => {
    const level = {
      name: "also actually a string",
      photo: "./image.png",
      id: () => {},
    };

    render(
      <MemoryRouter>
        <PhotoLevel level={level} />
      </MemoryRouter>
    );
  });
});
