'use client';

import { useMutation } from '@tanstack/react-query';
import { removeCartItemAction } from '../apis/cart-actions';

export default function useRemoveCartById(id: string) {
  return useMutation({
    mutationFn: async () => {
      const res = await removeCartItemAction(id);
      if (!res.status) {
        throw new Error(res.message);
      }
      return res;
    },
  });
}
