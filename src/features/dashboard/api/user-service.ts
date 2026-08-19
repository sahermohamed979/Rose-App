import { getAuthToken } from '@/shared/lib/actions/getToken';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import { RESPONSES } from '@/shared/lib/constants/response.constant';
import {
  ApiResponse,
  UserProfilePayload,
} from '@/shared/lib/types/api';

export async function getUserProfile() {
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
