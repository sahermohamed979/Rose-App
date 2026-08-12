'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { IAddress } from '@/shared/lib/types/adresses.type';
import AddressForm, { ADDRESS_FORM_ID } from './address-form';
import CheckoutStepper from './checkout-stepper';
import { AddressFormFields } from '../schemas/address-form-schema';

interface AddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddressDialog({
  open,
  onOpenChange,
}: AddressDialogProps) {
  // Translations
  const t = useTranslations('checkout');
  const tAddress = useTranslations('address');

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [addressData, setAddressData] = useState<Partial<IAddress>>({
    title: '',
    city: '',
    street: '',
    phone: '',
    latitude: '',
    longitude: '',
  });

  // Functions
  const handleNextStepOne = (data: AddressFormFields) => {
    setAddressData((prev) => ({ ...prev, ...data }));
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
          <AddressForm
            initialData={addressData}
            onNext={handleNextStepOne}
          />
        );
      case 2:
        return (
          <>
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
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[57.2vw] max-w-[70vw] sm:max-w-[70vw] py-6"
      >
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-text-primary leading-none mb-4">
            {t('addAddress')}
          </DialogTitle>
        </DialogHeader>

        <CheckoutStepper currentStep={currentStep} />

        <div className="flex items-center justify-between border-border-muted border-b pb-3 mb-0">
          {currentStep === 2 && (
            <Button
              className="w-[35px] 
            h-[35px] rounded-full
             p-0 dark:bg-maroon-500 overflow-hidden"
              onClick={handleBack}
            >
              <ArrowLeft className="w-5 h-5  rtl:rotate-180" />
            </Button>
          )}
          <h2 className="text-2xl font-medium text-text-primary leading-none">
            {currentStep === 1 && tAddress('add.step1Title')}
            {currentStep === 2 && tAddress('add.step2Title')}
          </h2>
        </div>

        {renderStep()}

        {/* Actions */}
        {currentStep === 1 && (
          <Button
            className="mt-7"
            type="submit"
            form={ADDRESS_FORM_ID}
          >
            {t('next')}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
