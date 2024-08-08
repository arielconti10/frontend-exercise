import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
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
