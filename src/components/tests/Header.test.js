import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";

it("should have correct href to leaderboard and home page", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  const leaderboardLink = screen.getByRole("link", { name: /Leaderboard/i });
  expect(leaderboardLink).toHaveAttribute("href", "/leaderboard");

  const homeLink = screen.getByRole("link", { name: /Home/i });
  expect(homeLink).toHaveAttribute("href", "/");
});
