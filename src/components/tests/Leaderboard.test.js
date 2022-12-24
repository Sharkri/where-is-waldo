import { render, screen } from "@testing-library/react";
import React from "react";
import useLevels from "../../helper/useLevels";
import Leaderboard from "../Leaderboard";

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

jest.mock("../../helper/useLevels.js", () => jest.fn());

it("should render a list of leaderboard submissions", () => {
  useLevels.mockReturnValueOnce([
    {
      place: 1,
      name: "Alice",
      startTime: new Date(0),
      endTime: new Date(12345),
      dateSubmitted: new Date("1/2/1970"),
      id: 1,
    },
    {
      place: 2,
      name: "John",
      startTime: new Date(0),
      endTime: new Date(12346),
      dateSubmitted: new Date("1/2/1971"),
      id: 2,
    },
    {
      place: 3,
      name: "Bob",
      startTime: new Date(0),
      endTime: new Date(12347),
      dateSubmitted: new Date("1/2/1991"),
      id: 3,
    },
  ]);

  render(<Leaderboard />);

  const submissions = screen.getAllByTestId("submission");

  expect(submissions.length).toBe(3);
  expect(submissions[0].textContent).toBe("Alice");
  expect(submissions[1].textContent).toBe("John");
  expect(submissions[2].textContent).toBe("Bob");
});
