'use client';

import Image from 'next/image';
import errorImage from '@/shared/assets/images/server-down.webp';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  return (
    <div className="w-full min-h-[calc(90vh-48px)] flex flex-col items-center justify-center px-4 text-center">
      <div className="md:h-90 h-64 md:w-177.5 w-64 mb-4 md:mb-6">
        <Image
          src={errorImage}
          alt="Server error"
          width={400}
          height={400}
          className="w-full h-full object-contain"
        />
      </div>

      <h1 className="text-2xl md:text-4xl font-semibold text-text-plain max-w-4xl">
        {t('dashboard.error.title')}
      </h1>

      <p className="text-sm md:text-xl text-text-muted text-center mt-1.5 mb-5 max-w-2xl">
        {t('dashboard.error.subtitle')}
      </p>

      <Button
        type="button"
        onClick={() => reset()}
        className="rounded-md bg-bg-primary-saturated px-6 py-2.5 text-sm font-medium text-text-inverse mb-12"
      >
        {t('dashboard.error.retry')}
      </Button>
    </div>
  );
}
