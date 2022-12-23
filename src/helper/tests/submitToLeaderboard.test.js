import { updateCollectionDoc } from "../../backend/backend";
import submitToLeaderboard from "../submitToLeaderboard";

jest.mock("../../backend/backend.js", () => ({
  updateCollectionDoc: jest.fn(),
}));

it("should update level leaderboard", () => {
  const mockId = "abc123";
  const mockLeaderboardSubmission = { name: "John", id: "321cba" };
  submitToLeaderboard(mockId, mockLeaderboardSubmission);
  expect(updateCollectionDoc).toHaveBeenCalledWith(
    "/levels/abc123",
    mockLeaderboardSubmission
  );
});
