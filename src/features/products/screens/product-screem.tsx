'use client';
import { Pagination } from '@/shared/components/ui/pagination';
import ProductGrid from '../components/product-grid';
import { IProduct } from '../types/product-types';
import { IPaginationResponse } from '@/shared/lib/types/api';
import { usePagination } from '../hooks/use-pagination';

export default function ProductScreen({
  data,
}: {
  data: IPaginationResponse<IProduct> | null;
}) {
  const { currentPage, handlePageChange } = usePagination(
    data?.metadata?.page ?? 1
  );

  return (
    <>
      <ProductGrid products={data?.data || []} isLoading={false} />

      <div className="my-6 flex justify-center items-center">
        <Pagination
          currentPage={currentPage}
          totalPages={data?.metadata?.totalPages ?? 1}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
