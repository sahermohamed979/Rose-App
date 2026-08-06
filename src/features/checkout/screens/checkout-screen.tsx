'use client';

import { useState } from 'react';
import { AddressesPayload } from '@/shared/lib/types/adresses.type';
import CheckoutStepOne from '../components/checkout-step-one';
import CheckoutStepper from '../components/checkout-stepper';

interface Props {
  initialData?: AddressesPayload;
}

interface CheckoutState {
  addressId: string;
}

export default function CheckoutScreen({ initialData }: Props) {
  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<CheckoutState>({
    addressId: '',
  });

  // Handlers
  const handleNextStepOne = (addressId: string) => {
    setCheckoutData((prev) => ({ ...prev, addressId }));
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

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
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-text-plain">
              Payment Step
            </h2>
            <div className="p-6 border border-border-soft rounded-xl bg-bg-muted">
              <p className="text-text-soft">
                Selected Address: {checkoutData.addressId}
              </p>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-border-soft">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded text-gray-700 font-medium"
                >
                  Back
                </button>
                <button className="px-6 py-2 bg-[#a32a2d] hover:bg-red-900 transition-colors rounded text-white font-medium flex items-center gap-2">
                  Checkout
                </button>
              </div>
            </div>
          </div>
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
