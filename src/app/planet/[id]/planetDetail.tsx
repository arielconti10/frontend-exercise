"use client";

import { useQuery, HydrationBoundary } from "@tanstack/react-query";
import { show, Planet } from "@/server/planet";
import { Skeleton } from "@/components/ui/skeleton";

type PlanetDetailProps = {
  id: string;
};

export default function PlanetDetail({ id }: PlanetDetailProps) {
  const {
    data: planet,
    isLoading,
    isError,
    error,
  } = useQuery<Planet, Error>({
    queryKey: ["planet", id],
    queryFn: () => show(id),
  });

  if (isLoading) {
    return <PlanetSkeleton />;
  }

  if (isError || !planet) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">{planet.name}</h1>
        <p className="text-gray-300 mb-6">{planet.description}</p>

        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="Diameter" value={planet.diameter} />
          <InfoItem label="Rotation Period" value={planet.rotation_period} />
          <InfoItem label="Orbital Period" value={planet.orbital_period} />
          <InfoItem label="Gravity" value={planet.gravity} />
          <InfoItem label="Population" value={planet.population} />
          <InfoItem label="Climate" value={planet.climate} />
          <InfoItem label="Terrain" value={planet.terrain} />
          <InfoItem label="Surface Water" value={planet.surface_water} />
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-4 rounded">
      <h3 className="text-sm font-semibold text-gray-400">{label}</h3>
      <p className="text-lg">{value}</p>
    </div>
  );
}

function PlanetSkeleton() {
  return (
    <main className="flex flex-col items-center p-24">
      <div className="w-full rounded-lg overflow-hidden">
        <div className="p-8">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-20 w-full mb-6" />

          <div className="grid grid-cols-2 gap-4">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="p-4 rounded">
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
