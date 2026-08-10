'use server';

import type { CouponApiItem } from '../types/cart.types';

const BASE_URL =
  process.env.NEXT_API_URL || process.env.NEXT_PUBLIC_API_URL;

export async function validateCoupon(
  code: string
): Promise<CouponApiItem | null> {
  try {
    const params = new URLSearchParams({
      isActive: 'true',
      search: code.trim(),
    });

    const res = await fetch(`${BASE_URL}/coupons?${params}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    const match: CouponApiItem | undefined = (
      data?.payload?.data ?? []
    ).find(
      (c: CouponApiItem) =>
        c.code.toUpperCase() === code.trim().toUpperCase()
    );

    return match ?? null;
  } catch {
    return null;
  }
}
