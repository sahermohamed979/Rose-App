'use server';

import { ApiResponse } from '@/shared/lib/types/api';
import { getAuthToken } from '@/shared/lib/actions/getToken';

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
    const token = await getAuthToken();

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
