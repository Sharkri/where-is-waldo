import { getImage } from "../backend/backend";
import getLevels from "./levels";

export default async function getLevelById(id) {
  const levels = await getLevels();
  const level = levels.find((lvl) => lvl.id === id);
  level.photo = await getImage(level.photo);
  return level;
}
