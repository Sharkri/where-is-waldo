import { formatDuration, intervalToDuration } from "date-fns";

// Pads leading zero
const zeroPad = (num) => num.toString().padStart(2, "0");

function toTimeUnitAbbreviation(duration) {
  return duration
    .replace(/ seconds| second/, "s")
    .replace(/ minutes| minute/, "m")
    .replace(/ hours| hour/, "h")
    .replace(/ days| day/, "d")
    .replace(/ months| month/, "mo")
    .replace(/ years| year/, "y");
}

function filterZeroUnits(duration, ...excludedUnits) {
  const filteredDuration = { ...duration };
  Object.keys(filteredDuration).forEach((unit) => {
    if (excludedUnits.includes(unit)) return;
    if (filteredDuration[unit] === 0) delete filteredDuration[unit];
  });
  return filteredDuration;
}

function getNumber(num) {
  // Replace all non-digit characters
  return num.replace(/\D/g, "");
}

function findDurationIndexByTimeUnit(durations, timeUnit) {
  return durations.findIndex((time) => {
    const unit = time.at(-1);
    return unit === timeUnit;
  });
}

function padTimeUnitWithZero(time, timeUnit) {
  const durations = time.split(" ");
  const durationIndex = findDurationIndexByTimeUnit(durations, timeUnit);
  // remove time unit to get raw number and then pad with leading zero
  const zeroPaddedDuration = zeroPad(getNumber(durations[durationIndex]));
  // re-add time unit
  durations[durationIndex] = `${zeroPaddedDuration}${timeUnit}`;
  return durations.join(" ");
}

export default function formatTimeDuration(start, end) {
  const timeElapsed = end - start;
  if (timeElapsed === 0) return "0ms";

  let duration = filterZeroUnits(
    intervalToDuration({ start, end }),
    "minutes",
    "seconds"
  );
  // delete all zero units except excluded (minutes and seconds)
  duration = filterZeroUnits(duration, "minutes", "seconds");

  let formattedDuration = formatDuration(duration, { zero: true });
  // abbreviate time units
  formattedDuration = toTimeUnitAbbreviation(formattedDuration);
  // pad second(s) with a leading zero. e.g.: 5s becomes 05s
  formattedDuration = padTimeUnitWithZero(formattedDuration, "s");
  // formatDuration doesn't add milliseconds so have to add it manually
  const ms = Number.parseInt(timeElapsed % 1000, 10);
  if (ms !== 0) formattedDuration += ` ${ms}ms`;
  return formattedDuration;
}
