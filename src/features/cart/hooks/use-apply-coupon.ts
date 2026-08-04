'use client';

import { useState } from 'react';
import type { CouponResult } from '../types/cart.types';

export function useApplyCoupon(subtotal: number) {
  const [couponResult, setCouponResult] = useState<CouponResult | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const apply = (code: string) => {
    setCouponError(null);
    setIsPending(true);

    try {
      const cleanVal = code.replace('%', '').trim();
      const percent = parseFloat(cleanVal);

      if (isNaN(percent) || percent <= 0 || percent > 100) {
        setCouponError('Please enter a valid percentage between 1 and 100');
        return;
      }

      const discountAmount =
        Math.round(((subtotal * percent) / 100) * 100) / 100;

      setCouponResult({
        code: `${percent}%`,
        discountType: 'PERCENT',
        discountValue: percent,
        discountAmount,
      });
    } catch {
      setCouponError('Invalid coupon value');
    } finally {
      setIsPending(false);
    }
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
