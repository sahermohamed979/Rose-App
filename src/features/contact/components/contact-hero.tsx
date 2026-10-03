import { useTranslations } from 'next-intl';
import { Headset } from 'lucide-react';

import { Breadcrumb } from '@/shared/components/ui/breadcrumb';

export function ContactHero() {
  // Translation
  const t = useTranslations('contactPage');
  const tCommon = useTranslations('common');

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-soft-pink-100/40 via-bg-subtle/50 to-transparent dark:from-maroon-950/30 dark:via-bg-default/40 p-6 sm:p-10 md:p-14 border border-border-subtle/80">
      {/* Decorative Blur Spheres */}
      <div className="pointer-events-none absolute -top-20 -end-20 h-64 w-64 rounded-full bg-soft-pink-300/30 blur-3xl dark:bg-maroon-700/10" />
      <div className="pointer-events-none absolute -bottom-20 -start-20 h-64 w-64 rounded-full bg-maroon-400/20 blur-3xl dark:bg-soft-pink-800/10" />

      {/* Breadcrumb Navigation */}
      <div className="relative z-10 mb-6">
        <Breadcrumb
          items={[
            { label: tCommon('home') || 'Home', href: '/' },
            { label: t('breadcrumb') },
          ]}
        />
      </div>

      {/* Header Info */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-bg-elevated px-4 py-1.5 text-xs font-semibold text-text-primary shadow-xs border border-border-subtle">
          <Headset className="h-3.5 w-3.5 text-maroon-600 dark:text-soft-pink-400" />
          <span>{t('badge')}</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
          {t('heroTitle')}
        </h1>

        <p className="mt-4 text-base text-text-soft sm:text-lg leading-relaxed">
          {t('heroSubtitle')}
        </p>
      </div>
    </div>
  );
}
