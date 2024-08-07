import { render, screen } from "@testing-library/react";
import Home from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("../server/planet", () => ({
  index: jest.fn(({ page, search }) => ({
    results: [{ name: "Tatooine" }, { name: "Alderaan" }, { name: "Yavin IV" }],
    next: null,
    previous: null,
    count: 3,
  })),
}));

jest.mock("@/components/searchBar", () => ({
  SearchBar: () => <div data-testid="search-bar" />,
}));

jest.mock("@/components/planetList", () => ({
  PlanetList: jest.fn(() => <div data-testid="planet-list" />),
}));

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  dehydrate: jest.fn(() => ({})),
  HydrationBoundary: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("Home", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    queryClient.clear();
  });

  it("renders the main heading", async () => {
    render(await Home({ searchParams: {} }));
    expect(screen.getByText("Explore the galaxy")).toBeInTheDocument();
  });

  it("renders the search bar", async () => {
    render(await Home({ searchParams: {} }));
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });

  it("renders the PlanetList component", async () => {
    render(await Home({ searchParams: {} }));
    expect(screen.getByTestId("planet-list")).toBeInTheDocument();
  });

  it("prefetches the correct query", async () => {
    const mockPrefetchQuery = jest.fn();
    jest
      .spyOn(QueryClient.prototype, "prefetchQuery")
      .mockImplementation(mockPrefetchQuery);

    await Home({ searchParams: { page: "2", search: "test" } });

    expect(mockPrefetchQuery).toHaveBeenCalledWith({
      queryKey: ["planets", 2, "test"],
      queryFn: expect.any(Function),
    });
  });
});
