import { pushToDocArray } from "../backend/backend";

export default function submitToLeaderboard(id, submission) {
  return pushToDocArray(`/levels/${id}`, "leaderboard", submission);
}
