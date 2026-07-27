
export function ProductCardSkeleton() {
  return (
    <div className="bg-bg-plain w-full rounded-xl flex flex-col gap-3 animate-pulse">
      {/* Image placeholder */}
      <div className="w-full aspect-square rounded-xl bg-bg-soft" />

      {/* Title placeholder */}
      <div className="h-5 w-3/4 rounded bg-bg-soft" />

      {/* Rating placeholder */}
      <div className="h-3 w-1/3 rounded bg-bg-soft" />

      {/* Price placeholder */}
      <div className="h-5 w-1/2 rounded bg-bg-soft" />
    </div>
  );
}