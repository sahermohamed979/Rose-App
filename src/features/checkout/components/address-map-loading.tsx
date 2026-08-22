'use client';

import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function AddressMapLoading() {
  // Translations
  const t = useTranslations('address');

  return (
    <div
      className="flex h-80 w-full flex-col items-center justify-center gap-3 rounded-xl border border-border-muted bg-bg-muted text-text-default"
      role="status"
    >
      <LoaderCircle className="size-8 animate-spin text-text-primary" />
      <span className="text-sm font-medium">{t('mapLoading')}</span>
    </div>
  );
}
