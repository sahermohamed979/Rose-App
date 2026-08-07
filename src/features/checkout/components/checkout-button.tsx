'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface CheckoutButtonProps {
  /** Active coupon code to persist before navigating */
  couponCode?: string;
  className?: string;
}

export function CheckoutButton({ className }: CheckoutButtonProps) {
  const router = useRouter();
  const t = useTranslations('checkout');

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <Button
      id="checkout-btn"
      type="button"
      variant="default"
      onClick={handleCheckout}
      className={`w-full h-12 rounded-xl text-base gap-2 ${className ?? ''}`}
    >
      {t('checkout')}
      <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
    </Button>
  );
}
