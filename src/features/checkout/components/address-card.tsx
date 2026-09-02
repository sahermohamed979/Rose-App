'use client';

import { Phone } from 'lucide-react';
import { RadioGroupItem } from '@/shared/components/ui/radio-group';
import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils/utils';
import { IAddress } from '@/shared/lib/types/adresses.type';

interface AddressCardProps {
  address: IAddress;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function AddressCard({
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
          ? 'border-transparent bg-bg-primary-saturated text-text-inverse'
          : 'border-border-soft bg-bg-muted hover:border-border-strong'
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
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <h3
          className={cn(
            'text-2xl font-semibold',
            isSelected ? 'text-text-inverse' : 'text-text-plain'
          )}
        >
          {address.city}
        </h3>

        <span
          className={cn(
            'inline-flex w-fit max-w-full rounded-full px-4 py-1 text-sm font-medium',
            'truncate',
            isSelected
              ? 'bg-bg-inverse text-text-inverse'
              : 'bg-bg-subtle text-text-plain'
          )}
        >
          {address.street}
        </span>
      </div>

      {/* Right - Phone */}
      <div className="flex items-center gap-3 shrink-0">
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-full',
            isSelected
              ? 'bg-bg-subtle text-text-primary'
              : 'bg-bg-primary-saturated text-text-inverse'
          )}
        >
          <Phone size={20} />
        </div>

        <span
          className={cn(
            'text-base font-medium tracking-wide',
            isSelected ? 'text-text-inverse' : 'text-text-soft'
          )}
        >
          {address.phone}
        </span>
      </div>
    </Label>
  );
}
