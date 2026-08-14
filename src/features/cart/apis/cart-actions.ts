'use server';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import { RESPONSES } from '@/shared/lib/constants/response.constant';
import { SuccessResponseNoPayload } from '@/shared/lib/types/api';
import { updateTag } from 'next/cache';
import { cartQuantitySchema } from '../schema/cart-quantity-schema';

export async function clearCartAction() {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/cart`, {
      method: 'DELETE',
      headers: {
        ...HEADERS.authorization(token.accessToken),
      },
    });
    const data: SuccessResponseNoPayload = await response.json();

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
export async function removeCartItemAction(id: string) {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/cart/${id}`,
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
export async function updateCartItemAction(
  id: string,
  quantity: number
) {
  const value = cartQuantitySchema.safeParse({ quantity });
  if (!value.success) {
    return {
      status: false,
      message: 'Invalid quantity',
      code: 400,
    };
  }

  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/cart/${id}`,
      {
        method: 'PATCH',
        headers: {
          ...HEADERS.authorization(token.accessToken),
          ...HEADERS.jsonBody,
        },
        body: JSON.stringify(value.data),
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
