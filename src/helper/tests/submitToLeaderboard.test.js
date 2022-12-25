import { pushToDocArray } from "../../backend/backend";
import submitToLeaderboard from "../submitToLeaderboard";

jest.mock("../../backend/backend.js", () => ({
  pushToDocArray: jest.fn(),
}));

it("should update level leaderboard", () => {
  const mockId = "abc123";
  const mockLeaderboardSubmission = { name: "John", id: "321cba" };
  submitToLeaderboard(mockId, mockLeaderboardSubmission);

  expect(pushToDocArray).toHaveBeenCalledWith(
    "/levels/abc123",
    "leaderboard",
    mockLeaderboardSubmission
  );
});
