import { HEADERS } from '@/shared/lib/constants/api.constants';
import {
  ApiResponse,
  IPaginationResponse,
} from '@/shared/lib/types/api';
import {
  ICategory,
  IOccasion,
} from '@/shared/lib/types/product-details';

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

    const data: ApiResponse<IPaginationResponse<ICategory>> =
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
      `${process.env.NEXT_API_URL}/occasions`,
      {
        method: 'GET',
        headers: {
          ...HEADERS.jsonBody,
        },
      }
    );

    const data: ApiResponse<IPaginationResponse<IOccasion>> =
      await response.json();
    if (!data.status) {
      return null;
    }

    return data.payload.data;
  } catch {
    return null;
  }
}
