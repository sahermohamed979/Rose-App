'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Ticket } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils/utils';
import {
  couponSchema,
  type CouponFormValues,
} from '../schemas/coupon.schema';

interface CouponFormProps {
  onApply: (code: string) => void;
  isPending: boolean;
  error?: string | null;
  /** Disable the form once a coupon is successfully applied */
  disabled?: boolean;
  className?: string;
}

export function CouponForm({
  onApply,
  isPending,
  error,
  disabled,
  className,
}: CouponFormProps) {
  const t = useTranslations('cart');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: { code: '' },
    mode: 'onBlur',
  });

  const onSubmit = (values: CouponFormValues) => {
    onApply(values.code);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-1.5', className)}
    >
      <div className="flex gap-2">
        {/* Coupon Input */}
        <Input
          {...register('code')}
          id="coupon-code-input"
          placeholder={t('couponPlaceholder')}
          className="flex-1 tracking-widest"
          disabled={isPending || disabled}
          aria-invalid={!!(errors.code || error)}
          autoComplete="off"
        />

        {/* Apply Button */}
        <Button
          id="apply-coupon-btn"
          type="submit"
          variant="default"
          loading={isPending}
          disabled={disabled}
          className="shrink-0 gap-2 px-5"
        >
          <Ticket className="w-4 h-4" />
          {t('applyCoupon')}
        </Button>
      </div>

      {/* Validation errors */}
      {errors.code && (
        <span className="text-xs text-text-danger px-1">
          {errors.code.message}
        </span>
      )}
      {error && !errors.code && (
        <span className="text-xs text-text-danger px-1">{error}</span>
      )}
    </form>
  );
}
