import { useMutation } from '@tanstack/react-query';
import {
  clearCartAction,
  removeCartItemAction,
  updateCartItemAction,
} from '../apis/cart-actions';
import { useSession } from 'next-auth/react';
import {
  clearLocalCart,
  clearLocalIndex,
  updateLocalQuantity,
} from '@/features/cart-wishlist/lib/local-cart-client';

export function useCartMutations() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  // remove from  cart
  const clearCart = useMutation({
    mutationFn: async () => {
      if (isAuthenticated) {
        const res = await clearCartAction();
        if (!res.status) {
          throw new Error(res.message);
        }
        return res;
      }

      clearLocalCart();
    },
  });
  // remove from cart by id
  const RemoveCartById = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      if (isAuthenticated) {
        const res = await removeCartItemAction(id);
        if (!res.status) {
          throw new Error(res.message);
        }
        return res;
      }
      clearLocalIndex(id);
    },
  });

  // update cart quantity
  const UpdateCartQuantity = useMutation({
    mutationFn: async ({
      id,
      quantity,
    }: {
      id: string;
      quantity: number;
    }) => {
      if (isAuthenticated) {
        const res = await updateCartItemAction(id, quantity);
        if (!res.status) {
          throw new Error(res.message);
        }
        return res;
      }
      updateLocalQuantity({ productId: id, quantity });
    },
  });

  return { clearCart, RemoveCartById, UpdateCartQuantity };
}
