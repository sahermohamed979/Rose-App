'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchProducts } from '../apis/products-api';
import { fetchWishlist } from '../apis/wishlist-api';
import { fetchCart } from '../apis/cart-api';
import { CartResponse, Product, ProductsResponse, WishlistResponse } from '../types/products-types';
import { usePagination } from './use-pagination';

// Builds a productId -> itemId lookup map from wishlist or cart items
function buildProductItemMap(items: { productId: string; id: string }[]): Map<string, string> {
  return new Map(items.map((item) => [item.productId, item.id]));
}

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

  const { data: wishlistData } = useQuery<WishlistResponse>({
    queryKey: ['user-wishlist'],
    queryFn: fetchWishlist,
  });

  const { data: cartData } = useQuery<CartResponse>({
    queryKey: ['user-cart'],
    queryFn: fetchCart,
  });

  // Variables (derived)
  const totalPages = data?.payload?.metadata?.totalPages || 1;

  const products: Product[] = useMemo(() => {
    const rawProducts = data?.payload?.data || [];
    const wishlistMap = buildProductItemMap(wishlistData?.payload?.wishlistItems || []);
    const cartMap = buildProductItemMap(cartData?.payload?.cartItems || []);

    return rawProducts.map((product) => ({
      ...product,
      isWishlisted: wishlistMap.has(String(product.id)),
      wishlistItemId: wishlistMap.get(String(product.id)) || null,
      isInCart: cartMap.has(String(product.id)),
      cartItemId: cartMap.get(String(product.id)) || null,
    }));
  }, [data, wishlistData, cartData]);

  return {
    products,
    isLoading,
    currentPage,
    totalPages,
    handlePageChange,
  };
}