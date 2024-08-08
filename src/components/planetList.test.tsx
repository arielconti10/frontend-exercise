import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PlanetList } from "./planetList";
import { index, Planet } from "@/server/planet";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/types/general";

jest.mock("@/server/planet", () => ({
  index: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/components/planetCard", () => ({
  PlanetCard: ({ planet }: { planet: Planet }) => (
    <div data-testid={`planet-card-${planet.id}`}>{planet.name}</div>
  ),
}));

jest.mock("@/components/ui/skeletonCard", () => ({
  __esModule: true,
  default: () => <div data-testid="skeleton-card" />,
}));

const mockPlanets: Planet[] = [
  {
    id: "1",
    name: "Tatooine",
    description: "A desert planet",
    diameter: "10465",
    rotation_period: "23",
    orbital_period: "304",
    gravity: "1 standard",
    population: "200000",
    climate: "arid",
    terrain: "desert",
    surface_water: "1",
  },
  {
    id: "2",
    name: "Alderaan",
    description: "A peaceful planet",
    diameter: "12500",
    rotation_period: "24",
    orbital_period: "364",
    gravity: "1 standard",
    population: "2000000000",
    climate: "temperate",
    terrain: "grasslands, mountains",
    surface_water: "1",
  },
  {
    id: "3",
    name: "Yavin IV",
    description: "A moon orbiting the gas giant Yavin",
    diameter: "10200",
    rotation_period: "24",
    orbital_period: "4818",
    gravity: "1 standard",
    population: "1000",
    climate: "temperate, tropical",
    terrain: "jungle, rainforests",
    surface_water: "1",
  },
];
const mockIndex = index as jest.MockedFunction<typeof index>;
const mockRouter = {
  push: jest.fn(),
};
const mockSearchParams = new URLSearchParams();

describe("PlanetList", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    mockIndex.mockResolvedValue({
      results: mockPlanets,
      next: null,
      previous: null,
      count: mockPlanets.length,
      page: 1,
    } as Pagination<Planet>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PlanetList />
      </QueryClientProvider>
    );
    expect(screen.getAllByTestId("skeleton-card")).toHaveLength(10);
  });

  it("renders planet cards after loading", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PlanetList />
      </QueryClientProvider>
    );
    await waitFor(() => {
      mockPlanets.forEach((planet) => {
        expect(
          screen.getByTestId(`planet-card-${planet.id}`)
        ).toBeInTheDocument();
      });
    });
  });
});
