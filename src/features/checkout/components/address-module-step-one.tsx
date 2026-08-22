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
}

export default function AddressModuleStepOne({
  initialData,
  onAddAddress,
  onEditAddress,
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
          <div className="flex flex-col gap-9 pt-2.5 max-h-90 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
            {addresses.map((address) => (
              <AddressModalCard
                key={address.id}
                address={address as IAddress}
                isSelected={currentSelectedAddressId === address.id}
                onSelect={setSelectedAddressId}
                onEdit={onEditAddress}
              />
            ))}
          </div>

          <Button
            className="mt-7"
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
