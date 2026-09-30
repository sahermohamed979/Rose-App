'use server';

import { ApiResponse } from '@/shared/lib/types/api';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { UpdateOccasionPayload } from '../types/occasions-type';

export const updateOccasion = async (
  id: string,
  payload: UpdateOccasionPayload
): Promise<ApiResponse<string>> => {
  try {
    const jwt = await getAuthToken();
    const token = jwt?.accessToken;

    if (!token) {
      return { status: false, code: 401, message: 'Unauthorized' };
    }

    const response = await fetch(
      `${process.env.NEXT_API_URL}/occasions/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
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
