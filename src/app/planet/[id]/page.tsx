import { show } from "@/server/planet";

export default async function Planet({
  params: { id },
}: {
  params: { id: string };
}) {
  const planet = await show(id);

  return (
    <main className="flex flex-col items-center p-24">
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
    </main>
  );
}

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className=" p-4 rounded">
      <h3 className="text-sm font-semibold text-gray-400">{label}</h3>
      <p className="text-lg">{value}</p>
    </div>
  );
}
