'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

import {
  AddressesPayload,
  IAddress,
} from '@/shared/lib/types/adresses.type';
import { Button } from '@/shared/components/ui/button';
import EmptyAddresses from './empty-addresses';
import AddressModalCard from './address-modal-card';

interface AddressModuleStepOneProps {
  initialData?: AddressesPayload;
  onAddAddress: () => void;
  onEditAddress: (id: string) => void;
  onDeleteAddress: (id: string) => void;
}

export default function AddressModuleStepOne({
  initialData,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
}: AddressModuleStepOneProps) {
  // Translations
  const t = useTranslations('checkout');

  // State
  const [selectedAddressId, setSelectedAddressId] = useState<
    string | null
  >(null);

  // Variables
  const addresses = initialData?.addresses ?? [];
  const defaultAddressId = useMemo(() => {
    const primaryAddress = addresses.find(
      (address) => address.isPrimary
    );

    return primaryAddress?.id ?? addresses[0]?.id ?? null;
  }, [addresses]);

  const currentSelectedAddressId =
    selectedAddressId ?? defaultAddressId;
  const isEmpty = addresses.length === 0;

  return (
    <div className="w-full flex flex-col">
      {isEmpty ? (
        <EmptyAddresses
          title={t('noAddresses')}
          buttonLabel={t('addAddress')}
          onAddAddress={onAddAddress}
        />
      ) : (
        <>
          <div className="scrollbar-none flex max-h-90 flex-col gap-4 overflow-x-hidden overflow-y-auto pt-2.5 md:gap-9 md:pe-5">
            {addresses.map((address) => (
              <AddressModalCard
                key={address.id}
                address={address as IAddress}
                isSelected={currentSelectedAddressId === address.id}
                onSelect={setSelectedAddressId}
                onEdit={onEditAddress}
                onDelete={onDeleteAddress}
              />
            ))}
          </div>

          <Button
            className="mt-5 w-full md:mt-7 md:w-auto"
            variant="secondary"
            onClick={onAddAddress}
          >
            {t('addAddress')}
          </Button>
        </>
      )}
    </div>
  );
}
