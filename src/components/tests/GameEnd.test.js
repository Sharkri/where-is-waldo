import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import GameEnd from "../GameEnd";
import submitToLeaderboard from "../../helper/submitToLeaderboard";
import getLevelById from "../../helper/getLevelById";

jest.mock("../../helper/formatTimeDuration.js", () =>
  jest.fn((start, end) => end - start)
);

jest.mock("../../helper/submitToLeaderboard.js", () => jest.fn());

jest.mock("../../helper/getLevelById.js", () => jest.fn());

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const mockLevel = {
  id: "foobar",
  leaderboard: [
    {
      name: "baz",
      startTime: 1000,
      endTime: 2000,
      dateSubmitted: 52,
      place: 1,
    },
  ],
};

it("should show time taken", () => {
  render(
    <GameEnd
      startTime={new Date(250)}
      endTime={new Date(1000)}
      levelId={mockLevel.id}
    />
  );
  expect(screen.getByText("You finished in 750!"));
});

it("renders correct input values and submits properly", async () => {
  getLevelById.mockReturnValue(Promise.resolve(mockLevel));
  Date.now = () => 12345;
  render(
    <GameEnd
      startTime={new Date(250)}
      endTime={new Date(1000)}
      levelId={mockLevel.id}
    />
  );
  userEvent.type(screen.getByRole("textbox"), "jimmy");
  expect(screen.getByRole("textbox")).toHaveValue("jimmy");

  // Submit score
  await waitFor(() =>
    userEvent.click(screen.getByRole("button", { name: /Submit Score/i }))
  );
  // should be called with id and the new value
  expect(submitToLeaderboard).toHaveBeenCalledWith(
    "foobar",
    expect.objectContaining({
      id: "foobar",
      leaderboard: [
        {
          name: "baz",
          startTime: 1000,
          endTime: 2000,
          dateSubmitted: 52,
          place: 1,
        },
        {
          name: "jimmy",
          startTime: new Date(250),
          endTime: new Date(1000),
          dateSubmitted: 12345,
          place: 2,
        },
      ],
    })
  );
  // navigates to leaderboard after finish
  expect(mockNavigate).toBeCalledWith("/leaderboard");
});
