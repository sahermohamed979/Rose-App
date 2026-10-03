'use server';

import type { ApiResponse } from '@/shared/lib/types/api';
import { getDirectToken } from '@/shared/lib/utils/get-direct-token';

export interface CheckPaymentStatusResponse {
  sessionId: string;
  paymentStatus: string;
  sessionStatus: string;
  amountTotal: number;
  currency: string;
  order: {
    orderId: string;
    paymentStatus: string;
  };
}

export async function checkPaymentStatus(
  sessionId: string
): Promise<ApiResponse<CheckPaymentStatusResponse>> {
  try {
    const token = await getDirectToken();

    if (!token) {
      return {
        status: false,
        code: 401,
        message: 'Unauthorized',
      };
    }

    const response = await fetch(
      `${process.env.NEXT_API_URL}/payments/checkout-session?session_id=${sessionId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );

    const result: ApiResponse<CheckPaymentStatusResponse> =
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
}
