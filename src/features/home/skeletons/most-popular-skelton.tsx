import ProductCardSkeletonGrid from './product-card-skeleton';

export default function MostPopularSkeleton() {
  return (
    <div className="mb-34.5">
      <div className="mb-10 flex justify-between">
        <div className="h-8 w-48 animate-pulse rounded-full bg-bg-muted" />
        <div className="hidden gap-4 md:flex">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-5 w-20 animate-pulse rounded-full bg-bg-muted"
            />
          ))}
        </div>
      </div>
      <ProductCardSkeletonGrid count={4} />
    </div>
  );
}
