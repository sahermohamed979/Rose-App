export function OccasionsDashboardSkeleton() {
  return (
    <section className="m-4 p-6 sm:p-6 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-bg-muted rounded-md w-40"></div>
        <div className="h-10 bg-bg-muted rounded-xl w-32"></div>
      </div>

      {/* Search Skeleton */}
      <div className="mb-4 max-w-sm">
        <div className="h-10 bg-bg-muted rounded-md w-full"></div>
      </div>

      {/* Table Skeleton */}
      <div className="rounded-t-xl overflow-hidden mt-4">
        {/* Table Header */}
        <div className="flex items-center bg-bg-subtle border-b border-border-muted p-3 gap-6">
          <div className="h-4 bg-bg-muted rounded w-32"></div>
          <div className="h-4 bg-bg-muted rounded w-24"></div>
          <div className="h-4 bg-bg-muted rounded w-16 ml-auto"></div>
        </div>

        {/* Table Rows */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex items-center border-b border-border-subtle last:border-0 p-3 gap-6"
          >
            <div className="h-4 bg-bg-muted rounded w-40"></div>
            <div className="h-4 bg-bg-muted rounded w-20"></div>
            <div className="flex justify-end gap-2 ml-auto">
              <div className="h-8 w-8 bg-bg-muted rounded-md"></div>
              <div className="h-8 w-8 bg-bg-muted rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
