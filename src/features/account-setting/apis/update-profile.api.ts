'use server';

import { ApiResponse } from '@/shared/lib/types/api';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import {
  UpdateProfilePayload,
  UpdateProfileResponse,
} from '../types/update-profile-type';

export const updateProfile = async (
  data: UpdateProfilePayload
): Promise<ApiResponse<UpdateProfileResponse>> => {
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
      `${process.env.NEXT_API_URL}/users/profile`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const result: ApiResponse<UpdateProfileResponse> =
      await response.json();

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
