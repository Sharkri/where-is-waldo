import React from "react";
import { render, screen } from "@testing-library/react";
import { intervalToDuration } from "date-fns";
import GameTimer from "../GameTimer";

jest.mock("date-fns", () => ({ intervalToDuration: jest.fn() }));

afterEach(() => jest.resetAllMocks());

it("should call with correct params and display zero value correctly", () => {
  intervalToDuration.mockReturnValueOnce({ seconds: 0, minutes: 0 });
  render(<GameTimer startTime={new Date(0)} currentTime={new Date(0)} />);
  expect(intervalToDuration).toHaveBeenCalledWith({
    start: new Date(0),
    end: new Date(0),
  });

  expect(screen.getByText("00:00:00"));
});

it("should display ms", () => {
  intervalToDuration.mockReturnValueOnce({ seconds: 0, minutes: 0 });
  render(<GameTimer startTime={new Date(0)} currentTime={new Date(125)} />);

  expect(screen.getByText("00:00:12"));
});

it("should pad zero", () => {
  intervalToDuration.mockReturnValueOnce({ seconds: 5, minutes: 5 });
  render(<GameTimer startTime={new Date(0)} currentTime={new Date(50)} />);

  expect(screen.getByText("05:05:05"));
});
