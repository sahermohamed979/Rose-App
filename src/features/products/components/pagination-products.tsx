'use client';
import { usePagination } from '../hooks/use-pagination';
import { IPaginationResponse } from '@/shared/lib/types/api';
import { IProduct } from '../../../shared/lib/types/product-types';
import { Pagination } from '@/shared/components/ui/pagination';

export default function PaginationProducts({
  data,
}: {
  data: IPaginationResponse<IProduct> | null;
}) {
  const { currentPage, handlePageChange } = usePagination(
    data?.metadata?.page ?? 1
  );

  return (
    <div className="my-6 flex justify-center items-center">
      <Pagination
        currentPage={currentPage}
        totalPages={data?.metadata?.totalPages ?? 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
