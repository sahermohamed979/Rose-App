'use client';

import { useState } from 'react';
import { Pencil, Phone, Trash } from 'lucide-react';
import { RadioGroupItem } from '@/shared/components/ui/radio-group';
import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils/utils';
import { IAddress } from '@/shared/lib/types/adresses.type';
import location from '@/shared/assets/images/Location.svg';
import Image from 'next/image';
import { Button } from '@/shared/components/ui/button';
import DeleteAddressDialog from './delete-address-dialog';

interface AddressCardProps {
  address: IAddress;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export default function AddressModalCard({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  isDeleting = false,
}: AddressCardProps) {
  // State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <Label
        htmlFor={address.id}
        onClick={() => onSelect(address.id)}
        className={cn(
          'relative w-full shrink-0 cursor-pointer rounded-xl border transition-all',
          'flex flex-col items-stretch justify-between gap-4 p-4 md:flex-row md:items-center md:p-5',
          isSelected
            ? 'border-border-primary bg-bg-plain'
            : 'border-border-soft bg-bg-plain hover:border-border-strong'
        )}
      >
        <div className="absolute h-0 w-0 overflow-hidden opacity-0">
          <RadioGroupItem
            id={address.id}
            value={address.id}
            tabIndex={-1}
          />
        </div>

        {/* Left - Address Details */}
        <div className="relative flex min-w-0 flex-1 flex-col gap-2">
          <div className="bg-bg-plain md:absolute md:-top-10 md:-left-1.5 md:p-1.5 md:rtl:right-1.5 md:rtl:left-auto">
            <p className="text-xl font-semibold capitalize leading-tight text-text-primary md:text-2xl md:leading-none">
              {address.title}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={location}
              alt="location"
              width={33}
              height={33}
              className="size-7 shrink-0 md:size-8.25"
            />

            <h3
              className={cn(
                'min-w-0 truncate text-xl font-semibold text-text-plain md:text-2xl'
              )}
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
        <div className="flex min-w-0 flex-col gap-3 md:shrink-0 md:flex-row md:items-center">
          <div className="flex min-w-0 items-center gap-2 md:shrink-0 md:gap-3">
            <Phone size={20} className="text-text-default" />
            <span
              className={cn(
                'min-w-0 break-all bg-bg-plain text-sm font-medium tracking-wide text-text-default md:text-base'
              )}
            >
              {address.phone}
            </span>
          </div>
          <div className="flex justify-end gap-2 md:absolute md:-inset-e-4.5 md:flex-col">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onEdit(address.id);
              }}
            >
              <Pencil size={20} className="text-text-default" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsDeleteDialogOpen(true);
              }}
            >
              <Trash size={20} className="text-text-default" />
            </Button>
          </div>
        </div>
      </Label>

      <DeleteAddressDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        addressId={address.id}
        onDelete={onDelete}
        isPending={isDeleting}
      />
    </>
  );
}
