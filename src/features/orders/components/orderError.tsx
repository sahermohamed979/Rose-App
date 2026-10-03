'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import { useRouter } from '@/i18n/navigation';

export default function OrderError() {
  const router = useRouter();
  const t = useTranslations('orders');

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl border border-border-muted bg-card shadow-xs my-8 max-w-lg mx-auto">
      <div className="size-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4">
        <AlertCircle size={32} />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
        {t('errorTitle')}
      </h2>

      <p className="text-text-muted text-sm max-w-sm mb-6">
        {t('loadMoreError')}
      </p>

      <Button
        onClick={() => {
          router.refresh();
        }}
        className="gap-2 px-6"
      >
        <RefreshCw size={16} />
        {t('tryAgain')}
      </Button>
    </div>
  );
}
