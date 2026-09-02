'use client';

import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  AddressesPayload,
  IAddress,
} from '@/shared/lib/types/adresses.type';
import { Button } from '@/shared/components/ui/button';
import EmptyAddresses from './empty-addresses';
import AddressCard from './address-card';
import AddressDialog from './address-dialog';

interface CheckoutStepOneProps {
  initialData?: AddressesPayload;
  onNext: (selectedAddressId: string) => void;
}

export default function CheckoutStepOne({
  initialData,
  onNext,
}: CheckoutStepOneProps) {
  // Translations
  const t = useTranslations('checkout');

  // State
  const [selectedAddressId, setSelectedAddressId] = useState<
    string | null
  >(null);
  const [isAddressDialogOpen, setIsAddressDialogOpen] =
    useState(false);

  // Variables
  const addresses = initialData?.addresses ?? [];
  const defaultAddressId = useMemo(() => {
    const primaryAddress = addresses.find(
      (address) => address.isPrimary
    );

    return primaryAddress?.id ?? addresses[0]?.id ?? null;
  }, [addresses]);

  //Final selected address
  const currentSelectedAddressId =
    selectedAddressId ?? defaultAddressId;
  const isEmpty = addresses.length === 0;

  // Functions
  const handleNextClick = () => {
    if (currentSelectedAddressId) {
      onNext(currentSelectedAddressId);
    }
  };

  const handleOpenAddressDialog = () => {
    setIsAddressDialogOpen(true);
  };

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-text-plain">
        {t('step1Title')}
      </h1>

      {isEmpty ? (
        <EmptyAddresses
          title={t('noAddresses')}
          buttonLabel={t('addAddress')}
          onAddAddress={handleOpenAddressDialog}
        />
      ) : (
        <>
          {/* Address List */}
          <div className="flex flex-col gap-4 max-h-90 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address as IAddress}
                isSelected={currentSelectedAddressId === address.id}
                onSelect={setSelectedAddressId}
              />
            ))}
          </div>

          {/* Separator */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-px bg-border-soft flex-1" />

            <span className="text-text-soft font-medium text-sm">
              {t('or')}
            </span>

            <div className="h-px bg-border-soft flex-1" />
          </div>

          {/* New Address */}
          <Button
            variant="secondary"
            onClick={handleOpenAddressDialog}
          >
            {t('addAddress')}
          </Button>
        </>
      )}

      {/* Next */}
      {!isEmpty && (
        <div className="flex justify-end mt-8">
          <Button
            onClick={handleNextClick}
            disabled={!currentSelectedAddressId}
            variant="default"
          >
            {t('next')}

            <ArrowRight className="w-4 h-4 ml-2 rtl:rotate-180" />
          </Button>
        </div>
      )}

      <AddressDialog
        open={isAddressDialogOpen}
        onOpenChange={setIsAddressDialogOpen}
        initialData={initialData}
      />
    </div>
  );
}
