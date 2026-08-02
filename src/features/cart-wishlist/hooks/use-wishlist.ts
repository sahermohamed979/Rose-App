import { useQuery } from '@tanstack/react-query';
import { CART_WISHLIST_KEYS } from '../constants/query-keys';
import { WishlistApiResponse } from '../types/cart-wishlist.types';

export function useWishlist(enabled: boolean) {
  return useQuery({
    queryKey: CART_WISHLIST_KEYS.wishlist,
    queryFn: fetchWishlist,
    enabled,
  });
}

const fetchWishlist = async (): Promise<WishlistApiResponse> => {
  const response = await fetch('/api/wishlist');
  if (!response.ok) {
    throw new Error('Failed to fetch wishlist');
  }
  return response.json();
};
