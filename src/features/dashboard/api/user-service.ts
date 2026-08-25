import { cache } from 'react';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import { RESPONSES } from '@/shared/lib/constants/response.constant';
import {
  ApiResponse,
  UserProfilePayload,
} from '@/shared/lib/types/api';

export const getUserProfile = cache(async () => {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/users/profile`,
      {
        method: 'GET',
        headers: {
          ...HEADERS.authorization(token.accessToken),
        },
        cache: 'no-store',
      }
    );
    const data: ApiResponse<UserProfilePayload> =
      await response.json();

    if (!data.status) {
      return {
        status: false,
        message: data.message,
        code: response.status,
      };
    }
    return {
      status: true,
      payload: data.payload,
    };
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred',
      code: 500,
    };
  }
}

export async function updateUserProfile(
  payload: FormData | Record<string, unknown>
): Promise<
  | { status: true; payload: UserProfilePayload }
  | { status: false; message: string; code?: number }
> {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    const isFormData = payload instanceof FormData;
    const headers: Record<string, string> = {
      ...HEADERS.authorization(token.accessToken),
    };

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(
      `${process.env.NEXT_API_URL}/users/profile`,
      {
        method: 'PATCH',
        headers,
        body: isFormData ? payload : JSON.stringify(payload),
      }
    );

    const data = await response.json();
    if (!data.status) {
      let detailedMessage = data.message;
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        detailedMessage = data.errors
          .map((e: { message?: string; path?: string }) => e.message || e.path)
          .filter(Boolean)
          .join(', ');
      }
      return {
        status: false,
        message: detailedMessage ?? 'Failed to update profile',
        code: response.status,
      };
    }
    return {
      status: true,
      payload: data.payload,
    };
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred',
      code: 500,
    };
  }
}

export async function uploadImage(
  file: File
): Promise<
  | { status: true; url: string }
  | { status: false; message: string; code?: number }
> {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(
      `${process.env.NEXT_API_URL}/upload`,
      {
        method: 'POST',
        headers: {
          ...HEADERS.authorization(token.accessToken),
        },
        body: formData,
      }
    );

    const data = await response.json();
    if (!data.status) {
      return {
        status: false,
        message: data.message ?? 'Failed to upload image',
        code: response.status,
      };
    }
    return {
      status: true,
      url: data.payload.url,
    };
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred during image upload',
      code: 500,
    };
  }
}

export async function deleteUserAccount(): Promise<
  { status: true } | { status: false; message: string; code?: number }
> {
  const token = await getAuthToken();
  if (!token?.accessToken) {
    return RESPONSES.Unauthorized;
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/users/account`,
      {
        method: 'DELETE',
        headers: {
          ...HEADERS.authorization(token.accessToken),
        },
      }
    );
    const data: ApiResponse<null> = await response.json();
    if (!data.status) {
      return {
        status: false,
        message: data.message ?? 'Failed to delete account',
        code: response.status,
      };
    }
    return { status: true };
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred',
      code: 500,
    };
  }
}
});
