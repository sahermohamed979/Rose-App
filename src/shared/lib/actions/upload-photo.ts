'use server';

import { ApiResponse } from '@/shared/lib/types/api';
import { getAuthToken } from '@/shared/lib/actions/getToken';

export type UploadPhotoResponse = {
  url: string;
};

export const uploadPhoto = async (
  file: File
): Promise<ApiResponse<UploadPhotoResponse>> => {
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

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(
      `${process.env.NEXT_API_URL}/upload`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const result: ApiResponse<UploadPhotoResponse> =
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
