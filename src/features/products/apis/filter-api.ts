import { HEADERS } from '@/shared/lib/constants/api.constants';
import {
  ApiResponse,
  IPaginationResponse,
} from '@/shared/lib/types/api';
import {
  ProductCategory,
  OccasionType,
} from '@/shared/lib/types/product-types';

export async function getCategories() {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/categories?page=1&limit=1000`,
      {
        method: 'GET',
        headers: {
          ...HEADERS.jsonBody,
        },
      }
    );

    const data: ApiResponse<IPaginationResponse<ProductCategory>> =
      await response.json();
    if (!data.status) {
      return null;
    }

    return data.payload.data;
  } catch {
    return null;
  }
}
export async function getOccasions() {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/occasions?page=1&limit=1000`,
      {
        method: 'GET',
        headers: {
          ...HEADERS.jsonBody,
        },
      }
    );

    const data: ApiResponse<IPaginationResponse<OccasionType>> =
      await response.json();
    if (!data.status) {
      return null;
    }

    return data.payload.data;
  } catch {
    return null;
  }
}
