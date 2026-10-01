'use server';

import { ApiResponse } from '@/shared/lib/types/api';
import { getAuthToken } from '@/shared/lib/actions/getToken';

export const deleteAccount = async (): Promise<ApiResponse<null>> => {
  try {
    const jwt = await getAuthToken();
    const token = jwt?.accessToken;

    if (!token) {
      return {
        status: false,
        code: 401,
        message: 'Unauthorized',
      };
    }

    const response = await fetch(
      `${process.env.NEXT_API_URL}/users/account`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result: ApiResponse<null> = await response.json();

    return result;
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
