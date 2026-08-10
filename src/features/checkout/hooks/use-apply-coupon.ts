'use client';

import { useState, useTransition } from 'react';
import { validateCoupon } from '../apis/cart.api';
import type { CouponResult } from '../types/cart.types';

function computeDiscount(
  type: 'PERCENT' | 'FIXED',
  rawValue: string,
  rawMaxDiscount: string | undefined,
  subtotal: number
): number {
  const value = parseFloat(rawValue) || 0;
  const maxDiscount = rawMaxDiscount
    ? parseFloat(rawMaxDiscount)
    : Infinity;

  if (type === 'PERCENT') {
    const computed =
      Math.round(((subtotal * value) / 100) * 100) / 100;
    return Math.min(computed, maxDiscount, subtotal);
  }

  // FIXED
  return Math.min(value, subtotal);
}

export function useApplyCoupon(subtotal: number) {
  const [couponResult, setCouponResult] =
    useState<CouponResult | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const apply = (code: string) => {
    setCouponError(null);

    startTransition(async () => {
      const coupon = await validateCoupon(code);

      if (!coupon) {
        setCouponError('couponInvalid'); // key looked up by the caller via t()
        return;
      }

      const discountAmount = computeDiscount(
        coupon.type,
        coupon.value,
        coupon.maxDiscount,
        subtotal
      );

      setCouponResult({
        code: coupon.code,
        discountType: coupon.type,
        discountValue: parseFloat(coupon.value),
        discountAmount,
      });
    });
  };

  const removeCoupon = () => {
    setCouponResult(null);
    setCouponError(null);
  };

  return {
    apply,
    isPending,
    couponResult,
    couponError,
    removeCoupon,
  };
}
