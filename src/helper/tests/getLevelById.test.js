import getLevelById from "../getLevelById";

jest.mock("../../levels.js", () => [
  { id: 0, name: "first one" },
  { id: 1, name: "number 2" },
  { id: 2, name: "3rd one" },
]);

it("should get level by id", () => {
  expect(getLevelById(0).name).toBe("first one");
  expect(getLevelById(1).name).toBe("number 2");
  expect(getLevelById(2).name).toBe("3rd one");
});
