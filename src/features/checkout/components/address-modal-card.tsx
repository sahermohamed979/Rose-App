'use client';

import { Phone } from 'lucide-react';
import { RadioGroupItem } from '@/shared/components/ui/radio-group';
import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils/utils';
import { IAddress } from '@/shared/lib/types/adresses.type';
import location from '@/shared/assets/images/Location.svg';
import Image from 'next/image';

interface AddressCardProps {
  address: IAddress;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function AddressModalCard({
  address,
  isSelected,
  onSelect,
}: AddressCardProps) {
  return (
    <Label
      htmlFor={address.id}
      onClick={() => onSelect(address.id)}
      className={cn(
        'w-full shrink-0 cursor-pointer rounded-xl border transition-all relative',
        'flex items-center justify-between gap-4 p-5',
        isSelected
          ? 'border-border-primary bg-bg-plain'
          : 'border-border-soft bg-bg-plain hover:border-border-strong'
      )}
    >
      <div className="absolute w-0 h-0 opacity-0 overflow-hidden">
        <RadioGroupItem
          id={address.id}
          value={address.id}
          tabIndex={-1}
        />
      </div>

      {/* Left - Address Details */}
      <div className="flex flex-col gap-2 flex-1 min-w-0 relative">
        <div className="absolute p-1.5 -top-10 -left-1.5 rtl:right-1.5 rtl:left-auto bg-bg-plain">
          <p className="text-text-primary text-2xl font-semibold leading-none capitalize">
            {address.title}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={location}
            alt="location"
            width={33}
            height={33}
          />

          <h3
            className={cn('text-2xl font-semibold text-text-plain')}
          >
            {address.city}
          </h3>
        </div>

        <span
          className={cn(
            'inline-flex w-fit max-w-full rounded-full px-4 py-1 text-sm font-medium',
            'truncate bg-bg-subtle text-text-plain'
          )}
        >
          {address.street}
        </span>
      </div>

      {/* Right - Phone */}
      <div className="flex items-center gap-3 shrink-0">
        <Phone size={20} className="text-text-default" />
        <span
          className={cn(
            'text-base font-medium tracking-wide bg-bg-plain text-text-default'
          )}
        >
          {address.phone}
        </span>
      </div>
    </Label>
  );
}
