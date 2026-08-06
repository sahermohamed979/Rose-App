import { useState } from 'react';
import { toast } from 'sonner';
import {
  useConfirmCardPayment,
  useCreateOrder,
  useCreatePaymentIntent,
} from './use-user-order';
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

      // Create Order
      const body: CreateOrderBody = {
        addressId: checkoutData.addressId,
        paymentMethod:
          checkoutData.paymentMethod === 'CASH'
            ? 'CASH_ON_DELIVERY'
            : 'CREDIT_CARD',
      };

      //  const order =
      await createOrderMutation.mutateAsync(body);

      toast.success(t('successToast'));

      router.push('/orders');

      // Credit Card Flow
      if (checkoutData.paymentMethod === 'CARD') {
        // TODO:
        // 1- Create Payment Intent
        // 2- Open Stripe
        // 3- Confirm Payment
        // 4- Redirect to Orders
      }
    } catch {
      toast.error(t('errorToast'));
    }
  };
  // Create Order
  const createOrderMutation = useCreateOrder();
  // Stripe
  const createIntentMutation = useCreatePaymentIntent();
  // Confirm Card
  const confirmCardMutation = useConfirmCardPayment();

  const isLoading =
    createOrderMutation.isPending ||
    createIntentMutation.isPending ||
    confirmCardMutation.isPending;

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
