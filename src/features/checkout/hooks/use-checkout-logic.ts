import { useState } from 'react';
import { toast } from 'sonner';
import { useCreateOrder } from './use-user-order';
import { useLocale, useTranslations } from 'next-intl';
import { PaymentMethodType } from '../types/payment-types';
import { CreateOrderBody } from '../apis/create-order.api';
import { useRouter } from '@/i18n/navigation';

interface CheckoutState {
  addressId: string;
  paymentMethod: PaymentMethodType | null;
}

export default function useCheckoutLogic() {
  const t = useTranslations('checkout');
  const router = useRouter();
  const locale = useLocale();
  //  State
  const [currentStep, setCurrentStep] = useState(1);

  const [checkoutData, setCheckoutData] = useState<CheckoutState>({
    addressId: '',
    paymentMethod: null,
  });

  //  Mutation: create order
  const createOrderMutation = useCreateOrder();

  // true while the createOrder request is in flight
  const isLoading = createOrderMutation.isPending;

  //  Handlers

  // Called when user picks an address in step 1, moves to step 2
  const handleNextStepOne = (addressId: string) => {
    setCheckoutData((prev) => ({ ...prev, addressId }));
    setCurrentStep(2);
  };

  // Goes back one step
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Called when user selects a payment method in step 2
  const handlePaymentChange = (paymentMethod: PaymentMethodType) => {
    setCheckoutData((prev) => ({
      ...prev,
      paymentMethod,
    }));
  };

  // Final submit: builds the order body and sends it to the backend
  const handleCheckout = async () => {
    try {
      // guard: can't checkout without a payment method
      if (!checkoutData.paymentMethod) {
        return;
      }

      const body: CreateOrderBody = {
        addressId: checkoutData.addressId,

        // map internal UI value to what the API expects
        paymentMethod:
          checkoutData.paymentMethod === 'CASH'
            ? 'CASH_ON_DELIVERY'
            : 'CREDIT_CARD',

        // where Stripe/checkout should redirect after payment
        successUrl: `${window.location.origin}/${locale}/orders?session_id={CHECKOUT_SESSION_ID}`,
      };

      const result = await createOrderMutation.mutateAsync(body);

      // backend failure
      if (!result.status) {
        toast.error(result.message);
        return;
      }

      const checkoutUrl = result.payload?.checkout?.checkoutUrl;

      if (checkoutUrl) {
        // credit card flow
        window.location.href = checkoutUrl;
      } else {
        // cash on delivery flow
        toast.success(t('orderSuccess'));
        router.push('/orders');
      }
    } catch {
      // network/unexpected error
      toast.error(t('orderFailed'));
    }
  };

  return {
    currentStep,
    checkoutData,
    isLoading,

    handleNextStepOne,
    handleBack,
    handlePaymentChange,
    handleCheckout,
  };
}
