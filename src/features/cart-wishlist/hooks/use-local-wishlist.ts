'use client';

import { useQuery } from '@tanstack/react-query';

import { CART_WISHLIST_KEYS } from '../constants/query-keys';
import { getLocalWishlist } from '../lib/local-wishlist-client';

export function useLocalWishlist(enabled: boolean = true) {
  const { data, isPending, error, refetch, isLoading } = useQuery({
    queryKey: CART_WISHLIST_KEYS.local_wishlist,
    enabled: typeof window !== 'undefined' && enabled,
    queryFn: () => getLocalWishlist(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    data,
    isPending,
    error,
    refetch,
    isLoading,
  };
}
