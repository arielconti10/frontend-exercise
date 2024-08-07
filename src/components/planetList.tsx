"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";

export function PlanetList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search") || "";

  const { data, isLoading, isError, error } = useQuery<Pagination<Planet>>({
    queryKey: ["planets", page, search],
    queryFn: () => index({ page, search }),
    placeholderData: keepPreviousData,
  });

  const { results, next, previous, count } = data || {};
  const totalPages = Math.ceil((count || 0) / 10);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  function SkeletonCard() {
    return (
      <div className="space-y-3">
        <div className="aspect-square overflow-hidden">
          <Skeleton className="h-full xl:h-80 w-full xl:min-w-80 min-w-32" />
        </div>
        <div className="space-y-1 p-2">
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    );
  }

  const renderPlanetCards = () => {
    if (isLoading) {
      return Array(10)
        .fill(0)
        .map((_, index) => <SkeletonCard key={index} />);
    }
    return results?.map((planet) => (
      <Link
        className="w-full"
        key={planet.id}
        href={`/planet/${planet.id}`}
        passHref
      >
        <PlanetCard planet={planet} />
      </Link>
    ));
  };

  if (isError) {
    return (
      <div className="text-center py-4 text-red-500">
        An error occurred: {(error as Error).message}
      </div>
    );
  }

  return (
    <section className="mt-8 flex flex-col w-full" data-testid="planet-list">
      <div className="mb-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {renderPlanetCards()}
      </div>

      <PaginationUI className="overflow-x-auto">
        <PaginationContent className="flex-wrap justify-center">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(page - 1, 1))}
              disabled={page === 1 || isLoading}
            >
              Previous
            </PaginationPrevious>
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
            <PaginationItem key={i} className="hidden sm:inline-block">
              <PaginationLink
                isActive={i === page}
                onClick={() => handlePageChange(i)}
                disabled={isLoading}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (next) {
                  handlePageChange(page + 1);
                }
              }}
              disabled={!next || isLoading}
            >
              Next
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </PaginationUI>
    </section>
  );
}
