import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import GameEnd from "../GameEnd";
import submitToLeaderboard from "../../helper/submitToLeaderboard";

jest.mock("../../helper/formatTimeDuration.js", () =>
  jest.fn((start, end) => end - start)
);

jest.mock("../../helper/submitToLeaderboard.js", () => jest.fn());

const mockLevel = {
  id: "foobar",
  leaderboard: [{ name: "baz", start: 1000, end: 2000 }],
};

it("should show time taken", () => {
  render(
    <GameEnd start={new Date(250)} end={new Date(1000)} level={mockLevel} />
  );
  expect(screen.getByText("You finished in 750!"));
});

it("renders correct input values and submits properly", () => {
  render(
    <GameEnd start={new Date(250)} end={new Date(1000)} level={mockLevel} />
  );
  userEvent.type(screen.getByRole("textbox"), "jimmy");
  expect(screen.getByRole("textbox")).toHaveValue("jimmy");

  userEvent.click(screen.getByRole("button", { name: /Submit Score/i }));
  // should be called with id and the new value
  expect(submitToLeaderboard).toHaveBeenCalledWith(
    "foobar",
    expect.objectContaining({
      id: "foobar",
      leaderboard: [
        { name: "baz", start: 1000, end: 2000 },
        { name: "jimmy", start: new Date(250), end: new Date(1000) },
      ],
    })
  );
});
