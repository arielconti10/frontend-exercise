"use client";

import { useQuery } from "@tanstack/react-query";
import { index, Planet } from "@/server/planet";
import { Pagination } from "@/types/general";
import { PlanetCard } from "@/components/planetCard";
import Link from "next/link";
import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PlanetListProps = {
  initialPage: number;
  initialSearch: string;
};

export function PlanetList({ initialPage, initialSearch }: PlanetListProps) {
  const { data, isLoading, error } = useQuery<Pagination<Planet>>({
    queryKey: ["planets", initialPage, initialSearch],
    queryFn: () => index({ page: initialPage, search: initialSearch }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const { results, next, previous, count } = data || {};
  const totalPages = Math.ceil((count || 0) / 10);

  return (
    <section className="mt-8 flex flex-col">
      <div className="mb-12 grid grid-cols-5 gap-4">
        {results?.map((planet, key) => (
          <Link
            className="card"
            key={key + 1}
            href={`/planet/${key + 1}`}
            passHref
          >
            <PlanetCard planet={planet} />
          </Link>
        ))}
      </div>

      <PaginationUI>
        <PaginationContent>
          {previous && (
            <PaginationItem>
              <PaginationPrevious href={`/?page=${initialPage - 1}`}>
                Previous
              </PaginationPrevious>
            </PaginationItem>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
            <PaginationItem key={i}>
              <PaginationLink isActive={i === initialPage} href={`/?page=${i}`}>
                {i}
              </PaginationLink>
            </PaginationItem>
          ))}

          {next && (
            <PaginationItem>
              <PaginationNext href={`/?page=${initialPage + 1}`}>
                Next
              </PaginationNext>
            </PaginationItem>
          )}
        </PaginationContent>
      </PaginationUI>
    </section>
  );
}
