import { useTranslations } from 'next-intl';
import { Award, Flower2, Heart, Star } from 'lucide-react';

export function AboutStats() {
  // Translation
  const t = useTranslations('aboutPage.stats');

  // Variables
  const stats = [
    {
      icon: Heart,
      value: t('deliveredCount'),
      label: t('delivered'),
    },
    {
      icon: Flower2,
      value: t('freshnessCount'),
      label: t('freshness'),
    },
    {
      icon: Award,
      value: t('floristsCount'),
      label: t('florists'),
    },
    {
      icon: Star,
      value: t('ratingCount'),
      label: t('rating'),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-bg-elevated p-6 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-border-primary hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-soft-pink-100 text-maroon-700 dark:bg-maroon-900/60 dark:text-soft-pink-300 mb-3">
              <Icon className="h-6 w-6" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              {stat.value}
            </span>
            <span className="mt-1 text-xs sm:text-sm font-medium text-text-soft">
              {stat.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
