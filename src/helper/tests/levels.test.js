import getLevels from "../levels";
import { getImage, getCollectionDocs } from "../../backend/backend";

jest.mock("../../backend/backend.js", () => ({
  getCollectionDocs: jest.fn(),
  getImage: jest.fn(),
}));

it("should fetch the correct collection docs", async () => {
  const mockLevels = [
    {
      name: "test",
      photo: "also_a_test.png",
      characters: [{ name: "mario", photo: "mario.jpeg" }],
    },
  ];

  getCollectionDocs.mockReturnValueOnce(mockLevels);

  const levels = await getLevels();
  expect(levels).toEqual(mockLevels);

  expect(getCollectionDocs).toHaveBeenCalledWith("/levels");
  expect(getImage).toHaveBeenCalledWith("also_a_test.png");
  expect(getImage).toHaveBeenCalledWith("mario.jpeg");
});
