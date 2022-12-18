import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dropdown from "../Dropdown";

jest.mock("react", () => {
  return {
    ...jest.requireActual("react"),
    useRef: () => {
      return {
        current: { scrollWidth: 100 },
      };
    },
  };
});

it("should place dropdown on where user clicks", () => {
  render(
    <Dropdown x={5} y={10} containerSize={{ height: 1234, width: 2000 }} />
  );
  expect(screen.getByRole("combobox").style).toHaveProperty("top", "10px");
  expect(screen.getByRole("combobox").style).toHaveProperty("left", "5px");
});

it("should render children of dropdown", () => {
  render(
    <Dropdown x={5} y={10} containerSize={{ height: 500, width: 800 }}>
      <option>am i rendered?</option>
    </Dropdown>
  );

  expect(screen.getByText("am i rendered?")).toBeInTheDocument();
});
