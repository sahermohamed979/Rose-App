'use client';

import { useState } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { useUserAddresses } from '../hooks/use-user-addresses';
import { AddressesPayload } from '@/shared/lib/types/adresses.type';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils/utils';
import { useTranslations } from 'next-intl';
import AddressSkeleton from '../skeletons/addresses.skeleton';

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

  // Custom hooks
  const { data, isLoading, isError } = useUserAddresses(initialData);
  const addresses = data?.addresses || [];

  // State
  const [selectedAddressId, setSelectedAddressId] = useState<
    string | null
  >(() => {
    if (addresses.length > 0) {
      const primaryAddress = addresses.find((addr) => addr.isPrimary);
      return primaryAddress ? primaryAddress.id : addresses[0].id;
    }
    return null;
  });

  const handleNextClick = () => {
    if (selectedAddressId) {
      onNext(selectedAddressId);
    }
  };

  // Loading
  if (isLoading) {
    return <AddressSkeleton />;
  }

  // Error
  if (isError) {
    return (
      <div className="p-10 text-text-danger">
        Failed to load addresses.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-text-plain">
        {t('step1Title')}
      </h1>

      {/* Address List */}
      <div className="flex flex-col gap-4 max-h-90 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        {addresses.map((address) => {
          const isSelected = selectedAddressId === address.id;

          return (
            <div
              key={address.id}
              onClick={() => setSelectedAddressId(address.id)}
              className={cn(
                'shrink-0 flex justify-between items-center p-4 border border-border-soft rounded-xl cursor-pointer transition-colors',
                isSelected
                  ? 'bg-bg-primary-saturated text-text-inverse'
                  : 'bg-bg-muted'
              )}
            >
              {/* Address Details */}
              <div className="flex flex-col gap-2 items-start">
                <span
                  className={cn(
                    'font-semibold text-2xl',
                    isSelected
                      ? 'text-text-inverse'
                      : 'text-text-plain'
                  )}
                >
                  {address.city}
                </span>
                <span
                  className={cn(
                    'px-3 rounded-full text-base font-medium',
                    isSelected
                      ? 'bg-bg-inverse text-text-inverse'
                      : 'bg-bg-subtle text-text-plain'
                  )}
                >
                  {address.street}
                </span>
              </div>

              {/* Phone Number */}
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'p-2 rounded-full flex items-center justify-center',
                    isSelected
                      ? 'bg-bg-subtle text-text-primary'
                      : 'bg-bg-primary-saturated text-text-inverse'
                  )}
                >
                  <Phone size={20} />
                </div>
                <span
                  className={cn(
                    'font-medium tracking-wide text-sm',
                    isSelected
                      ? 'text-text-inverse'
                      : 'text-text-soft'
                  )}
                >
                  {address.phone}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Separator */}
      <div className="flex items-center gap-4 my-8">
        <div className="h-px bg-border-soft flex-1"></div>
        <span className="text-text-soft font-medium text-sm">OR</span>
        <div className="h-px bg-border-soft flex-1"></div>
      </div>

      {/* New Address */}
      <Button variant="secondary">{t('addAddress')}</Button>

      {/* Next */}
      <div className="flex justify-end mt-8">
        <Button
          onClick={handleNextClick}
          disabled={!selectedAddressId}
          variant="default"
        >
          {t('next')}
          <ArrowRight className="w-4 h-4 ml-2 rtl:rotate-180" />
        </Button>
      </div>
    </div>
  );
}
