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

it("should have render children and also className", () => {
  render(
    <MemoryRouter>
      <Header className="test-class-name">
        <div>some text</div>
      </Header>
    </MemoryRouter>
  );

  expect(screen.getByRole("banner").className).toBe("test-class-name");
  expect(screen.getByText("some text")).toBeInTheDocument();
});
