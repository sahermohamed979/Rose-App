'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useCheckout } from '../context/checkout-context';

interface CheckoutButtonProps {
  couponCode?: string;
  className?: string;
}

export function CheckoutButton({
  couponCode,
  className,
}: CheckoutButtonProps) {
  // Navigation & Translations
  const router = useRouter();
  const t = useTranslations('checkout');
  const checkout = useCheckout();

  // If on Cart page: navigate to checkout
  if (!checkout?.isCheckoutPage) {
    return (
      <Button
        id="checkout-btn"
        type="button"
        variant="default"
        onClick={() => router.push('/checkout')}
        className={`w-full h-12 rounded-xl text-base gap-2 ${className ?? ''}`}
      >
        {t('checkout')}
        <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
      </Button>
    );
  }

  // If on Checkout Step 1: Advance to Step 2
  if (checkout.currentStep === 1) {
    return (
      <Button
        id="checkout-btn"
        type="button"
        variant="default"
        disabled={checkout.isLoading}
        onClick={() => {
          if (checkout.checkoutData.addressId) {
            checkout.handleNextStepOne(
              checkout.checkoutData.addressId
            );
          } else {
            checkout.handleCheckout();
          }
        }}
        className={`w-full h-12 rounded-xl text-base gap-2 ${className ?? ''}`}
      >
        {t('next')}
        <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
      </Button>
    );
  }

  // If on Checkout Step 2: Pay/Checkout with selected payment method
  return (
    <Button
      id="checkout-btn"
      type="button"
      variant="default"
      onClick={() => checkout.handleCheckout(couponCode)}
      disabled={checkout.isLoading}
      className={`w-full h-12 rounded-xl text-base gap-2 ${className ?? ''}`}
    >
      {checkout.isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          {t('checkout')}
          <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
        </>
      )}
    </Button>
  );
}
