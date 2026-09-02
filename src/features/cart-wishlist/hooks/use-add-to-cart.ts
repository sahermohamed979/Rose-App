'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { ICart } from '@/features/cart/types/cart-types';
import addToCartAction from '../apis/add-to-cart-action';
import saveCartItemToLocalStorage from '../lib/local-cart-client';
import { useTranslations } from 'next-intl';
import { CART_LOCAL_KEYS } from '@/features/cart/constants/query-key-cart';
import { toast } from 'sonner';

export function useAddToCart() {
  // Context
  const { status } = useSession();

  // Hooks
  const queryClient = useQueryClient();

  // Mutation
  const t = useTranslations('products');
  const { mutate, isPending } = useMutation({
    mutationFn: addToCartAction,
    onSuccess: (data) => {
      if (!data.status) {
        toast.error(data.message);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: CART_LOCAL_KEYS.local_cart,
      });
      toast.success(t('addToCartSuccess'));
    },
    onError: () => {
      toast.error(t('addToCartError'));
    },
  });

  // Functions
  const handleAddToCart = ({ productId, quantity = 1 }: ICart) => {
    if (status === 'loading') {
      return;
    }

    if (status === 'unauthenticated') {
      saveCartItemToLocalStorage({ productId, quantity });
      queryClient.invalidateQueries({
        queryKey: CART_LOCAL_KEYS.local_cart,
      });
      toast.success(t('addToCartSuccess'));
      return;
    }

    mutate({ productId, quantity });
  };

  return { handleAddToCart, isPending };
}
