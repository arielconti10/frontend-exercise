import { render, screen } from "@testing-library/react";
import Home from "./page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("../server/planet", () => ({
  index: jest.fn(() => ({
    results: [{ name: "Tatooine" }, { name: "Alderaan" }, { name: "Yavin IV" }],
    next: null,
    previous: null,
    count: 3,
  })),
}));

jest.mock("@/components/searchBar", () => ({
  SearchBar: () => <div data-testid="search-bar" />,
}));

describe("Home", () => {
  it("renders the main heading", async () => {
    render(await Home({ searchParams: {} }));
    expect(screen.getByText("Explore the galaxy")).toBeInTheDocument();
  });

  it("renders the search bar", async () => {
    render(await Home({ searchParams: {} }));
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });

  it("renders the correct number of planet cards", async () => {
    render(await Home({ searchParams: {} }));
    const planetCards = screen.getAllByTestId("planet-card");
    expect(planetCards).toHaveLength(3);
  });

  it("renders pagination when no search params are present", async () => {
    render(await Home({ searchParams: {} }));
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
