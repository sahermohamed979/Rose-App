'use server';

// ============================================================================
// Coupon API Endpoint is currently unavailable on the backend.
// Commented out until backend endpoint is finalized.
// ============================================================================

/*
import type { ApiResponse } from '@/shared/lib/types/api';
import { getAuthToken } from '@/shared/lib/actions/getToken';
import type { CouponsPayload } from '../types/cart.types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function applyCoupon(
  code: string
): Promise<ApiResponse<CouponsPayload>> {
  try {
    const jwt = await getAuthToken();
    const token = jwt?.token;

    const params = new URLSearchParams({ code });

    const res = await fetch(`${BASE_URL}/coupons?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok || !data.status) {
      return {
        status: false,
        message: data?.message || `Request failed (${res.status})`,
      };
    }

    return data as ApiResponse<CouponsPayload>;
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error ? error.message : 'Server unreachable',
    };
  }
}
*/
