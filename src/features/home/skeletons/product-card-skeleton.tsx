import { cn } from '@/shared/lib/utils/utils';

function ProductCardSkeleton() {
  return (
    <div className="w-full max-w-[302px] animate-pulse">
      <div className="aspect-302/272 w-full rounded-2xl bg-bg-muted mb-4" />
      <div className="mb-3 h-5 w-3/4 rounded-full bg-bg-muted" />
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-3">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-4 w-4 rounded-full bg-bg-muted"
              />
            ))}
          </div>
          <div className="h-4 w-24 rounded-full bg-bg-muted" />
        </div>
        <div className="h-[42px] w-[42px] rounded-full bg-bg-muted" />
      </div>
    </div>
  );
}

export default function ProductCardSkeletonGrid({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 items-center justify-items-center',
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
