import { updateCollectionDoc } from "../backend/backend";

export default function submitToLeaderboard(id, submission) {
  updateCollectionDoc(`/levels/${id}`, submission);
}
