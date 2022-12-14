import getLevelById from "../getLevelById";

jest.mock(
  "../levels.js",
  () => () =>
    Promise.resolve([
      { id: 0, name: "first one", photo: "xd.png" },
      { id: 1, name: "number 2" },
      { id: 2, name: "3rd one" },
    ])
);

it("should get level by id", async () => {
  expect((await getLevelById(0)).name).toBe("first one");
  expect((await getLevelById(1)).name).toBe("number 2");
  expect((await getLevelById(2)).name).toBe("3rd one");
});

it("should get image from backend.js", async () => {
  const level = await getLevelById(0);
  expect(level.photo).toBe("xd.png");
});

it("should throw error if no level is found", async () => {
  await expect(getLevelById(12345)).rejects.toThrow("No level found");
});
