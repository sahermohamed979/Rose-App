'use client';

// 1. React / Next.js core

// 2. Third-party libraries
import { useMutation } from '@tanstack/react-query';

// 3. Internal aliases
import { clearCartAction } from '../apis/cart-actions';

export default function useClearCart() {
  // Navigation

  // Mutation
  return useMutation({
    mutationFn: async () => {
      const res = await clearCartAction();
      if (!res.status) {
        throw new Error(res.message);
      }
      return res;
    },
  });
}
