'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchProducts } from '../apis/products-api';
import { Product, ProductsResponse } from '../types/product-types';
import { usePagination } from './use-pagination';

export function useProductsGrid() {
  // Navigation
  const searchParams = useSearchParams();

  // Custom hooks
  const { currentPage, handlePageChange } = usePagination();

  // Query
  const { data, isLoading } = useQuery<ProductsResponse>({
    queryKey: ['grid-products', searchParams.toString()],
    queryFn: () => fetchProducts(searchParams.toString()),
  });

  // Variables (derived)
  const totalPages = data?.payload?.metadata?.totalPages || 1;

  const products: Product[] = useMemo(() => {
    const rawProducts = data?.payload?.data || [];

    return rawProducts.map((product) => ({
      ...product,
    }));
  }, [data]);

  return {
    products,
    isLoading,
    currentPage,
    totalPages,
    handlePageChange,
  };
}
