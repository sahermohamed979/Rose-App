import { useTranslations } from 'next-intl';
import { Award, Clock, Flower2, Gift } from 'lucide-react';

export function CategoriesPerks() {
  // Translation
  const t = useTranslations('categoriesPage.perks');

  // Variables
  const perks = [
    {
      icon: Flower2,
      title: t('freshTitle'),
      desc: t('freshDesc'),
    },
    {
      icon: Clock,
      title: t('deliveryTitle'),
      desc: t('deliveryDesc'),
    },
    {
      icon: Award,
      title: t('artisanTitle'),
      desc: t('artisanDesc'),
    },
    {
      icon: Gift,
      title: t('giftTitle'),
      desc: t('giftDesc'),
    },
  ];

  return (
    <section className="mt-14 rounded-2xl border border-border-subtle bg-bg-elevated/70 p-6 sm:p-8 backdrop-blur-xs">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {perks.map((perk) => {
          const Icon = perk.icon;
          return (
            <div
              key={perk.title}
              className="flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-bg-subtle/50"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-soft-pink-100 text-maroon-700 dark:bg-maroon-900/60 dark:text-soft-pink-300">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary">
                  {perk.title}
                </h4>
                <p className="mt-1 text-xs text-text-soft leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
