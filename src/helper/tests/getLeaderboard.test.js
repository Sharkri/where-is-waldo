import { getDocData } from "../../backend/backend";
import getLeaderboard from "../getLeaderboard";

jest.mock("../../backend/backend.js", () => ({ getDocData: jest.fn() }));

it("should get leaderboard", async () => {
  await getLeaderboard();
  expect(getDocData).toHaveBeenCalledWith("/leaderboard");
});
