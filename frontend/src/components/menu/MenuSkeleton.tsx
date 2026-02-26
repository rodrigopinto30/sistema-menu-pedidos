import { Skeleton } from "@/components/ui/skeleton";

export function MenuSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-8 w-48 bg-gray-200" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="border p-4 rounded-xl space-y-3">
                <Skeleton className="h-6 w-3/4 bg-gray-200" />
                <Skeleton className="h-4 w-full bg-gray-100" />
                <Skeleton className="h-10 w-full bg-orange-100" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
