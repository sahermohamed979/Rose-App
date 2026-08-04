'use client';

import { useState } from 'react';
import { AddressesPayload } from '@/shared/lib/types/adresses.type';
import CheckoutStepOne from '../components/checkout-step-one';

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
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-text-plain">
              Payment Step
            </h2>
            <div className="p-6 border border-border-soft rounded-xl bg-bg-muted">
              <p className="text-text-soft">
                Selected Address: {checkoutData.addressId}
              </p>
              <button
                onClick={handleBack}
                className="mt-4 px-4 py-2 bg-bg-subtle rounded text-text-primary"
              >
                Back to Shipping
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col gap-8 p-6">
      {/* 1. Top Section: Steps & Summary */}
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Left Column: Steps & Progress */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          {/* Progress Bar (To be added later) */}

          {/* Current Step Component */}
          {renderStep()}
        </div>

        {/* Right Column: Persistent Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="p-6 border border-border-soft rounded-xl text-text-plain bg-bg-muted h-full">
            Summary To Be Mounted
          </div>
        </div>
      </div>

      {/* 2. Bottom Section: Products (Under Both Steps & Summary) */}
      <div className="w-full mt-8">
        <div className="p-6 border border-border-soft rounded-xl text-text-plain bg-bg-muted">
          Products To Be Mounted Here
        </div>
      </div>
    </div>
  );
}
