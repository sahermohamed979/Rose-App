'use client';

import { useQuery } from '@tanstack/react-query';

import { getWishlistAction } from '../apis/wishlist-actions';
import { CART_WISHLIST_KEYS } from '../constants/query-keys';

export function useWishlist(enabled: boolean) {
  return useQuery({
    queryKey: CART_WISHLIST_KEYS.wishlist,
    queryFn: getWishlistAction,
    enabled,
  });
}
