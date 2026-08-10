'use server';

import { ApiResponse, ErrorResponse } from "@/shared/lib/types/api";
import { ChangePasswordValues } from "../schemas/change-password.schema";
import { getAuthToken } from "@/shared/lib/actions/getToken";


export const changePassword = async (
  data: ChangePasswordValues
): Promise<ApiResponse<string>> => {
  try {
    const jwt = await getAuthToken();
    const token = jwt?.accessToken;

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
  } catch (error: any) {
    return {
      status: false,
      message: error.message,
    };
  }
};
