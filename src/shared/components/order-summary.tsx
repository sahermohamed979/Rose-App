/**
 * Reusable Order Summary card.
 *
 * Usage:
 * ```tsx
 * <OrderSummary subtotal={cart.subtotal} />
 * ```
 */
'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils/utils';
import { useApplyCoupon } from '@/features/checkout/hooks/use-apply-coupon';
import { CouponForm } from '@/features/checkout/components/coupon-form';
import { CouponAppliedBadge } from '@/features/checkout/components/coupon-applied-badge';
import { OrderTotals } from '@/features/checkout/components/order-totals';
import { CheckoutButton } from '@/features/checkout/components/checkout-button';

interface OrderSummaryProps {
  /** Cart subtotal before any discount (in minor units or decimal) */
  subtotal: number;
  /** Currency label shown next to amounts. Defaults to "EGP" */
  currency?: string;
  className?: string;
}

export default function OrderSummary({
  subtotal,
  currency,
  className,
}: OrderSummaryProps) {
  const t = useTranslations('checkout');
  const tRoot = useTranslations();
  const currencyLabel = currency ?? tRoot('currency');
  const {
    apply,
    isPending,
    couponResult,
    couponError,
    removeCoupon,
  } = useApplyCoupon(subtotal);

  const discount = couponResult?.discountAmount ?? 0;
  const total = Math.max(subtotal - discount, 0);

  return (
    <div
      className={cn(
        // Card shell
        'flex flex-col gap-5 p-6 rounded-2xl',
        // Light: white card with soft border
        'bg-bg-plain border border-border-soft shadow-subtle',
        // Dark: step up one surface level
        'dark:bg-bg-muted dark:border-border-muted dark:shadow-none',
        className
      )}
    >
      {/* Header */}
      <h2 className="text-xl font-bold text-text-plain">
        {t('orderSummary')}
      </h2>

      {/* Coupon form */}
      <CouponForm
        onApply={apply}
        isPending={isPending}
        error={
          couponError
            ? t(couponError as Parameters<typeof t>[0])
            : null
        }
        disabled={!!couponResult}
      />

      {/* Coupon area */}
      <div
        className={cn(
          'min-h-24 flex flex-col justify-center rounded-xl p-4 border transition-colors',
          // Light
          'bg-bg-subtle border-border-soft',
          // Dark
          'dark:bg-bg-soft dark:border-border-muted'
        )}
      >
        {couponResult ? (
          <CouponAppliedBadge
            coupon={couponResult}
            currency={currencyLabel}
            onRemove={removeCoupon}
          />
        ) : (
          <p className="text-sm text-text-muted text-center italic select-none">
            {t('noCoupons')}
          </p>
        )}
      </div>

      <OrderTotals
        subtotal={subtotal}
        discount={discount}
        total={total}
        currency={currencyLabel}
      />

      <CheckoutButton couponCode={couponResult?.code} />
    </div>
  );
}
