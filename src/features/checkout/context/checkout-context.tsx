'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { toast } from 'sonner';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useCreateOrder } from '../hooks/use-user-order';
import type {
  CreateOrderBody,
  PaymentMethodType,
} from '../types/payment-types';

interface CheckoutState {
  addressId: string;
  paymentMethod: PaymentMethodType | null;
}

interface CheckoutContextType {
  currentStep: number;
  checkoutData: CheckoutState;
  isLoading: boolean;
  isCheckoutPage: boolean;
  handleNextStepOne: (addressId: string) => void;
  handleBack: () => void;
  handlePaymentChange: (paymentMethod: PaymentMethodType) => void;
  handleCheckout: (couponCode?: string) => Promise<void>;
  setSelectedAddress: (addressId: string) => void;
}

const CheckoutContext = createContext<CheckoutContextType | null>(
  null
);

export function CheckoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('checkout');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const isCheckoutPage = pathname.includes('/checkout');

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<CheckoutState>({
    addressId: '',
    paymentMethod: null,
  });

  // Mutation: create order
  const createOrderMutation = useCreateOrder();
  const isLoading = createOrderMutation.isPending;

  // Handlers
  const setSelectedAddress = useCallback((addressId: string) => {
    setCheckoutData((prev) => ({ ...prev, addressId }));
  }, []);

  const handleNextStepOne = useCallback((addressId: string) => {
    setCheckoutData((prev) => ({ ...prev, addressId }));
    setCurrentStep(2);
  }, []);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handlePaymentChange = useCallback(
    (paymentMethod: PaymentMethodType) => {
      setCheckoutData((prev) => ({
        ...prev,
        paymentMethod,
      }));
    },
    []
  );

  const handleCheckout = useCallback(
    async (couponCode?: string) => {
      try {
        if (!checkoutData.addressId) {
          toast.error(t('selectAddress'));
          setCurrentStep(1);
          return;
        }

        if (!checkoutData.paymentMethod) {
          toast.error(t('selectPaymentMethod'));
          return;
        }

        const body: CreateOrderBody = {
          addressId: checkoutData.addressId,
          paymentMethod:
            checkoutData.paymentMethod === 'CASH'
              ? 'CASH_ON_DELIVERY'
              : 'CREDIT_CARD',
          ...(couponCode ? { couponCode } : {}),
          successUrl: `${window.location.origin}/${locale}/orders?session_id={CHECKOUT_SESSION_ID}`,
        };

        const result = await createOrderMutation.mutateAsync(body);

        if (!result.status) {
          toast.error(result.message);
          return;
        }

        const checkoutUrl = result.payload?.checkout?.checkoutUrl;

        if (checkoutUrl) {
          window.location.replace(checkoutUrl);
        } else {
          toast.success(t('orderSuccess'));
          router.replace('/orders');
        }
      } catch {
        toast.error(t('orderFailed'));
      }
    },
    [checkoutData, t, locale, createOrderMutation, router]
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      currentStep,
      checkoutData,
      isLoading,
      isCheckoutPage,
      handleNextStepOne,
      handleBack,
      handlePaymentChange,
      handleCheckout,
      setSelectedAddress,
    }),
    [
      currentStep,
      checkoutData,
      isLoading,
      isCheckoutPage,
      handleNextStepOne,
      handleBack,
      handlePaymentChange,
      handleCheckout,
      setSelectedAddress,
    ]
  );

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  return context;
}
