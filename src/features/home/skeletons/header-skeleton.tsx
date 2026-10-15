export function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/90 dark:bg-background/80 border-b border-border/40 shadow-xs">
      {/* Main header bar */}
      <div className="px-4 sm:px-6 md:px-9 py-2.5 flex flex-row items-center justify-between gap-3 lg:gap-6 max-w-[1600px] mx-auto">
        {/* Logo placeholder */}
        <div className="h-11 sm:h-12 w-20 animate-pulse rounded-xl bg-muted/60" />

        {/* Desktop search + actions */}
        <div className="hidden md:flex flex-1 min-w-0 items-center justify-between gap-4">
          {/* Search bar */}
          <div className="flex-1 min-w-0 max-w-xl mx-auto">
            <div className="h-10 animate-pulse rounded-full bg-muted/60" />
          </div>

          {/* Action icons */}
          <div className="flex items-center gap-3 shrink-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-9 animate-pulse rounded-full bg-muted/60"
              />
            ))}
          </div>
        </div>

        {/* Mobile icons */}
        <div className="flex md:hidden items-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-8 animate-pulse rounded-full bg-muted/60"
            />
          ))}
        </div>
      </div>

      {/* Sub-header bar */}
      <div className="hidden md:block bg-background/50 dark:bg-background/20 backdrop-blur-md border-t border-border/30 py-1">
        <div className="flex justify-center items-center gap-2 px-4 max-w-7xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-24 animate-pulse rounded-full bg-muted/50"
            />
          ))}
        </div>
      </div>
    </header>
  );
}

export default HeaderSkeleton;
