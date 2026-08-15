import { useState } from 'react';
import { toast } from 'sonner';
import { useCreateOrder } from './use-user-order';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { PaymentMethodType } from '../types/payment-types';
import { CreateOrderBody } from '../apis/create-order.api';

interface CheckoutState {
  addressId: string;
  paymentMethod: PaymentMethodType | null;
}

export default function useCheckoutLogic() {
  const t = useTranslations('checkout');
  const router = useRouter();

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<CheckoutState>({
    addressId: '',
    paymentMethod: null,
  });

  // Create Order
  const createOrderMutation = useCreateOrder();

  const isLoading = createOrderMutation.isPending;

  // Handlers
  const handleNextStepOne = (addressId: string) => {
    setCheckoutData((prev) => ({ ...prev, addressId }));
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handlePaymentChange = (paymentMethod: PaymentMethodType) => {
    setCheckoutData((prev) => ({
      ...prev,
      paymentMethod,
    }));
  };

  const handleCheckout = async () => {
    try {
      if (!checkoutData.paymentMethod) {
        return;
      }

      const body: CreateOrderBody = {
        addressId: checkoutData.addressId,
        paymentMethod:
          checkoutData.paymentMethod === 'CASH'
            ? 'CASH_ON_DELIVERY'
            : 'CREDIT_CARD',
        successUrl: `${window.location.origin}/orders?session_id={CHECKOUT_SESSION_ID}`,
      };

      const result = await createOrderMutation.mutateAsync(body);

      if (!result.status) {
        toast.error(result.message);
        return;
      }

      const checkoutUrl = result.payload?.checkout?.checkoutUrl;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        toast.success(t('successToast'));
        router.push('/orders');
      }
    } catch {
      toast.error(t('errorToast'));
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
