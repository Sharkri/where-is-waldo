import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Notification from "../Notification";

it("should display notification", () => {
  render(<Notification message="Hello!" isShowing position={{ x: 5, y: 2 }} />);

  expect(screen.getByText("Hello!")).toBeInTheDocument();
  expect(screen.getByText("Hello!").parentElement).toHaveStyle({
    left: 5,
    top: 2,
  });
});

it("should not display notification", () => {
  render(
    <Notification
      message="Hello!"
      isShowing={false}
      position={{ x: 5, y: 2 }}
    />
  );

  expect(screen.queryByText("Hello!")).not.toBeInTheDocument();
});
