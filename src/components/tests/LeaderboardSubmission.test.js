import { render, screen } from "@testing-library/react";
import React from "react";
import LeaderboardSubmission from "../LeaderboardSubmission";
import "@testing-library/jest-dom";

it("should display place, name, time, and date of submission", () => {
  const leaderboardSubmission = {
    place: 129,
    name: "Alice",
    time: 222225,
    date: new Date("69/4/20"),
  };
  render(<LeaderboardSubmission submission={leaderboardSubmission} />);
  expect(screen.getByText("129")).toBeInTheDocument();
  expect(screen.getByText("Alice")).toBeInTheDocument();
  //   TODO: check time
});
