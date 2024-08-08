import { render, screen, waitFor } from "@testing-library/react";
import PlanetDetail from "./planetDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { show } from "@/server/planet";
import { createQueryClientWrapper } from "@/lib/testUtils";

jest.mock("@/server/planet", () => ({
  show: jest.fn(),
}));

describe("PlanetDetail", () => {
  const mockPlanet = {
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
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders loading skeleton initially", () => {
    (show as jest.Mock).mockReturnValue(new Promise(() => {})); // Never resolves
    render(<PlanetDetail id="1" />, { wrapper: createQueryClientWrapper() });

    expect(screen.getByRole("main")).toBeInTheDocument();
    // Check for the presence of skeleton elements
    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders planet information when data is loaded", async () => {
    (show as jest.Mock).mockResolvedValue(mockPlanet);
    render(<PlanetDetail id="1" />, { wrapper: createQueryClientWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
    });

    expect(screen.getByText("A desert planet")).toBeInTheDocument();
    expect(screen.getByText("Diameter")).toBeInTheDocument();
    expect(screen.getByText("10465")).toBeInTheDocument();
    expect(screen.getByText("Rotation Period")).toBeInTheDocument();
    expect(screen.getByText("23")).toBeInTheDocument();
    expect(screen.getByText("Orbital Period")).toBeInTheDocument();
    expect(screen.getByText("304")).toBeInTheDocument();
    expect(screen.getByText("Gravity")).toBeInTheDocument();
    expect(screen.getByText("1 standard")).toBeInTheDocument();
    expect(screen.getByText("Population")).toBeInTheDocument();
    expect(screen.getByText("200000")).toBeInTheDocument();
    expect(screen.getByText("Climate")).toBeInTheDocument();
    expect(screen.getByText("arid")).toBeInTheDocument();
    expect(screen.getByText("Terrain")).toBeInTheDocument();
    expect(screen.getByText("desert")).toBeInTheDocument();
    expect(screen.getByText("Surface Water")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders error message when fetch fails", async () => {
    (show as jest.Mock).mockRejectedValue(new Error("Failed to fetch planet"));

    render(<PlanetDetail id="1" />, { wrapper: createQueryClientWrapper() });

    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch planet")
      ).toBeInTheDocument();
    });
  });

  it("calls show function with correct id", async () => {
    (show as jest.Mock).mockResolvedValue(mockPlanet);
    render(<PlanetDetail id="1" />, { wrapper: createQueryClientWrapper() });

    await waitFor(() => {
      expect(show).toHaveBeenCalledWith("1");
    });
  });
});
