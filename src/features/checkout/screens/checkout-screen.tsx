'use client';

import { useState } from 'react';
import { AddressesPayload } from '@/shared/lib/types/adresses.type';
import CheckoutStepOne from '../components/checkout-step-one';
import CheckoutStepper from '../components/checkout-stepper';
import PaymentMethod, {
  PaymentMethodType,
} from '../components/payment-method';
import {
  useConfirmCardPayment,
  useCreateOrder,
  useCreatePaymentIntent,
} from '../hooks/use-user-order';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CreateOrderBody } from '../apis/create-order.api';
import { useTranslations } from 'next-intl';
interface Props {
  initialData?: AddressesPayload;
}

interface CheckoutState {
  addressId: string;
  paymentMethod: PaymentMethodType | null;
}

export default function CheckoutScreen({ initialData }: Props) {
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

  // Render Step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CheckoutStepOne
            initialData={initialData}
            onNext={handleNextStepOne}
          />
        );
      case 2:
        return (
          // All of this to be move to a seperate component including the buttons and its functions
          // I Jsut wanted to see if it works

          <PaymentMethod
            onBack={handleBack}
            paymentMethod={checkoutData.paymentMethod}
            onPaymentChange={handlePaymentChange}
            onCheckout={handleCheckout}
            isLoading={
              createOrderMutation.isPending ||
              createIntentMutation.isPending ||
              confirmCardMutation.isPending
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <CheckoutStepper currentStep={currentStep} />
      {renderStep()}
    </div>
  );
}
