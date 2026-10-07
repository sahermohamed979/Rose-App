'use server';

import { ApiResponse } from '@/shared/lib/types/api';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { OccasionType } from '@/shared/lib/types/product-types';

interface GetOccasionPayload {
  occasion: OccasionType;
}

export const getOccasion = async (
  id: string
): Promise<ApiResponse<GetOccasionPayload>> => {
  const jwt = await getAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    return { status: false, code: 401, message: 'Unauthorized' };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/occasions/${id}`,
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
