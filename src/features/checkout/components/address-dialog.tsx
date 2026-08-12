'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { IAddress } from '@/shared/lib/types/adresses.type';
import AddressForm, { ADDRESS_FORM_ID } from './address-form';
import AddressMap from './address-map';
import CheckoutStepper from './checkout-stepper';
import { AddressFormFields } from '../schemas/address-form-schema';
import { useAddress } from '../hooks/address-hook';

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

  // Hooks
  const { mutate, isPending } = useAddress({
    onSuccess: () => {
      onOpenChange(false);
      setCurrentStep(1);
      setAddressData({
        title: '',
        city: '',
        street: '',
        phone: '',
        latitude: '',
        longitude: '',
      });
    },
  });

  // Functions
  const handleNextStepOne = (data: AddressFormFields) => {
    setAddressData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleAddAddress = () => {
    const { title, city, street, phone, latitude, longitude } =
      addressData;

    if (!title || !city || !street || !phone) {
      setCurrentStep(1);
      return;
    }

    if (!latitude || !longitude) {
      toast.error(tAddress('errors.locationRequired'));
      return;
    }

    mutate({
      title,
      city,
      street,
      phone,
      isPrimary: false,
      latitude: Number(latitude),
      longitude: Number(longitude),
    });
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
          <AddressMap
            city={addressData.city ?? ''}
            street={addressData.street ?? ''}
            latitude={addressData.latitude}
            longitude={addressData.longitude}
            onLocationChange={({ latitude, longitude }) => {
              setAddressData((prev) => ({
                ...prev,
                latitude,
                longitude,
              }));
            }}
          />
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

        <div className="flex items-center border-border-muted border-b pb-3 mb-0">
          {currentStep === 2 && (
            <Button
              className="w-[35px] 
            h-[35px] rounded-full
             p-0 dark:bg-maroon-500 overflow-hidden me-4"
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
          <Button className="mt-7" type="submit" form={ADDRESS_FORM_ID}>
            {t('next')}
          </Button>
        )}

        {currentStep === 2 && (
          <Button
            className="mt-7"
            type="button"
            onClick={handleAddAddress}
            disabled={isPending}
          >
            {tAddress('add.address')}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
