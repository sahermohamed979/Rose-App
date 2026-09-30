'use server';

import { ApiResponse } from '@/shared/lib/types/api';
import { getAuthToken } from '@/shared/lib/actions/getToken';

export const deleteCategory = async (
  id: string
): Promise<ApiResponse<string>> => {
  try {
    const jwt = await getAuthToken();
    const token = jwt?.accessToken;

    if (!token) {
      return { status: false, code: 401, message: 'Unauthorized' };
    }

    const response = await fetch(
      `${process.env.NEXT_API_URL}/categories/${id}`,
      {
        method: 'DELETE',
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
