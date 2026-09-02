import { getAuthToken } from '@/shared/lib/actions/getToken';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import { RESPONSES } from '@/shared/lib/constants/response.constant';
import { ApiResponse } from '@/shared/lib/types/api';
import { WishlistPayload } from '../types/wishlist-products';

export async function getWishlistData(): Promise<
  ApiResponse<WishlistPayload>
> {
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
    const data: ApiResponse<WishlistPayload> = await response.json();
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
