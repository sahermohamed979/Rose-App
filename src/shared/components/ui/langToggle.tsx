'use client';
import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from './button';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function LangToggle() {
  const t = useTranslations('auth');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const nextLocale = locale === 'ar' ? 'en' : 'ar';

  return (
    <Button
      variant="ghost"
      onClick={() => {
        router.push(pathname, { locale: nextLocale });
      }}
    >
      {t('switchLang')}
    </Button>
  );
}
