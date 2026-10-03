import { useTranslations } from 'next-intl';
import { PartyPopper } from 'lucide-react';

import { Breadcrumb } from '@/shared/components/ui/breadcrumb';
import { OccasionsSearchInput } from './occasions-search-input';

interface OccasionsHeroProps {
  totalCount?: number;
}

export function OccasionsHero({ totalCount }: OccasionsHeroProps) {
  // Translation
  const t = useTranslations('occasionsPage');
  const tCommon = useTranslations('common');

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-amber-100/40 via-soft-pink-100/30 to-transparent dark:from-amber-950/20 dark:via-maroon-950/20 dark:to-transparent p-6 sm:p-10 md:p-14 border border-border-subtle/80">
      {/* Decorative Blur Spheres */}
      <div className="pointer-events-none absolute -top-20 -end-20 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl dark:bg-amber-600/10" />
      <div className="pointer-events-none absolute -bottom-20 -start-20 h-64 w-64 rounded-full bg-soft-pink-300/30 blur-3xl dark:bg-maroon-700/10" />

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
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-bg-elevated px-4 py-1.5 text-xs font-semibold text-text-primary shadow-xs border border-border-subtle">
          <PartyPopper className="h-3.5 w-3.5 text-amber-500" />
          <span>{t('badge')}</span>
          {typeof totalCount === 'number' && (
            <span className="rounded-full bg-bg-primary px-2 py-0.5 text-[11px] text-text-inverse">
              {totalCount}
            </span>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
          {t('title')}
        </h1>

        <p className="mt-4 text-base text-text-soft sm:text-lg leading-relaxed">
          {t('subtitle')}
        </p>

        {/* Search - Client Island */}
        <div className="mt-8 flex justify-center">
          <OccasionsSearchInput />
        </div>
      </div>
    </div>
  );
}
