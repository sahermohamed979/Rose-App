import { ProductCardSkeleton } from "./product-card-skeltton";


export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-b pb-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}