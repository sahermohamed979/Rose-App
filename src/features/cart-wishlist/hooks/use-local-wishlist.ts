'use client';

import { useQuery } from '@tanstack/react-query';

import { CART_WISHLIST_KEYS } from '../constants/query-keys';
import { getLocalWishlist } from '../lib/local-wishlist-client';

export function useLocalWishlist() {
  const { data, isPending, error, refetch, isLoading } = useQuery({
    queryKey: CART_WISHLIST_KEYS.local_wishlist,
    queryFn: () => getLocalWishlist(),
  });

  return {
    data,
    isPending,
    error,
    refetch,
    isLoading,
  };
}
