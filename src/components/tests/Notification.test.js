import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Notification from "../Notification";

it("should display notification", () => {
  render(
    <Notification
      message="Hello!"
      isShowing
      position={{ x: 5, y: 2 }}
      success
    />
  );

  expect(screen.getByText("Hello!")).toBeInTheDocument();
  expect(screen.getByTestId("notification").dataset.success).toBe("true");
});

it("should not display notification if isShowing is false", () => {
  render(
    <Notification
      message="Hello!"
      isShowing={false}
      position={{ x: 5, y: 2 }}
      success
    />
  );

  expect(screen.queryByText("Hello!")).not.toBeInTheDocument();
});
it("should display unsuccessful", () => {
  render(
    <Notification
      message="Hello!"
      isShowing
      position={{ x: 5, y: 2 }}
      success={false}
    />
  );

  expect(screen.getByTestId("notification").dataset.success).toBe("false");
});
