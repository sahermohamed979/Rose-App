'use client';

import { Pagination } from '@/shared/components/ui/pagination';
import ProductGrid from '../components/product-grid';
import { useProductsGrid } from '../hooks/use-product-grid';

export default function ProductScreen() {
  const {
    products,
    isLoading,
    currentPage,
    totalPages,
    handlePageChange,
  } = useProductsGrid();

  return (
    <>
      <ProductGrid products={products} isLoading={isLoading} />

      {!isLoading && totalPages > 1 && (
        <div className="my-6 flex justify-center items-center">
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
