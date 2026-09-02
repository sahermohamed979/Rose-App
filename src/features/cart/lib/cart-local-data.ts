'use client';

import { getProductDetailsInfo } from '@/features/products/apis/product-details-info.api';
import { ICart } from '../types/cart-types';
import { ApiResponse } from '@/shared/lib/types/api';
import { ProductDetailsResponse } from '@/shared/lib/types/product-types';

export const cartLocal = async () => {
  const clientCart: ICart[] = JSON.parse(
    localStorage.getItem('client-cart') || '[]'
  );

  const cartItems: ICart[] = await Promise.all(
    clientCart.map(async (item) => {
      const response: ApiResponse<ProductDetailsResponse> =
        await getProductDetailsInfo(item.productId);
      if (!response.status) {
        return item;
      }

      return {
        ...item,
        product: response.payload.product,
      };
    })
  );

  return {
    cartItems,
  };
};
