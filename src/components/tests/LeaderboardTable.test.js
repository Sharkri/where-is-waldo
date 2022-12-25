import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import LeaderboardTable from "../LeaderboardTable";

// eslint-disable-next-line react/function-component-definition, react/prop-types
jest.mock("../LeaderboardSubmission.js", () => ({ submission }) => (
  <tr>
    <td data-testid="submission">
      {
        // eslint-disable-next-line react/prop-types
        submission.name
      }
    </td>
  </tr>
));

it("should render a list of leaderboard submissions", () => {
  const leaderboard = [
    {
      place: 1,
      name: "Alice",
      timeTaken: new Date(12345),
      dateSubmitted: new Date("1/2/1970"),
      id: 1,
    },
    {
      place: 2,
      name: "John",
      timeTaken: new Date(12346),
      dateSubmitted: new Date("1/2/1971"),
      id: 2,
    },
    {
      place: 3,
      name: "Bob",
      timeTaken: new Date(12347),
      dateSubmitted: new Date("1/2/1991"),
      id: 3,
    },
  ];

  render(<LeaderboardTable leaderboard={leaderboard} />);

  const submissions = screen.getAllByTestId("submission");

  expect(submissions.length).toBe(3);
  expect(submissions[0]).toHaveTextContent("Alice");
  expect(submissions[1]).toHaveTextContent("John");
  expect(submissions[2]).toHaveTextContent("Bob");
});

it("should render a no scores submitted message when given an empty leaderboard", async () => {
  render(<LeaderboardTable leaderboard={[]} />);

  expect(screen.getByText("No submissions yet, be the first!"));
  expect(screen.queryByRole("table")).not.toBeInTheDocument();
});

it("should render no level selected message when given undefined leaderboard", async () => {
  render(<LeaderboardTable />);

  expect(screen.getByText("No level selected."));
  expect(screen.queryByRole("table")).not.toBeInTheDocument();
});
