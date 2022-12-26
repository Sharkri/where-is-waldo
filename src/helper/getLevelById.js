import getLevels from "./levels";

export default async function getLevelById(id) {
  const levels = await getLevels();
  const level = levels.find((lvl) => lvl.id === id);
  if (!level) throw new Error("No level found");
  return level;
}
