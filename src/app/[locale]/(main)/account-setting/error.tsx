'use client';

import { useTranslations } from 'next-intl';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('profileForm.profileError');

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-full bg-bg-danger-subtle flex items-center justify-center">
        <AlertCircle size={26} className="text-text-danger" />
      </div>

      <div className="space-y-1">
        <h2 className="text-base font-semibold text-text-primary">
          {t('title')}
        </h2>
        <p className="text-sm text-text-soft max-w-xs">
          {t('description')}
        </p>
      </div>

      <Button
        variant="default"
        onClick={() => reset()}
        className="flex items-center gap-2"
      >
        <RefreshCw size={16} />
        {t('retry')}
      </Button>
    </div>
  );
}
