'use client';

import {
  ArrowRight,
  Heart,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Tag,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export function EmptyWishlist() {
  // Translation
  const t = useTranslations('wishlist');

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border-muted/60 bg-gradient-to-b from-bg-muted/20 via-bg-plain to-bg-muted/10 p-8 sm:p-12 md:p-16 text-center my-6 shadow-subtle">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-maroon-500/10 via-soft-pink-400/15 to-transparent blur-3xl dark:from-maroon-700/20 dark:via-soft-pink-600/10 -z-10"
      />

      {/* Animated icon emblem */}
      <div className="relative mx-auto mb-6 flex items-center justify-center">
        {/* Pulsing halo */}
        <div
          aria-hidden="true"
          className="absolute size-28 sm:size-32 rounded-full bg-bg-primary-fade/60 animate-ping opacity-25"
        />

        {/* Rotating subtle ring */}
        <div
          aria-hidden="true"
          className="absolute size-32 sm:size-36 rounded-full border border-dashed border-border-primary/30 animate-[spin_30s_linear_infinite]"
        />

        {/* Central emblem */}
        <div className="relative size-24 sm:size-28 rounded-full bg-gradient-to-br from-bg-primary-fade via-bg-soft to-bg-plain flex items-center justify-center shadow-soft-lg border border-border-primary/30 group">
          <Heart
            className="size-11 sm:size-13 text-text-primary fill-bg-primary-fade/30 transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
            strokeWidth={1.5}
          />

          {/* Floating Sparkle Badge */}
          <div className="absolute -top-1.5 -end-1.5 size-7 sm:size-8 rounded-full bg-bg-primary text-text-inverse flex items-center justify-center shadow-subtle">
            <Sparkles className="size-3.5 sm:size-4" />
          </div>
        </div>
      </div>

      {/* Messaging */}
      <h2 className="text-2xl sm:text-3xl font-bold text-text-plain tracking-tight mb-2">
        {t('empty')}
      </h2>

      <p className="text-text-muted text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
        {t('emptySubtitle')}
      </p>

      {/* CTA Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
        <Link
          href="/products"
          className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-bg-primary hover:bg-bg-primary-saturated text-text-inverse font-semibold text-sm sm:text-base shadow-subtle hover:shadow-subtle-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
        >
          <ShoppingBag className="size-5 shrink-0" />
          <span>{t('startShopping')}</span>
          <ArrowRight className="size-4 shrink-0 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default EmptyWishlist;
