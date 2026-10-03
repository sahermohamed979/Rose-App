import { useTranslations } from 'next-intl';
import { Heart, Sparkles, Cake, Trophy } from 'lucide-react';

export function OccasionsGuide() {
  // Translation
  const t = useTranslations('occasionsPage');

  // Icons map
  const icons = [Heart, Cake, Sparkles, Trophy];

  return (
    <section className="mt-16 rounded-3xl border border-border-subtle bg-bg-elevated/60 p-6 sm:p-10 backdrop-blur-xs">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {t('guideTitle')}
        </h2>
        <p className="mt-2 text-sm text-text-soft sm:text-base">
          {t('guideSubtitle')}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((index) => {
          const Icon = icons[index];
          const item = {
            title: t(`guideItems.${index}.title`),
            flowers: t(`guideItems.${index}.flowers`),
            desc: t(`guideItems.${index}.desc`),
          };

          return (
            <div
              key={index}
              className="flex flex-col rounded-2xl border border-border-subtle bg-bg-plain p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-border-primary hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-soft-pink-100 text-maroon-700 dark:bg-maroon-900/60 dark:text-soft-pink-300">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-base font-bold text-text-primary">
                {item.title}
              </h3>

              <div className="mt-2 rounded-lg bg-bg-subtle/80 px-2.5 py-1 text-xs font-medium text-maroon-700 dark:text-soft-pink-300">
                {item.flowers}
              </div>

              <p className="mt-3 text-xs text-text-soft leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
