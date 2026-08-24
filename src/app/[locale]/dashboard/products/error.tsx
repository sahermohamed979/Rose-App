'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';

interface ProductsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductsError({
  error,
  reset,
}: ProductsErrorProps) {
  const t = useTranslations('products');

  useEffect(() => {
    console.error('Products page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-100 flex-col items-center justify-center gap-4 rounded-2xl bg-bg-plain p-6 text-center">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{t('errorTitle')}</h2>

        <p className="text-sm text-muted-foreground">
          {t('errorMessage')}
        </p>
      </div>

      <Button onClick={() => reset()} variant="default">
        {t('tryAgain')}
      </Button>
    </div>
  );
}
