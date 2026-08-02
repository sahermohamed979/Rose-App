'use client';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRequireAuth } from '../lib/require-auth-client';
import { CART_WISHLIST_KEYS } from '../constants/query-keys';

export function useToggleWishlist() {
  const queryClient = useQueryClient();
  const { ensureAuth } = useRequireAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: toggleWishlistRequest,
    mutationKey: CART_WISHLIST_KEYS.wishlist,
    retry: false,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: CART_WISHLIST_KEYS.wishlist,
      });
      toast.success(
        variables.isAddedToWishlist
          ? 'Product removed from wishlist'
          : 'Product added to wishlist'
      );
      console.log(variables);
    },
    onError: (_, variables) => {
      toast.error(
        variables.isAddedToWishlist
          ? 'Failed to remove product from wishlist'
          : 'Failed to add product to wishlist'
      );
    },
  });
  const handleToggleWishlist = ({
    productId,
    isAddedToWishlist,
  }: {
    productId: string;
    isAddedToWishlist: boolean;
  }) => {
    if (!ensureAuth()) {
      return;
    }

    mutate({ productId, isAddedToWishlist });
  };
  return { handleToggleWishlist, isPending };
}
const toggleWishlistRequest = async ({
  productId,
  isAddedToWishlist,
}: {
  productId: string;
  isAddedToWishlist: boolean;
}) => {
  const method = isAddedToWishlist ? 'DELETE' : 'POST';
  const response = await fetch('/api/wishlist', {
    method,
    body: JSON.stringify({
      productId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to add product to wishlist');
  }
  return response.json();
};
