import type { Planet } from "@/server/planet";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PlanetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "portrait" | "square";
  planet: Pick<Planet, "name">;
}

export function PlanetCard({
  className,
  aspectRatio = "square",
  planet,
  ...props
}: PlanetCardProps) {
  return (
    <div
      className={cn("space-y-3 w-full", className)}
      {...props}
      data-testid="planet-card"
    >
      <div className="overflow-hidden rounded-md cursor-pointer relative">
        <Image
          src={
            "https://static.wikia.nocookie.net/ptstarwars/images/f/f6/Tatoooinefull.jpg/revision/latest?cb=20071114001422"
          }
          alt={"Tattoine"}
          width={500}
          height={500}
          className={cn(
            "object-cover transition-all hover:scale-105 w-full",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-medium leading-none">{planet.name}</h3>
      </div>
    </div>
  );
}
