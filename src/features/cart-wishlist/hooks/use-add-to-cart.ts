'use client';

import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { ICart } from '@/features/cart/types/cart-types';
import addToCartAction from '../apis/add-to-cart-action';
import { CART_WISHLIST_KEYS } from '../constants/query-keys';
import saveCartItemToLocalStorage from '../lib/local-cart-client';
import { useTranslations } from 'next-intl';

export function useAddToCart() {
  // Context
  const { status } = useSession();

  // Hooks
  const queryClient = useQueryClient();

  // Mutation
  const t = useTranslations('products');
  const { mutate, isPending } = useMutation({
    mutationFn: addToCartAction,
    mutationKey: CART_WISHLIST_KEYS.cart,
    onSuccess: (data) => {
      if (!data.status) {
        toast.error(data.message);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: CART_WISHLIST_KEYS.cart,
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
      toast.success(t('addToCartSuccess'));
      return;
    }

    mutate({ productId, quantity });
  };

  return { handleAddToCart, isPending };
}
