import { getDirectToken } from '@/shared/lib/utils/get-direct-token';
import type { SingleOrderResponse } from '../types/order-types';

export async function getOrderById(
  id: string
): Promise<SingleOrderResponse> {
  const token = await getDirectToken();

  if (!token) {
    return {
      status: false,
      code: 401,
      message: 'Unauthorized',
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/orders/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );

    const data: SingleOrderResponse = await response.json();

    if (!response.ok) {
      return {
        status: false,
        code: response.status,
        message:
          data.status === false
            ? data.message
            : 'Failed to fetch order',
      };
    }

    return data;
  } catch (error: unknown) {
    return {
      status: false,
      code: 500,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to fetch order',
    };
  }
}
