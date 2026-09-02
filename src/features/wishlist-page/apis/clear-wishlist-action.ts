'use server';

import { ClearWishlistResponse } from '../types/clear-wishlist';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { RESPONSES } from '@/shared/lib/constants/response.constant';

export default async function clearWishListAction() {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  const response = await fetch(
    `${process.env.NEXT_API_URL}/wishlist`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
    }
  );

  const data: ClearWishlistResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
