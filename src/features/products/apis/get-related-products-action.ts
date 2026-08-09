import { getDirectToken } from '@/shared/lib/actions/get-direct-token';
import { RelatedProductsApiResponse } from '../types/get-related-product-type';

export default async function getRelatedProductsAction(
  categoryId: string
): Promise<
  | RelatedProductsApiResponse
  | { status: false; message: string; code: number }
> {
  const token = await getDirectToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/categories/${categoryId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const payload: RelatedProductsApiResponse = await response.json();

    if (!response.ok || !payload.status) {
      return {
        status: false,
        message: 'Something went wrong',
        code: response.status,
      };
    }

    return payload;
  } catch (_error) {
    return {
      status: false,
      message: 'Server error — something went wrong',
      code: 500,
    };
  }
}
