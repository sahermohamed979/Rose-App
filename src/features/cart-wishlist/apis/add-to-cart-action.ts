'use server';

import { ICartResponse } from '@/features/cart/types/cart-types';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import { RESPONSES } from '@/shared/lib/constants/response.constant';
import { ApiResponse } from '@/shared/lib/types/api';
import { ICart } from '@/features/cart/types/cart-types';
import { updateTag } from 'next/cache';

export default async function addToCartAction({
  productId,
  quantity = 1,
}: ICart) {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/cart`, {
      method: 'POST',
      headers: {
        ...HEADERS.jsonBody,
        ...HEADERS.authorization(token.accessToken),
      },
      body: JSON.stringify({
        productId,
        quantity: quantity || 1,
      }),
      next: {
        tags: ['cart'],
      },
    });
    const data: ApiResponse<ICartResponse> = await response.json();
    if (!data.status) {
      return {
        status: false,
        message: data.message,
        code: response.status,
      };
    }
    updateTag('cart');

    return {
      status: true,
      message: data.message,
      code: response.status,
    };
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred',
      code: 500,
    };
  }
}
