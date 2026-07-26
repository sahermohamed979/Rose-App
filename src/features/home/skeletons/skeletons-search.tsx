export const SearchSkeleton = () => (
  <div className="p-4 space-y-3 animate-pulse ">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="flex items-center justify-between gap-4"
      >
        <div className="h-4  rounded w-2/3 bg-bg-default"></div>
        <div className="h-4  rounded w-1/4 bg-bg-default"></div>
      </div>
    ))}
  </div>
);
