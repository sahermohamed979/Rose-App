'use server';

import {
  ApiResponse,
  IPaginationResponse,
} from '@/shared/lib/types/api';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { GetOccasionsParams } from '../types/occasions-type';
import { OccasionType } from '@/shared/lib/types/product-types';

export const getOccasions = async (
  params: GetOccasionsParams = {}
): Promise<ApiResponse<IPaginationResponse<OccasionType>>> => {
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
      `${process.env.NEXT_API_URL}/occasions?${searchParams.toString()}`,
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
