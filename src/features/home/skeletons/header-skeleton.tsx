export function HeaderSkeleton() {
  return (
    <div className="sticky top-0 z-50">
      {/* Main header bar */}
      <div className="bg-bg-muted px-4 md:px-9 py-1 flex flex-row items-center justify-between gap-2">
        {/* Logo placeholder */}
        <div className="h-[80px] w-[85px] animate-pulse rounded bg-bg-soft/50" />

        {/* Desktop search + actions */}
        <div className="hidden md:flex flex-1 min-w-0 items-center gap-4">
          {/* Search bar */}
          <div className="flex-1 min-w-0 mx-4">
            <div className="h-10 animate-pulse rounded-lg bg-bg-soft/50" />
          </div>

          {/* Action icons */}
          <div className="flex items-center gap-3 shrink-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-5 w-5 animate-pulse rounded-full bg-bg-soft/50"
              />
            ))}
          </div>
        </div>

        {/* Mobile icons */}
        <div className="flex md:hidden items-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-5 w-5 animate-pulse rounded-full bg-bg-soft/50"
            />
          ))}
        </div>
      </div>

      {/* Sub-header bar */}
      <div className="hidden md:block bg-bg-primary-saturated">
        <div className="flex justify-center items-center gap-4 px-4 py-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-20 animate-pulse rounded-full bg-white/20"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeaderSkeleton;
