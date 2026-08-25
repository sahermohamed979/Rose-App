'use server';

import { ApiResponse } from '@/shared/lib/types/api';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import {
  RequestEmailChangePayload,
  ConfirmEmailChangePayload,
} from '../types/change-email-type';

export const requestEmailChange = async (
  data: RequestEmailChangePayload
): Promise<ApiResponse<string>> => {
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
      `${process.env.NEXT_API_URL}/users/email/request`,
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

export const confirmEmailChange = async (
  data: ConfirmEmailChangePayload
): Promise<ApiResponse<string>> => {
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
      `${process.env.NEXT_API_URL}/users/email/confirm`,
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
