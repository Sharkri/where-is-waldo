import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Character from "../Character";

it("should display a character", () => {
  const character = { name: "yoshi", photo: "yoshi.png" };
  render(<Character character={character} />);

  const image = screen.getByRole("img", { name: "yoshi" });
  expect(image).toHaveAttribute("src", "yoshi.png");

  expect(screen.getByText("yoshi")).toBeInTheDocument();
});
