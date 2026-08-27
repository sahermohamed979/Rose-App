'use server';

import { getDirectToken } from '@/shared/lib/utils/get-direct-token';
import { ClearWishlistResponse } from '../types/clear-wishlist';

export default async function clearWishListAction() {
  const token = await getDirectToken();

  const response = await fetch(
    `${process.env.NEXT_API_URL}/wishlist`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: ClearWishlistResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
