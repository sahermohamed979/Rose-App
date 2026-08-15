'use server';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import { HEADERS } from '@/shared/lib/constants/api.constants';
import { RESPONSES } from '@/shared/lib/constants/response.constant';
import { AddressesResponse } from '@/shared/lib/types/adresses.type';

export async function getUserAddresses(): Promise<AddressesResponse> {
  try {
    const token = await getAuthToken();

    if (!token?.accessToken) {
      return RESPONSES.Unauthorized;
    }

    const response = await fetch(
      `${process.env.NEXT_API_URL}/addresses`,
      {
        method: 'GET',
        headers: {
          ...HEADERS.authorization(token.accessToken),
        },
        cache: 'no-store',
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        status: false,
        message: data?.message || `HTTP Error: ${response.status}`,
        code: response.status,
      };
    }
    return data;
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : 'A network error occurred',
      code: 500,
    };
  }
}
