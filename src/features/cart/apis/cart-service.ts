import { getAuthToken } from '@/shared/lib/actions/getToken';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import { RESPONSES } from '@/shared/lib/constants/response.constant';
import { ApiResponse } from '@/shared/lib/types/api';
import { ICartResponse } from '../types/cart-types';

export async function getCart() {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/cart`, {
      method: 'GET',
      headers: {
        ...HEADERS.authorization(token.accessToken),
      },
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
