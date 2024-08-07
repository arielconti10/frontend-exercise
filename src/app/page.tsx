import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { PlanetList } from "./planetList";
import { index } from "@/server/planet";
import { SearchBar } from "@/components/searchBar";

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search || "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["planets", page, search],
    queryFn: () => index({ page, search }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-16 lg:p-24">
        <div className="flex flex-col items-center w-full max-w-7xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
            Explore the galaxy
          </h1>
          <SearchBar name={search} />
          <PlanetList initialPage={page} initialSearch={search} />
        </div>
      </main>
    </HydrationBoundary>
  );
}
