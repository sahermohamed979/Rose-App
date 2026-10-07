'use client';

import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';

export default function CheckoutError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('checkout');

  return (
    <div className="flex flex-col items-center justify-center w-full py-16 px-6 mt-8 border border-border-soft rounded-2xl bg-bg-muted/50 text-center shadow-sm">
      {/* Error Icon */}
      <div className="w-16 h-16 bg-red-50 text-text-danger rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>

      {/* Main Title from Translations */}
      <h2 className="text-xl font-semibold text-text-plain mb-2">
        {t('failedLoading')}
      </h2>

      {/* Action Button */}
      <Button
        onClick={() => reset()}
        variant="default"
        className="flex items-center gap-2"
      >
        <RefreshCcw className="w-4 h-4" />
        <span>{t('tryAgain')}</span>{' '}
      </Button>
    </div>
  );
}
