'use client';

import { Pagination } from '@/shared/components/ui/pagination';
import ProductGrid from '../components/product-grid';
import { useProductsGrid } from '../hooks/use-product-grid';

export default function ProductScreen() {
  const { products, isLoading, currentPage, totalPages, handlePageChange } = useProductsGrid();

  return (
    <>
      <div className="flex gap-5 my-8">
        <aside className="w-1/4">{/* Filters sidebar  */}</aside>

        <div className="w-3/4">
          <div className="container mx-auto px-4 py-8">
            <ProductGrid products={products} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {!isLoading && totalPages > 1 && (
        <div className="my-6 w-full flex justify-center items-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}