import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles } from 'lucide-react';

import { Link } from '@/i18n/navigation';

export function AboutCta() {
  // Translation
  const t = useTranslations('aboutPage');

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-maroon-950 via-maroon-900 to-neutral-950 p-8 sm:p-14 text-white shadow-xl">
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -bottom-16 -end-16 h-72 w-72 rounded-full bg-soft-pink-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -top-16 -start-16 h-72 w-72 rounded-full bg-maroon-600/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-soft-pink-200 border border-white/10 mb-4">
          <Sparkles className="h-3 w-3" />
          <span>{t('experienceBadge')}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {t('ctaTitle')}
        </h2>

        <p className="mt-3 text-sm sm:text-base text-soft-pink-100/90 leading-relaxed max-w-xl mx-auto">
          {t('ctaSubtitle')}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-maroon-900 transition-all hover:bg-soft-pink-100 active:scale-95 shadow-md"
          >
            <span>{t('shopNow')}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xs transition-all hover:bg-white/20 active:scale-95"
          >
            <span>{t('contactUs')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
