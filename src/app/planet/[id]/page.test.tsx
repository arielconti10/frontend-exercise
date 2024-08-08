import { render, screen } from "@testing-library/react";
import Planet from "./page";

import { show } from "@/server/planet";
import { createQueryClientWrapper } from "@/lib/testUtils";

jest.mock("@/server/planet", () => ({
  show: jest.fn(),
}));

describe("Planet", () => {
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
    (show as jest.Mock).mockResolvedValue(mockPlanet);
  });

  it("prefetches planet data", async () => {
    await Planet({ params: { id: "1" } });
    expect(show).toHaveBeenCalledWith("1");
  });

  it("renders PlanetDetail with correct props", async () => {
    render(await Planet({ params: { id: "1" } }), {
      wrapper: createQueryClientWrapper(),
    });

    expect(screen.getByTestId("planet-detail")).toHaveTextContent("Tatooine");
  });
});
