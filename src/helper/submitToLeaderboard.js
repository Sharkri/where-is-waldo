import { updateCollectionDoc } from "../backend/backend";

export default function submitToLeaderboard(id, submission) {
  return updateCollectionDoc(`/levels/${id}`, submission);
}
