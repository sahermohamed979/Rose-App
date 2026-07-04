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
      variant="link"
      className=" hover:text-decoration-none text-text-default hover:text-text-primary text-base"
      onClick={() => {
        router.push(pathname, { locale: nextLocale });
      }}
    >
      {t('switchLang')}
    </Button>
  );
}
