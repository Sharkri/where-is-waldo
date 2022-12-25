/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import useLevels from "../../helper/useLevels";
import Leaderboard from "../Leaderboard";
import LeaderboardTable from "../LeaderboardTable";
import LevelPreviewCard from "../LevelPreviewCard";

jest.mock("../LeaderboardTable.js", () => jest.fn());
jest.mock("../LevelPreviewCard.js", () => jest.fn());
jest.mock("../../helper/useLevels.js", () => jest.fn());

it("should render level preview cards", () => {
  useLevels.mockReturnValueOnce([{ name: "test level", id: 1 }]);

  render(<Leaderboard />);

  expect(LevelPreviewCard).toHaveBeenCalledWith(
    {
      level: expect.objectContaining({ name: "test level", id: 1 }),
    },
    expect.anything()
  );
});

it("should display leaderboard table", async () => {
  useLevels.mockReturnValue([
    {
      leaderboard: [{ name: "Alice" }, { name: "John" }],
      name: "test level",
      id: 1,
    },

    {
      leaderboard: [{ name: "Robert" }, { name: "Jones" }],
      name: "test level 2",
      id: 2,
    },
  ]);

  render(<Leaderboard />);

  // click on second level
  const secondLevel = screen.getAllByRole("button", { name: "level" })[1];

  userEvent.click(secondLevel);

  expect(secondLevel).toHaveAttribute("data-isactive", "true");
  expect(LeaderboardTable).toHaveBeenCalledWith(
    { leaderboard: [{ name: "Robert" }, { name: "Jones" }] },
    expect.anything()
  );
});
