import { render, screen } from "@testing-library/react";
import Planet from "./page";

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
    require("@/server/planet").show.mockResolvedValue(mockPlanet);
  });

  it("renders planet information correctly", async () => {
    render(await Planet({ params: { id: "1" } }));
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
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

  it("calls show function with correct id", async () => {
    await Planet({ params: { id: "1" } });
    expect(require("@/server/planet").show).toHaveBeenCalledWith("1");
  });
});
