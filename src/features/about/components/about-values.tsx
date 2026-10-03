import { useTranslations } from 'next-intl';
import { Award, Leaf, ShieldCheck, Truck } from 'lucide-react';

export function AboutValues() {
  // Translation
  const t = useTranslations('aboutPage');

  // Variables
  const values = [
    {
      icon: ShieldCheck,
      title: t('values.quality.title'),
      desc: t('values.quality.desc'),
    },
    {
      icon: Award,
      title: t('values.artistry.title'),
      desc: t('values.artistry.desc'),
    },
    {
      icon: Leaf,
      title: t('values.sustainability.title'),
      desc: t('values.sustainability.desc'),
    },
    {
      icon: Truck,
      title: t('values.service.title'),
      desc: t('values.service.desc'),
    },
  ];

  return (
    <section className="rounded-3xl border border-border-subtle bg-bg-elevated/70 p-8 sm:p-12">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
          {t('valuesTitle')}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-text-soft">
          {t('valuesSubtitle')}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((val) => {
          const Icon = val.icon;
          return (
            <div
              key={val.title}
              className="flex flex-col rounded-2xl border border-border-subtle bg-bg-plain p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-border-primary hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-soft-pink-100 text-maroon-700 dark:bg-maroon-900/60 dark:text-soft-pink-300">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-base font-bold text-text-primary">
                {val.title}
              </h3>

              <p className="mt-2 text-xs text-text-soft leading-relaxed">
                {val.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
