"use server";
import { env } from "@/env.mjs";
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

export const index = async (
  params: Partial<Pagination> & { search?: string }
): Promise<Pagination<Planet>> => {
  const query = new URLSearchParams(params as Record<string, string>);

  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/planets/?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch planets");
  }

  const data = await response.json();

  return data;
};

export const show = async (id: string): Promise<Planet> => {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/planets/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch planet");
  }

  const data = await response.json();

  return data as Planet;
};
