import { getDirectToken } from '@/shared/lib/utils/get-direct-token';
import type { OrdersResponse } from '../types/order-types';

interface GetOrdersParams {
  page?: number;
  limit?: number;
}

export async function getOrders({
  page = 1,
  limit = 12,
}: GetOrdersParams = {}): Promise<OrdersResponse> {
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
      `${process.env.NEXT_API_URL}/orders?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );

    const data: OrdersResponse = await response.json();

    if (!response.ok) {
      return {
        status: false,
        code: response.status,
        message:
          data.status === false
            ? data.message
            : 'Failed to fetch orders',
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
          : 'Network error occurred',
    };
  }
}
