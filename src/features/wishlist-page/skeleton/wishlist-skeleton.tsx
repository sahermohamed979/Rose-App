export function WishlistCardSkeleton() {
  return (
    <div className="relative rounded-2xl border-b border-border-muted pb-4 mt-5 animate-pulse">
      <div className="flex gap-4">
        {/* Image placeholder */}
        <div className="w-32 h-35 rounded-xl bg-bg-soft shrink-0" />

        {/* Content placeholder */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Top row: title, rating, remove button */}
          <div className="flex justify-between w-full">
            <div className="space-y-2">
              <div className="h-5 w-48 rounded-lg bg-bg-soft" />
              <div className="h-4 w-36 rounded-md bg-bg-soft" />
            </div>
            <div className="h-10 w-24 rounded-xl bg-bg-soft" />
          </div>

          {/* Bottom row: price info, quantity controls */}
          <div className="flex items-center justify-between gap-4 mt-4 sm:mt-0">
            <div className="h-6 w-28 rounded-md bg-bg-soft" />
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 rounded-xl bg-bg-soft" />
              <div className="h-12 w-28 rounded-xl bg-bg-soft" />
              <div className="h-12 w-12 rounded-xl bg-bg-soft" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WishlistSkeleton() {
  return (
    <div className="w-full space-y-4 animate-pulse">
      {/* Cart Header Skeleton */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-baseline gap-3">
          <div className="h-10 sm:h-12 w-32 sm:w-40 rounded-xl bg-bg-soft" />
          <div className="h-5 w-24 rounded-lg bg-bg-soft" />
        </div>
        <div className="h-10 w-32 sm:w-34 rounded-xl bg-bg-soft" />
      </div>

      {/* Cart Items Skeleton Container */}
      <div className="border border-border-muted px-4 rounded-2xl">
        {Array.from({ length: 3 }).map((_, index) => (
          <WishlistCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export default WishlistSkeleton;
