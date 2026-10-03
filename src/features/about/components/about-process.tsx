import { useTranslations } from 'next-intl';
import { Box, Droplets, Flower2, Heart } from 'lucide-react';

export function AboutProcess() {
  // Translation
  const t = useTranslations('aboutPage');

  // Steps data
  const steps = [
    {
      num: '01',
      icon: Flower2,
      title: t('steps.step1Title'),
      desc: t('steps.step1Desc'),
    },
    {
      num: '02',
      icon: Heart,
      title: t('steps.step2Title'),
      desc: t('steps.step2Desc'),
    },
    {
      num: '03',
      icon: Droplets,
      title: t('steps.step3Title'),
      desc: t('steps.step3Desc'),
    },
    {
      num: '04',
      icon: Box,
      title: t('steps.step4Title'),
      desc: t('steps.step4Desc'),
    },
  ];

  return (
    <section className="py-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
          {t('processTitle')}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-text-soft">
          {t('processSubtitle')}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="relative flex flex-col rounded-2xl border border-border-subtle bg-bg-elevated p-6 shadow-xs transition-all duration-300 hover:border-border-primary"
            >
              {/* Step Number Top Badge */}
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-maroon-600/30 dark:text-soft-pink-400/30">
                  {step.num}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-soft-pink-100 text-maroon-700 dark:bg-maroon-900/60 dark:text-soft-pink-300">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <h3 className="mt-5 text-base font-bold text-text-primary">
                {step.title}
              </h3>

              <p className="mt-2 text-xs text-text-soft leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
