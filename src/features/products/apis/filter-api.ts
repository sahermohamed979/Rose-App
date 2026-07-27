import { HEADERS } from '@/shared/lib/constants/api.constants';
import {
  ApiResponse,
  IPaginationResponse,
} from '@/shared/lib/types/api';
import { Category } from '@/shared/lib/types/product-details';

export async function getCategories() {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/categories`,
      {
        method: 'GET',
        headers: {
          ...HEADERS.jsonBody,
        },
      }
    );

    const data: ApiResponse<IPaginationResponse<Category>> =
      await response.json();
    if (!data.status) {
      return [];
    }

    return data.payload.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}
