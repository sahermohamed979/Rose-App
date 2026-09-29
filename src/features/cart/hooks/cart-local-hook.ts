import { useQuery } from '@tanstack/react-query';
import { ICart } from '../types/cart-types';
import { getLocalCartProducts } from '../apis/cart-actions';
import { CART_LOCAL_KEYS } from '../constants/query-key-cart';
import { getLocalCart } from '@/features/cart-wishlist/lib/local-cart-client';

export const useLocalCart = () => {
  const { data, isPending, error, refetch, isLoading } = useQuery({
    queryKey: CART_LOCAL_KEYS.local_cart,

    queryFn: async () => {
      const clientCart: ICart[] = getLocalCart();

      return getLocalCartProducts(clientCart);
    },
  });

  return {
    data,
    isPending,
    error,
    refetch,
    isLoading,
  };
};
