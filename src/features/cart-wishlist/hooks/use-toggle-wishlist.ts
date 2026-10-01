'use client';

import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import {
  addToWishlistAction,
  removeFromWishlistAction,
} from '../apis/wishlist-actions';
import { CART_WISHLIST_KEYS } from '../constants/query-keys';
import { toggleLocalWishlistItem } from '../lib/local-wishlist-client';

export function useToggleWishlist() {
  // Context
  const { status } = useSession();

  // Hooks
  const queryClient = useQueryClient();
  const t = useTranslations('products');

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      productId,
      isAddedToWishlist,
    }: {
      productId: string;
      isAddedToWishlist: boolean;
    }) => {
      if (isAddedToWishlist) {
        return removeFromWishlistAction(productId);
      }

      return addToWishlistAction(productId);
    },
    retry: false,
    onSuccess: (data, variables) => {
      if (!data.status) {
        toast.error(data.message);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: CART_WISHLIST_KEYS.wishlist,
      });
      toast.success(
        variables.isAddedToWishlist
          ? t('removeFromWishlistSuccess')
          : t('addToWishlistSuccess')
      );
    },
    onError: (_, variables) => {
      toast.error(
        variables.isAddedToWishlist
          ? t('removeFromWishlistError')
          : t('addToWishlistError')
      );
    },
  });

  // Functions
  const handleToggleWishlist = ({
    productId,
    isAddedToWishlist,
  }: {
    productId: string;
    isAddedToWishlist: boolean;
  }) => {
    if (status === 'loading') {
      return;
    }

    if (status === 'unauthenticated') {
      const isAdded = toggleLocalWishlistItem(productId);

      queryClient.invalidateQueries({
        queryKey: CART_WISHLIST_KEYS.local_wishlist,
      });

      toast.success(
        isAdded
          ? t('addToWishlistSuccess')
          : t('removeFromWishlistSuccess')
      );
      return;
    }

    mutate({ productId, isAddedToWishlist });
  };

  return { handleToggleWishlist, isPending };
}
