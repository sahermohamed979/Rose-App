import { getAuthToken } from '@/shared/lib/actions/getToken';
import { AddressesResponse } from '@/shared/lib/types/adresses.type';

export async function getUserAddresses(): Promise<AddressesResponse> {
  try {
    const token = await getAuthToken();

    if (!token) {
      return {
        status: false,
        message: 'Unauthorized: No token found',
        code: 401,
      };
    }

    const response = await fetch(
      `${process.env.NEXT_API_URL}/addresses`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
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
