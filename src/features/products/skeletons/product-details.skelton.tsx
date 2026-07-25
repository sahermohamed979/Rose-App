export function ProductDetailsSkeleton() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 animate-pulse">
      {/* Gallery Skeleton */}
      <div className="flex flex-col gap-4 w-full">
        {/* Main Image Skeleton */}
        <div className="h-120 w-full bg-bg-muted rounded-2xl"></div>

        {/* Thumbnails Skeleton */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 w-24 bg-bg-muted rounded-lg shrink-0"
            ></div>
          ))}
        </div>
      </div>

      {/* Details Skeleton */}
      <div className="flex flex-col justify-between">
        <div>
          {/* Title */}
          <div className="h-10 bg-bg-muted rounded-md w-3/4 mb-6"></div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 bg-bg-muted rounded-md w-24"></div>
            <div className="h-8 bg-bg-muted rounded-md w-24"></div>
            <div className="h-6 bg-bg-muted rounded-full w-32"></div>
          </div>

          {/* Rating */}
          <div className="h-12 bg-bg-muted rounded-md w-full mb-6"></div>

          {/* Description */}
          <div className="space-y-3">
            <div className="h-4 bg-bg-muted rounded w-full"></div>
            <div className="h-4 bg-bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-bg-muted rounded w-4/6"></div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-10">
          <div className="w-12 h-12 bg-bg-muted rounded-2xl shrink-0"></div>
          <div className="flex-1 h-11 bg-bg-muted rounded-xl"></div>
        </div>
      </div>
    </section>
  );
}
