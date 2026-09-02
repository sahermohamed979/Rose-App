'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import {
  AddressesPayload,
  IAddress,
} from '@/shared/lib/types/adresses.type';
import AddressForm, { ADDRESS_FORM_ID } from './address-form';
import CheckoutStepper from './checkout-stepper';
import { AddressFormFields } from '../schemas/address-form-schema';
import { useAddress } from '../hooks/address-hook';
import AddressModuleStepOne from './address-module-step-one';
import { AddressMapLoading } from './address-map-loading';

const AddressMap = dynamic(() => import('./address-map'), {
  ssr: false,
  loading: () => <AddressMapLoading />,
});

interface AddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: AddressesPayload;
}

export default function AddressDialog({
  open,
  onOpenChange,
  initialData,
}: AddressDialogProps) {
  // Translations
  const t = useTranslations('checkout');
  const tAddress = useTranslations('address');

  // State
  const [currentStep, setCurrentStep] = useState(0);
  const [editingAddressId, setEditingAddressId] = useState<
    string | null
  >(null);
  const [addressData, setAddressData] = useState<Partial<IAddress>>({
    title: '',
    city: '',
    street: '',
    phone: '',
    latitude: '',
    longitude: '',
    isPrimary: false,
  });

  // Hooks
  const {
    mutate,
    update,
    delete: deleteAddress,
    isPending,
  } = useAddress({
    onSuccess: () => {
      onOpenChange(false);
      setCurrentStep(0);
      setEditingAddressId(null);
      setAddressData({
        title: '',
        city: '',
        street: '',
        phone: '',
        latitude: '',
        longitude: '',
        isPrimary: false,
      });
    },
  });

  // Variables
  const isEditing = editingAddressId !== null;

  // Functions
  const handleNextStepOne = (data: AddressFormFields) => {
    setAddressData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const handleCancel = () => {
    onOpenChange(false);
    setAddressData({
      title: '',
      city: '',
      street: '',
      phone: '',
      latitude: '',
      longitude: '',
      isPrimary: false,
    });
    setCurrentStep(0);
    setEditingAddressId(null);
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpenChange(true);
      return;
    }

    handleCancel();
  };

  const handleStartAddAddress = () => {
    setEditingAddressId(null);
    setAddressData({
      title: '',
      city: '',
      street: '',
      phone: '',
      latitude: '',
      longitude: '',
      isPrimary: false,
    });
    setCurrentStep(1);
  };

  const handleEditAddress = (addressId: string) => {
    const address = initialData?.addresses?.find(
      (item) => item.id === addressId
    );

    if (!address) {
      return;
    }

    setEditingAddressId(address.id);
    setAddressData({
      title: address.title,
      city: address.city,
      street: address.street,
      phone: address.phone,
      latitude: address.latitude,
      longitude: address.longitude,
      isPrimary: address.isPrimary,
    });
    setCurrentStep(1);
  };

  const handleDeleteAddress = (addressId: string) => {
    deleteAddress(addressId);
  };

  const handleSubmitAddress = () => {
    const {
      title,
      city,
      street,
      phone,
      latitude,
      longitude,
      isPrimary,
    } = addressData;

    if (!title || !city || !street || !phone) {
      setCurrentStep(1);
      return;
    }

    if (!latitude || !longitude) {
      toast.error(tAddress('errors.locationRequired'));
      return;
    }

    const payload = {
      title,
      city,
      street,
      phone,
      isPrimary: isPrimary ?? false,
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    if (editingAddressId) {
      update({
        id: editingAddressId,
        ...payload,
      });
      return;
    }

    mutate(payload);
    setCurrentStep(0);
  };

  // Render Step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AddressForm
            key={editingAddressId ?? 'new-address'}
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
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="scrollbar-none max-h-[calc(100dvh-2rem)] w-4/5 max-w-4/5 overflow-y-auto p-4 sm:max-w-4/5 md:w-[57.2vw] md:max-w-[70vw] md:py-6"
      >
        {currentStep !== 0 && (
          <button
            type="button"
            aria-label={tAddress('cancel')}
            className="absolute inset-e-0 top-0 z-10 mt-4 me-4 border-0 bg-transparent p-0 text-text-default outline-none hover:bg-transparent focus-visible:outline-none disabled:opacity-50"
            onClick={handleCancel}
            disabled={isPending}
          >
            <X className="size-6.25 text-text-default" />
          </button>
        )}

        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle className="mb-2 text-2xl font-bold leading-tight text-text-primary md:mb-4 md:text-3xl md:leading-none">
            {currentStep === 0
              ? tAddress('modal.title')
              : isEditing
                ? tAddress('edit')
                : t('addAddress')}
          </DialogTitle>
          {currentStep === 0 && (
            <Button
              className="shrink-0 px-2 text-xs md:px-4 md:text-sm"
              variant="secondary"
              onClick={handleStartAddAddress}
            >
              {t('addAddress')}
            </Button>
          )}
        </DialogHeader>

        {currentStep === 0 ? (
          <AddressModuleStepOne
            initialData={initialData}
            onAddAddress={handleStartAddAddress}
            onEditAddress={handleEditAddress}
            onDeleteAddress={handleDeleteAddress}
          />
        ) : (
          <>
            <CheckoutStepper currentStep={currentStep} />

            <div className="flex items-center border-border-muted border-b pb-3 mb-0">
              {currentStep >= 1 && (
                <Button
                  className="me-3 size-8 shrink-0 overflow-hidden rounded-full p-0 dark:bg-maroon-500 md:me-4 md:size-8.75"
                  onClick={handleBack}
                >
                  <ArrowLeft className="size-4 rtl:rotate-180 md:size-5" />
                </Button>
              )}
              <h2 className="text-lg font-medium leading-tight text-text-primary md:text-2xl md:leading-none">
                {currentStep === 1 && tAddress('add.step1Title')}
                {currentStep === 2 && tAddress('add.step2Title')}
              </h2>
            </div>

            {renderStep()}

            {currentStep === 1 && (
              <Button
                className="mt-5 w-full md:mt-7 md:w-auto"
                type="submit"
                form={ADDRESS_FORM_ID}
              >
                {t('next')}
              </Button>
            )}

            {currentStep === 2 && (
              <Button
                className="mt-5 w-full md:mt-7 md:w-auto"
                type="button"
                onClick={handleSubmitAddress}
                disabled={isPending}
              >
                {isEditing
                  ? tAddress('edit')
                  : tAddress('add.address')}
              </Button>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
