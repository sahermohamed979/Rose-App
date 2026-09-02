'use server';

import {
  ApiResponse,
  IPaginationResponse,
} from '@/shared/lib/types/api';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import {
  CategoryWithCount,
  GetCategoriesParams,
} from '../types/categories-type';

export const getCategories = async (
  params: GetCategoriesParams = {}
): Promise<ApiResponse<IPaginationResponse<CategoryWithCount>>> => {
  try {
    const jwt = await getAuthToken();
    const token = jwt?.accessToken;

    if (!token) {
      return { status: false, code: 401, message: 'Unauthorized' };
    }

    const searchParams = new URLSearchParams();
    if (params.page) {
      searchParams.set('page', String(params.page));
    }
    if (params.limit) {
      searchParams.set('limit', String(params.limit));
    }
    if (params.search) {
      searchParams.set('search', params.search);
    }

    const response = await fetch(
      `${process.env.NEXT_API_URL}/categories?${searchParams.toString()}`,
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
