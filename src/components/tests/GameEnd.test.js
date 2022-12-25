import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import uniqid from "uniqid";
import GameEnd from "../GameEnd";
import submitToLeaderboard from "../../helper/submitToLeaderboard";
import getLevelById from "../../helper/getLevelById";
import formatTimeDuration from "../../helper/formatTimeDuration";

jest.mock("../../helper/formatTimeDuration.js", () => jest.fn());

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
      timeTaken: 4000,
      dateSubmitted: 52,
      id: 0,
    },
  ],
};

jest.mock("uniqid", () => jest.fn());

it("should show time taken", () => {
  formatTimeDuration.mockReturnValueOnce(750);
  render(<GameEnd timeTaken={new Date(750)} levelId={mockLevel.id} />);
  expect(screen.getByText("You finished in 750!"));
  expect(formatTimeDuration).toHaveBeenCalledWith(new Date(750));
});

it("renders correct input values and submits properly", async () => {
  getLevelById.mockReturnValue(Promise.resolve(mockLevel));
  Date.now = () => 12345;
  uniqid.mockReturnValueOnce("12");

  render(<GameEnd timeTaken={new Date(750)} levelId={mockLevel.id} />);
  userEvent.type(screen.getByRole("textbox"), "jimmy");
  expect(screen.getByRole("textbox")).toHaveValue("jimmy");

  // Submit score
  await waitFor(() =>
    userEvent.click(screen.getByRole("button", { name: /Submit Score/i }))
  );
  // should be called with id and the new submission
  expect(submitToLeaderboard).toHaveBeenCalledWith("foobar", {
    name: "jimmy",
    timeTaken: new Date(750),
    dateSubmitted: 12345,
    id: "12",
  });
  // navigates to leaderboard after finish
  expect(mockNavigate).toBeCalledWith("/leaderboard");
});
