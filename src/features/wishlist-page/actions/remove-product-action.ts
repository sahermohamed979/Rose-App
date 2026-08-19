'use server';

import { getDirectToken } from '@/shared/lib/utils/get-direct-token';
import { RemoveProductResponse } from '../types/remove-product';

export default async function removeProductactions(
  productId: string
) {
  const token = await getDirectToken();

  const response = await fetch(
    `${process.env.NEXT_API_URL}/wishlist/${productId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: RemoveProductResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
