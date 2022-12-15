import levels from "../levels";

export default function getLevelById(id) {
  return levels.find((level) => level.id === id);
}
