'use client';

import { X, Tag } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import type { CouponResult } from '../types/cart.types';

interface CouponAppliedBadgeProps {
  coupon: CouponResult;
  currency: string;
  onRemove: () => void;
}

/**
 * Displays the currently applied coupon with its discount amount
 * and a remove button to clear it.
 */
export function CouponAppliedBadge({
  coupon,
  currency,
  onRemove,
}: CouponAppliedBadgeProps) {
  const t = useTranslations('checkout');
  const locale = useLocale();

  const formatNumber = (num: number) =>
    new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US').format(
      num
    );

  const formattedDiscount = formatNumber(coupon.discountAmount);

  // Format code for percentage display (e.g. ١٠٪ in Arabic vs 10% in English)
  const displayCode =
    coupon.discountType === 'PERCENT' && coupon.discountValue
      ? `${formatNumber(coupon.discountValue)}${locale === 'ar' ? '٪' : '%'}`
      : coupon.code;

  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-bg-success-fade border border-border-success animate-in fade-in-0 slide-in-from-top-1 duration-200">
      {/* Left: icon + coupon info */}
      <div className="flex items-center gap-2 min-w-0">
        <Tag className="w-4 h-4 text-text-success shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-text-plain tracking-wider">
            {displayCode}
          </span>
          <span className="text-xs text-text-success font-medium">
            -{formattedDiscount} {currency}
          </span>
        </div>
      </div>

      {/* Right: remove button */}
      <Button
        id="remove-coupon-btn"
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={onRemove}
        className="shrink-0 text-text-muted hover:text-text-danger hover:bg-bg-danger-fade transition-colors"
        aria-label={t('removeCoupon')}
      >
        <X className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}
