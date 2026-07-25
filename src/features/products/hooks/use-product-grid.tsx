'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { fetchProducts } from '../apis/products-api';
import { fetchWishlist } from '../apis/wishlist-api';
import { Product, ProductsResponse, WishlistResponse } from '../types/products-types';

export function useProductsGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const { data, isLoading } = useQuery<ProductsResponse>({
    queryKey: ['grid-products', currentPage, searchParams.toString()],
    queryFn: () => fetchProducts(searchParams.toString()),
  });

  const { data: wishlistData } = useQuery<WishlistResponse>({
    queryKey: ['user-wishlist'],
    queryFn: fetchWishlist,
  });

  const totalPages = data?.payload?.metadata?.totalPages || 1;

  const products: Product[] = useMemo(() => {
    const rawProducts = data?.payload?.data || [];
    const wishlistItems = wishlistData?.payload?.wishlistItems || [];

    const wishlistMap = new Map<string, string>(
      wishlistItems.map((item) => [item.productId, item.id])
    );

    return rawProducts.map((product) => ({
      ...product,
      isWishlisted: wishlistMap.has(String(product.id)),
      wishlistItemId: wishlistMap.get(String(product.id)) || null,
    }));
  }, [data, wishlistData]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    products,
    isLoading,
    currentPage,
    totalPages,
    handlePageChange,
  };
}