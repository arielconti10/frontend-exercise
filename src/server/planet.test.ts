import { index, show, Planet } from "./planet";
import { Pagination } from "@/types/general";
import { env } from "@/env.mjs";
import api from "@/lib/api";

jest.mock("@/lib/api");

describe("Planet server actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("index", () => {
    it("should fetch planets with correct URL and params", async () => {
      const mockResponse: Pagination<Planet> = {
        results: [],
        page: 1,
        count: 0,
        next: null,
        previous: null,
      };
      (api as jest.Mock).mockResolvedValue(mockResponse);

      await index({ page: 1, search: "Earth" });

      expect(api).toHaveBeenCalledWith("planets", {
        query: { page: 1, search: "Earth" },
      });
    });

    it("should throw an error when the API request fails", async () => {
      (api as jest.Mock).mockRejectedValue(
        new Error("API error: 500 Internal Server Error")
      );

      await expect(index({})).rejects.toThrow("API error:");
    });
  });

  describe("show", () => {
    it("should fetch a single planet with the correct URL", async () => {
      const mockPlanet: Planet = {
        id: "1",
        name: "Earth",
        description: "Blue planet",
        diameter: "12742",
        rotation_period: "24",
        orbital_period: "365",
        gravity: "9.8",
        population: "7.8 billion",
        climate: "temperate",
        terrain: "diverse",
        surface_water: "70",
      };
      (api as jest.Mock).mockResolvedValue(mockPlanet);

      const result = await show("1");

      expect(api).toHaveBeenCalledWith("planets/1");
      expect(result).toEqual(mockPlanet);
    });

    it("should throw an error when the API request fails", async () => {
      (api as jest.Mock).mockRejectedValue(
        new Error("API error: 404 Not Found")
      );

      await expect(show("999")).rejects.toThrow("API error:");
    });
  });
});
