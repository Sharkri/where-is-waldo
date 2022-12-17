import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dropdown from "../Dropdown";

it("should place dropdown on where user clicks", () => {
  render(<Dropdown x={5} y={10} />);

  expect(screen.getByRole("combobox")).toHaveAttribute("data-x", "5");
  expect(screen.getByRole("combobox")).toHaveAttribute("data-y", "10");
});

it("should render children of dropdown", () => {
  render(
    <Dropdown x={5} y={10}>
      <option>am i rendered?</option>
    </Dropdown>
  );

  expect(screen.getByText("am i rendered?")).toBeInTheDocument();
});
