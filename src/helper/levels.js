// const levels = [
//   {
//     name: "Retro Level",
//     photo: "retro.png",
//     characters: [
//       {
//         name: "Toad",
//         photo:
//           "https://www.giantbomb.com/a/uploads/scale_medium/9/95666/1907632-new_super_mario_bros._wii_toad.png",
//         id: 0,
//       },
//       {
//         name: "Blinky",
//         photo:
//           "https://www.giantbomb.com/a/uploads/scale_small/8/87790/2469740-blinky.png",
//         id: 1,
//       },
//     ],
//     id: 0,
//   },
// ];

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
