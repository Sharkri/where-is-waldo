import getLevels from "../levels";

jest.mock("../../backend/backend.js", () => ({
  getCollectionDocs: (collectionName) => collectionName,
}));

it("should fetch the correct collection docs", async () => {
  expect(await getLevels()).toBe("/levels");
});
