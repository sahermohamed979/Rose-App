'use server';

import { ApiResponse } from '@/shared/lib/types/api';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { ChangePasswordValues } from '../schemas/change-password.schema';

export const changePassword = async (
  data: ChangePasswordValues
): Promise<ApiResponse<string>> => {
  try {
    const jwt = await getAuthToken();
    const token = jwt?.accessToken;

    if (!token) {
      return {
        status: false,
        code: 419,
        message: 'SESSION_EXPIRED',
      };
    }

    const response = await fetch(
      `${process.env.NEXT_API_URL}/users/change-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const result: ApiResponse<string> = await response.json();

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
