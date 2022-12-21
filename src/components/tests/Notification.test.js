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
  expect(screen.getByText("Hello!").parentElement).toHaveStyle({
    left: 5,
    top: 2,
    // for some reason color gets converted to hex
    backgroundColor: "#00800",
  });
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

  expect(screen.getByText("Hello!").style.backgroundColor).toBe("red");
});
