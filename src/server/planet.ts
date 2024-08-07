import api from "@/lib/api";
import { Pagination } from "@/types/general";

export type Planet = {
  id: string;
  name: string;
  description: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
};

type PlanetParams = {
  page?: number;
  search?: string;
};

export const index = async (
  params: PlanetParams
): Promise<Pagination<Planet>> => {
  return api<Pagination<Planet>>("planets", { query: params });
};

export const show = async (id: string): Promise<Planet> => {
  return api<Planet>(`planets/${id}`);
};
