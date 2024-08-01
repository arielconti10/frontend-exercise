import { PlanetCard } from "@/components/planetCard";
import { index } from "@/server/planet";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SearchBar } from "@/components/searchBar";
import Link from "next/link";

type Props = {
  searchParams: {
    page?: string;
    search?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const page = parseInt(searchParams.page as string, 10) || 1;
  const search = searchParams.search || "";

  const { results, next, previous, count } = await index({
    page,
    search: search,
  });

  const totalPages = Math.ceil(count / 10);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-16 lg:p-24">
      <div className="flex flex-col items-center w-full max-w-7xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
          Explore the galaxy
        </h1>
        <SearchBar name={searchParams.search} />

        <section className="mt-8 flex flex-col">
          <div className="mb-12 grid grid-cols-5 gap-4">
            {results.map((planet, key) => (
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

          <Pagination>
            <PaginationContent>
              {previous ? (
                <PaginationItem>
                  <PaginationPrevious href={`/?page=${page - 1}`}>
                    Previous
                  </PaginationPrevious>
                </PaginationItem>
              ) : null}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
                <PaginationItem key={i}>
                  <PaginationLink isActive={i === page} href={`/?page=${i}`}>
                    {i}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {next ? (
                <PaginationItem>
                  <PaginationNext href={`/?page=${page + 1}`}>
                    next
                  </PaginationNext>
                </PaginationItem>
              ) : null}
            </PaginationContent>
          </Pagination>
        </section>
      </div>
    </main>
  );
}
