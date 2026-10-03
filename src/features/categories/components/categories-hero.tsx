import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';

import { Breadcrumb } from '@/shared/components/ui/breadcrumb';
import { CategoriesSearchInput } from './categories-search-input';

interface CategoriesHeroProps {
  totalCount?: number;
}

export function CategoriesHero({ totalCount }: CategoriesHeroProps) {
  // Translation
  const t = useTranslations('categoriesPage');
  const tCommon = useTranslations('common');

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-soft-pink-100/50 via-bg-subtle/60 to-transparent dark:from-maroon-950/40 dark:via-bg-default/40 p-6 sm:p-10 md:p-14 border border-border-subtle/80">
      {/* Subtle Ambient Decorative Circles */}
      <div className="pointer-events-none absolute -top-24 -end-24 h-72 w-72 rounded-full bg-soft-pink-300/30 blur-3xl dark:bg-maroon-700/10" />
      <div className="pointer-events-none absolute -bottom-24 -start-24 h-72 w-72 rounded-full bg-maroon-400/20 blur-3xl dark:bg-soft-pink-800/10" />

      {/* Breadcrumb Navigation */}
      <div className="relative z-10 mb-6">
        <Breadcrumb
          items={[
            { label: tCommon('home') || 'Home', href: '/' },
            { label: t('breadcrumb') },
          ]}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-bg-elevated px-4 py-1.5 text-xs font-semibold text-text-primary shadow-xs border border-border-subtle">
          <Sparkles className="h-3.5 w-3.5 text-maroon-500 dark:text-soft-pink-400" />
          <span>{t('badge')}</span>
          {typeof totalCount === 'number' && (
            <span className="rounded-full bg-bg-primary px-2 py-0.5 text-[11px] text-text-inverse">
              {totalCount}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
          {t('title')}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base text-text-soft sm:text-lg leading-relaxed">
          {t('subtitle')}
        </p>

        {/* Search Bar - Client Island */}
        <div className="mt-8 flex justify-center">
          <CategoriesSearchInput />
        </div>
      </div>
    </div>
  );
}
