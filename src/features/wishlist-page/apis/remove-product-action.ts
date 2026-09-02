'use server';

import { RemoveProductResponse } from '../types/remove-product';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { RESPONSES } from '@/shared/lib/constants/response.constant';

export default async function removeProductActions(
  productId: string
) {
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

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
