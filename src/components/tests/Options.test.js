import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Options from "../Options";

it("does not render <Options /> when isOpen is false", () => {
  render(
    <Options isOpen={false}>
      <div>Option 1</div>
    </Options>
  );
  expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
});

it("render <Options /> when isOpen is true", () => {
  render(
    <Options isOpen>
      <div>Option 1</div>
    </Options>
  );
  expect(screen.getByText("Option 1")).toBeInTheDocument();
});
