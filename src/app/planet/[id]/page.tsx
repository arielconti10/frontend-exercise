import { show } from "@/server/planet";
import PlanetDetail from "./planetDetail";
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';

export default async function PlanetPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['planet', id],
    queryFn: () => show(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlanetDetail id={id} />
    </HydrationBoundary>
  );
}