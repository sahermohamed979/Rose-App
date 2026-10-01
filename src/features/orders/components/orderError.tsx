'use client';

import { Button } from '@/shared/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function OrderError() {
  const router = useRouter();
  const t = useTranslations('orders');

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-text-danger text-2xl font-black">
        {t('errorTitle')}
      </p>

      <Button
        onClick={() => {
          router.refresh();
        }}
        className="rounded-xl bg-maroon-600 px-6 py-2 my-4 text-white"
      >
        {t('tryAgain')}
      </Button>
    </div>
  );
}
