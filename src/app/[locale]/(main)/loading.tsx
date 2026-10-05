export default function MainLoading() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-9 mt-4 sm:mt-8 space-y-6 md:space-y-8 animate-pulse">
      {/* Hero Skeleton */}
      <div className="grid grid-cols-12 gap-6">
        {/* Side Promo Card Skeleton (Desktop) */}
        <div className="hidden lg:block lg:col-span-3 h-72 sm:h-96 md:h-110 rounded-xl bg-bg-muted" />

        {/* Carousel Skeleton */}
        <div className="col-span-12 lg:col-span-9 h-72 sm:h-96 md:h-110 rounded-xl bg-bg-muted" />
      </div>

      {/* Promo Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="h-44 sm:h-52 rounded-xl bg-bg-muted" />
        <div className="h-44 sm:h-52 rounded-xl bg-bg-muted" />
        <div className="h-44 sm:h-52 rounded-xl bg-bg-muted sm:col-span-2 lg:col-span-1" />
      </div>

      {/* Features Strip Skeleton */}
      <div className="h-16 rounded-xl bg-bg-muted/70" />

      {/* Popular Products Header & Cards Skeleton */}
      <div className="pt-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-7 w-44 rounded-full bg-bg-muted" />
          <div className="hidden sm:flex gap-3">
            <div className="h-5 w-16 rounded-full bg-bg-muted" />
            <div className="h-5 w-16 rounded-full bg-bg-muted" />
            <div className="h-5 w-16 rounded-full bg-bg-muted" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-72 rounded-xl bg-bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}
