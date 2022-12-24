import { getDocData } from "../backend/backend";

export default function getLeaderboard() {
  return getDocData("/leaderboard");
}
