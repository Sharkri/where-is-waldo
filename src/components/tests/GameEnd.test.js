import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import GameEnd from "../GameEnd";

jest.mock("../../helper/formatTimeDuration.js", () =>
  jest.fn((start, end) => end - start)
);

it("should show time taken", () => {
  render(<GameEnd start={new Date(250)} end={new Date(1000)} />);
  expect(screen.getByText("You finished in 750!"));
});

it("renders correct input values and submits properly", () => {
  render(<GameEnd start={new Date(250)} end={new Date(1000)} />);
  userEvent.type(screen.getByRole("textbox"), "hello");
  expect(screen.getByRole("textbox")).toHaveValue("hello");

  // test later...
  userEvent.click(screen.getByRole("button", { name: /Submit Score/i }));
});
