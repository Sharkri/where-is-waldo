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

const getLevels = async () => {
  const levels = await getCollectionDocs("/levels");

  // Fetch level images
  return Promise.all(
    levels.map(async (level) => {
      const newLevel = level;
      // Fetch game level image
      newLevel.photo = await getImage(level.photo);
      newLevel.characters = await Promise.all(
        newLevel.characters.map(async (character) =>
          // Set character image to fetched one
          Object.assign(character, { photo: getImage(character.photo) })
        )
      );

      return newLevel;
    })
  );
};

export default getLevels;
