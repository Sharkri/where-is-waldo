import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dropdown from "../Dropdown";

it("should place dropdown on where user clicks", () => {
  render(<Dropdown x={5} y={10} />);
  expect(screen.getByRole("combobox").style).toHaveProperty("top", "10px");
  expect(screen.getByRole("combobox").style).toHaveProperty("left", "5px");
});

it("should render children of dropdown", () => {
  render(
    <Dropdown x={5} y={10}>
      <option>am i rendered?</option>
    </Dropdown>
  );

  expect(screen.getByText("am i rendered?")).toBeInTheDocument();
});
