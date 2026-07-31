'use client';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRequireAuth } from '../lib/require-auth-client';
import { CART_WISHLIST_KEYS } from '../constants/query-keys';

export function useAddToCart() {
  const queryClient = useQueryClient();
  const { ensureAuth } = useRequireAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: addToCartRequest,
    mutationKey: CART_WISHLIST_KEYS.cart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CART_WISHLIST_KEYS.cart,
      });
      toast.success('Product added to cart');
    },
    onError: () => {
      toast.error('Failed to add product to cart');
    },
  });
  const handleAddToCart = ({
    productId,
    quantity = 1,
  }: {
    productId: string;
    quantity?: number;
  }) => {
    if (!ensureAuth()) {
      return;
    }
    mutate({ productId, quantity });
  };
  return { handleAddToCart, isPending };
}
const addToCartRequest = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  const response = await fetch('/api/cart', {
    method: 'POST',
    body: JSON.stringify({
      productId,
      quantity: quantity || 1,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to add product to cart');
  }
  return response.json();
};
