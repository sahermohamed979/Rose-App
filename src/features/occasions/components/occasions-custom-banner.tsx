import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles } from 'lucide-react';

import { Link } from '@/i18n/navigation';

export function OccasionsCustomBanner() {
  // Translation
  const t = useTranslations('occasionsPage');

  return (
    <section className="relative mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-950 p-8 sm:p-12 text-white shadow-xl">
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -bottom-12 -end-12 h-64 w-64 rounded-full bg-soft-pink-400/20 blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl text-center md:text-start">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-soft-pink-200 border border-white/10">
            <Sparkles className="h-3 w-3" />
            <span>{t('vipBadge')}</span>
          </div>

          <h3 className="mt-3 text-2xl font-bold sm:text-3xl text-white">
            {t('customTitle')}
          </h3>

          <p className="mt-2 text-sm text-soft-pink-100/90 sm:text-base leading-relaxed">
            {t('customDesc')}
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-maroon-900 transition-all hover:bg-soft-pink-100 hover:shadow-lg active:scale-95"
        >
          <span>{t('customCta')}</span>
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
