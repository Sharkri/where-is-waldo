import React from "react";
import { render, screen } from "@testing-library/react";
import { intervalToDuration } from "date-fns";
import GameTimer from "../GameTimer";

jest.mock("date-fns", () => ({ intervalToDuration: jest.fn() }));

afterEach(() => jest.resetAllMocks());

it("should call with correct params and display zero value correctly", () => {
  intervalToDuration.mockReturnValueOnce({ seconds: 0, minutes: 0 });
  render(<GameTimer timeTaken={new Date(0)} />);
  expect(intervalToDuration).toHaveBeenCalledWith({
    start: 0,
    end: new Date(0),
  });

  expect(screen.getByText("00:00:00"));
});

it("should display ms and round it up to two digits", () => {
  intervalToDuration.mockReturnValueOnce({ seconds: 0, minutes: 0 });
  render(<GameTimer timeTaken={new Date(125)} />);

  expect(screen.getByText("00:00:13"));
});

it("should pad zero", () => {
  intervalToDuration.mockReturnValueOnce({ seconds: 5, minutes: 5 });
  render(<GameTimer timeTaken={new Date(50)} />);

  expect(screen.getByText("05:05:05"));
});

it("should work for long duration", () => {
  intervalToDuration.mockReturnValueOnce({ hours: 1, seconds: 0, minutes: 2 });
  render(<GameTimer timeTaken={new Date(50)} />);

  expect(screen.getByText("01:02:00:05"));
});

it("should work for EVEN longer duration", () => {
  intervalToDuration.mockReturnValueOnce({
    days: 2,
    hours: 5,
    seconds: 11,
    minutes: 33,
  });
  render(<GameTimer timeTaken={new Date(255)} />);

  expect(screen.getByText("02:05:33:11:26"));
});
