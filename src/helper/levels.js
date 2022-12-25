import { getCollectionDocs, getImage } from "../backend/backend";

async function loadLevelPhotos(level) {
  const newLevel = level;
  // Fetch game level image
  newLevel.photo = await getImage(level.photo);

  newLevel.characters = await Promise.all(
    newLevel.characters.map(async (character) =>
      // Set character image
      Object.assign(character, { photo: await getImage(character.photo) })
    )
  );

  return newLevel;
}

const getLevels = async () => {
  const levels = await getCollectionDocs("/levels");
  return Promise.all(levels.map(loadLevelPhotos));
};

export default getLevels;
