import { Skeleton } from '@/shared/components/ui/skeleton';

export function OccasionsScreenSkeleton() {
  return (
    <div className="w-full space-y-10 py-6">
      {/* Hero Skeleton */}
      <div className="rounded-3xl border border-border-subtle p-8 sm:p-12 text-center bg-bg-subtle/30">
        <Skeleton className="mx-auto h-6 w-36 rounded-full" />
        <Skeleton className="mx-auto mt-4 h-10 w-3/4 max-w-md" />
        <Skeleton className="mx-auto mt-3 h-5 w-2/3 max-w-lg" />
        <Skeleton className="mx-auto mt-8 h-12 w-full max-w-md rounded-full" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated"
          >
            <Skeleton className="h-60 w-full" />
            <div className="space-y-3 p-5">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-4 h-9 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
