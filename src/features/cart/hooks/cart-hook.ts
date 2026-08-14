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
import { useQueryClient } from '@tanstack/react-query';
import { CART_LOCAL_KEYS } from '../constants/query-key-cart';
import { useRouter } from '@/i18n/navigation';

export function useCartMutations() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const queryClient = useQueryClient();
  const router = useRouter();

  // remove from  cart

  const handleSuccess = () => {
    if (isAuthenticated) {
      router.refresh();
    } else {
      queryClient.invalidateQueries({
        queryKey: CART_LOCAL_KEYS.local_cart,
      });
    }
  };
  const clearCart = useMutation({
    mutationFn: async () => {
      if (status === 'loading') {
        return;
      }

      if (isAuthenticated) {
        const res = await clearCartAction();
        if (!res.status) {
          throw new Error(res.message);
        }
        return res;
      }
      clearLocalCart();
    },
    onSuccess() {
      handleSuccess();
    },
  });
  // remove from cart by id
  const RemoveCartById = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      if (status === 'loading') {
        return;
      }
      if (isAuthenticated) {
        const res = await removeCartItemAction(id);
        if (!res.status) {
          throw new Error(res.message);
        }
        return res;
      }

      clearLocalIndex(id);
    },

    onSuccess() {
      handleSuccess();
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
      if (status === 'loading') {
        return;
      }
      if (isAuthenticated) {
        const res = await updateCartItemAction(id, quantity);
        if (!res.status) {
          throw new Error(res.message);
        }
        return res;
      }
      updateLocalQuantity({ productId: id, quantity });
    },
    onSuccess() {
      handleSuccess();
    },
  });

  return { clearCart, RemoveCartById, UpdateCartQuantity };
}
