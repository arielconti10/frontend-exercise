import { index, show, Planet } from "./planet";
import { Pagination } from "@/types/general";
import { env } from "@/env.mjs";

// Mock fetch globally
global.fetch = jest.fn();

// Helper function to mock fetch
const mockFetch = (mockResponse: any, ok: boolean = true) => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok,
    json: jest.fn().mockResolvedValueOnce(mockResponse),
  });
};

// Helper function to assert fetch call
const assertFetchCalled = (url: string) => {
  expect(global.fetch).toHaveBeenCalledWith(url);
};

describe("Planet server actions", () => {
  describe("index", () => {
    it("should fetch planets with correct URL and params", async () => {
      const mockResponse: Pagination<Planet> = {
        results: [
          {
            id: "1",
            name: "Earth",
            description: "",
            diameter: "",
            rotation_period: "",
            orbital_period: "",
            gravity: "",
            population: "",
            climate: "",
            terrain: "",
            surface_water: "",
          },
        ],
        page: 1,
        count: 1,
        next: null,
        previous: null,
      };

      mockFetch(mockResponse);

      const result = await index({ page: 1, search: "Earth" });

      assertFetchCalled(
        `${env.NEXT_PUBLIC_API_URL}/planets/?page=1&search=Earth`
      );
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error when the API request fails", async () => {
      mockFetch({}, false);

      await expect(index({})).rejects.toThrow("Failed to fetch planets");
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

      mockFetch(mockPlanet);

      const result = await show("1");

      assertFetchCalled(`${env.NEXT_PUBLIC_API_URL}/planets/1`);
      expect(result).toEqual(mockPlanet);
    });

    it("should throw an error when the API request fails", async () => {
      mockFetch({}, false);

      await expect(show("1")).rejects.toThrow("Failed to fetch planet");
    });
  });
});
