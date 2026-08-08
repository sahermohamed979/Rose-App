'use server';

import { updateTag } from 'next/cache';

import { getAuthToken } from '@/shared/lib/actions/getToken';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import { RESPONSES } from '@/shared/lib/constants/response.constant';
import {
  ApiResponse,
  SuccessResponseNoPayload,
} from '@/shared/lib/types/api';
import { WishlistResponse } from '../types/cart-wishlist.types';

export async function getWishlistAction() {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/wishlist`,
      {
        method: 'GET',
        headers: {
          ...HEADERS.authorization(token.accessToken),
        },
        next: {
          tags: ['wishlist'],
        },
      }
    );

    const data: ApiResponse<WishlistResponse> = await response.json();

    if (!data.status) {
      return {
        status: false,
        message: data.message,
        code: response.status,
      };
    }

    return {
      status: true,
      payload: data.payload,
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

export async function addToWishlistAction(productId: string) {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/wishlist`,
      {
        method: 'POST',
        headers: {
          ...HEADERS.jsonBody,
          ...HEADERS.authorization(token.accessToken),
        },
        body: JSON.stringify({ productId }),
        next: {
          tags: ['wishlist'],
        },
      }
    );

    const data: SuccessResponseNoPayload = await response.json();

    if (!data.status) {
      return {
        status: false,
        message: data.message,
        code: response.status,
      };
    }

    updateTag('wishlist');

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

export async function removeFromWishlistAction(productId: string) {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }

  try {
    const wishlist = await getWishlistAction();

    if (!wishlist.status || !wishlist.payload) {
      return {
        status: false,
        message: wishlist.message ?? 'Failed to fetch wishlist',
        code: 'code' in wishlist ? wishlist.code : 500,
      };
    }

    const wishlistItem = wishlist.payload.wishlistItems.find(
      (item) => item.productId === productId
    );

    if (!wishlistItem) {
      return {
        status: false,
        message: 'Product is not in wishlist',
        code: 404,
      };
    }

    const response = await fetch(
      `${process.env.NEXT_API_URL}/wishlist/${wishlistItem.id}`,
      {
        method: 'DELETE',
        headers: {
          ...HEADERS.authorization(token.accessToken),
        },
      }
    );

    const data: SuccessResponseNoPayload = await response.json();

    if (!data.status) {
      return {
        status: false,
        message: data.message,
        code: response.status,
      };
    }

    updateTag('wishlist');

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
