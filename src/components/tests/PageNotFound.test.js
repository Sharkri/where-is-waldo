import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import "@testing-library/jest-dom";

it("should bring you back home", () => {
  render(
    <MemoryRouter initialEntries={["/1230593/fogjirgojgrd"]}>
      <PageNotFound />
    </MemoryRouter>
  );

  expect(screen.getByRole("link", { name: "home" })).toHaveAttribute(
    "href",
    "/"
  );
});
