import { useQuery } from '@tanstack/react-query';
import { ICart } from '../types/cart-types';
import { getLocalCartProducts } from '../apis/cart-actions';
import { CART_LOCAL_KEYS } from '../constants/query-key-cart';
import { getLocalCart } from '@/features/cart-wishlist/lib/local-cart-client';

export const useLocalCart = (enabled: boolean = true) => {
  const { data, isPending, error, refetch, isLoading } = useQuery({
    queryKey: CART_LOCAL_KEYS.local_cart,
    enabled: typeof window !== 'undefined' && enabled,

    queryFn: async () => {
      const clientCart: ICart[] = getLocalCart();

      return getLocalCartProducts(clientCart);
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    data,
    isPending,
    error,
    refetch,
    isLoading,
  };
};
