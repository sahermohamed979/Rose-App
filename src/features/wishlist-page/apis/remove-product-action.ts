'use server';

import { RemoveProductResponse } from '../types/remove-product';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { RESPONSES } from '@/shared/lib/constants/response.constant';
import { updateTag } from 'next/cache';

export default async function removeProductActions(
  productId: string
) {
  try {
    const token = await getAuthToken();
    if (!token?.accessToken) {
      return RESPONSES.Unauthorized;
    }
    const response = await fetch(
      `${process.env.NEXT_API_URL}/wishlist/${productId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      }
    );

    const data: RemoveProductResponse = await response.json();

    if (!data.status) {
      return {
        status: false,
        message: data.message,
        code: response.status,
      };
    }
    updateTag('wishlist');

    return data;
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
