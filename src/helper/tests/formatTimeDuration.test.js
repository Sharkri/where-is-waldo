import formatTimeDuration from "../formatTimeDuration";

const secondsToMs = (seconds) => seconds * 1000;
const minsToMs = (mins) => secondsToMs(mins * 60);
const hoursToMs = (hours) => minsToMs(hours * 60);

it("should omit all time units that are zero expect minutes and seconds", () => {
  const startDate = 0;
  const endDate = secondsToMs(0.1);
  expect(formatTimeDuration(startDate, endDate)).toBe("0m 00s 100ms");
});

it("should work when time is 0", () => {
  const [startDate, endDate] = [0, 0];
  expect(formatTimeDuration(startDate, endDate)).toBe("0ms");
});

it("should show ms if ms is not zero", () => {
  const startDate = 0;
  const endDate = secondsToMs(24.25);
  expect(formatTimeDuration(startDate, endDate)).toBe("0m 24s 250ms");
});

it("should work for long date", () => {
  const startDate = 0;
  const endDate = hoursToMs(48) + secondsToMs(24.025) + minsToMs(15);
  expect(formatTimeDuration(startDate, endDate)).toBe("2d 15m 24s 25ms");
});

it("should add a leading zero to seconds", () => {
  const startDate = 0;
  const endDate = secondsToMs(9);
  expect(formatTimeDuration(startDate, endDate)).toBe("0m 09s");
});

it("should work when start date is not zero", () => {
  const startDate = hoursToMs(24);
  const endDate = startDate + minsToMs(5);
  expect(formatTimeDuration(startDate, endDate)).toBe("5m 00s");
});
