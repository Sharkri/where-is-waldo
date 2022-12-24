import formatTimeDuration from "../formatTimeDuration";

const secondsToMs = (seconds) => seconds * 1000;
const minsToMs = (mins) => secondsToMs(mins * 60);
const hoursToMs = (hours) => minsToMs(hours * 60);

it("should omit all time units that are zero expect minutes and seconds", () => {
  const timeTaken = secondsToMs(0.1);
  expect(formatTimeDuration(timeTaken)).toBe("0m 00s 100ms");
});

it("should work when time is 0", () => {
  const timeTaken = 0;
  expect(formatTimeDuration(timeTaken)).toBe("0ms");
});

it("should show ms if ms is not zero", () => {
  const timeTaken = secondsToMs(24.25);
  expect(formatTimeDuration(timeTaken)).toBe("0m 24s 250ms");
});

it("should work for long date", () => {
  const timeTaken = hoursToMs(48) + secondsToMs(24.025) + minsToMs(15);
  expect(formatTimeDuration(timeTaken)).toBe("2d 15m 24s 25ms");
});

it("should add a leading zero to seconds", () => {
  const timeTaken = secondsToMs(9);
  expect(formatTimeDuration(timeTaken)).toBe("0m 09s");
});
