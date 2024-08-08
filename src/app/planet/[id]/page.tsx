import { show } from "@/server/planet";
import PlanetDetail from "@/components/planetDetail";
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";

export default async function PlanetPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["planet", id],
    queryFn: () => show(id),
  });

  return (
    <div data-testid="planet-detail">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PlanetDetail id={id} />
      </HydrationBoundary>
    </div>
  );
}
