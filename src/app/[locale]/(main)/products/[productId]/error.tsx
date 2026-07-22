'use client';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Error() {
  const t = useTranslations('ProductDetails');

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <h2 className="text-2xl font-semibold">{t('errorTitle')}</h2>

      <p className="text-text-subtle">{t('errorDescription')}</p>

      <Button>
        <Link href="/products">{t('backToProducts')}</Link>
      </Button>
    </div>
  );
}
