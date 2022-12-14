import { render, screen } from "@testing-library/react";
import React from "react";
import LeaderboardSubmission from "../LeaderboardSubmission";
import "@testing-library/jest-dom";

//  1 millisecond = 0.001 seconds
const secToMs = (sec) => sec * 1000;

it("should display place, name, time, and date of submission", () => {
  const leaderboardSubmission = {
    place: 129,
    name: "Alice",
    startTime: new Date(0),
    endTime: new Date(secToMs(120)), // 120 sec -> 2 mins
    dateSubmitted: new Date("1/1/1970"),
  };
  render(
    <table>
      <tbody>
        <LeaderboardSubmission submission={leaderboardSubmission} />
      </tbody>
    </table>
  );
  expect(screen.getByText("129th")).toBeInTheDocument();
  expect(screen.getByText("Alice")).toBeInTheDocument();
  expect(screen.getByText("2m 00s")).toBeInTheDocument();
  expect(screen.getByText("Jan 1, 1970"));
});
