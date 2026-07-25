export const SearchSkeleton = () => (
  <div className="p-4 space-y-3 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="flex items-center justify-between gap-4"
      >
        <div className="h-4 bg-bg-soft rounded w-2/3"></div>
        <div className="h-4 bg-bg-soft rounded w-1/4"></div>
      </div>
    ))}
  </div>
);
