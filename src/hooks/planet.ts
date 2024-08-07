import { useQuery } from "@tanstack/react-query";
import { index, Planet } from "@/server/planet";
import { Pagination } from "@/types/general";

export function usePlanets(page: number, search: string) {
  return useQuery<Pagination<Planet>>({
    queryKey: ["planets", page, search],
    queryFn: () => index({ page, search }),
  });
}
