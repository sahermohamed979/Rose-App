'use client';

import { Button } from '@/shared/components/ui/button';

interface EmptyAddressesProps {
  title: string;
  buttonLabel: string;
  onAddAddress: () => void;
}

export default function EmptyAddresses({
  title,
  buttonLabel,
  onAddAddress,
}: EmptyAddressesProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-soft bg-bg-muted px-6 py-12 text-center">
      <p className="mb-6 text-base text-text-soft">{title}</p>

      <Button variant="secondary" onClick={onAddAddress}>
        {buttonLabel}
      </Button>
    </div>
  );
}
