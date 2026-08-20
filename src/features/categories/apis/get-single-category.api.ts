'use server';

import { ApiResponse } from '@/shared/lib/types/api';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { CategoryWithCount } from '../types/categories-type';

interface GetCategoryPayload {
  category: CategoryWithCount;
}

export const getCategory = async (
  id: string
): Promise<ApiResponse<GetCategoryPayload>> => {
  try {
    const jwt = await getAuthToken();
    const token = jwt?.accessToken;

    if (!token) {
      return { status: false, code: 401, message: 'Unauthorized' };
    }

    const response = await fetch(
      `${process.env.NEXT_API_URL}/categories/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();
  } catch (error: unknown) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong',
    };
  }
};
