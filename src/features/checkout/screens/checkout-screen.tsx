'use client';

import { AddressesPayload } from '@/shared/lib/types/adresses.type';
import CheckoutStepOne from '../components/checkout-step-one';
import CheckoutStepper from '../components/checkout-stepper';
import PaymentMethod from '../components/payment-method';
import useCheckoutLogic from '../hooks/use-checkout-logic';

interface Props {
  initialData?: AddressesPayload;
}

export default function CheckoutScreen({ initialData }: Props) {
  const {
    currentStep,
    checkoutData,
    isLoading,

    handleNextStepOne,
    handleBack,
    handlePaymentChange,
    handleCheckout,
  } = useCheckoutLogic();

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
          <PaymentMethod
            onBack={handleBack}
            paymentMethod={checkoutData.paymentMethod}
            onPaymentChange={handlePaymentChange}
            onCheckout={handleCheckout}
            isLoading={isLoading}
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
