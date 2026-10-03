import { useTranslations } from 'next-intl';
import { SearchX } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { OccasionType } from '@/shared/lib/types/product-types';
import { OccasionsHero } from '../components/occasions-hero';
import { OccasionCard } from '../components/occasion-card';
import { OccasionsGuide } from '../components/occasions-guide';
import { OccasionsCustomBanner } from '../components/occasions-custom-banner';

interface OccasionsScreenProps {
  occasions: OccasionType[];
  totalCount?: number;
  searchQuery?: string;
}

export function OccasionsScreen({
  occasions,
  totalCount,
  searchQuery,
}: OccasionsScreenProps) {
  // Translation
  const t = useTranslations('occasionsPage');

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Hero Header */}
      <OccasionsHero totalCount={totalCount ?? occasions.length} />

      {/* Occasions Grid */}
      <div className="mt-10">
        {occasions.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {occasions.map((occasion) => (
              <OccasionCard key={occasion.id} occasion={occasion} />
            ))}
          </div>
        ) : (
          <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border-subtle p-12 text-center bg-bg-subtle/30">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
              <SearchX className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-text-primary">
              {t('emptyTitle')}
            </h3>
            <p className="mt-1.5 max-w-sm text-sm text-text-soft">
              {t('emptyDescription')}
            </p>
            {searchQuery && (
              <Link
                href="/occasions"
                className="mt-5 inline-block rounded-full bg-bg-primary px-5 py-2 text-sm font-semibold text-text-inverse hover:opacity-95 transition-opacity"
              >
                {t('clearSearch')}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Floral Gifting Guide */}
      <OccasionsGuide />

      {/* Bespoke Event Planning Banner */}
      <OccasionsCustomBanner />
    </div>
  );
}
