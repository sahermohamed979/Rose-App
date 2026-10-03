import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, PartyPopper, Sparkles } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { OccasionType } from '@/shared/lib/types/product-types';

interface OccasionCardProps {
  occasion: OccasionType;
}

export function OccasionCard({ occasion }: OccasionCardProps) {
  // Translation
  const t = useTranslations('occasionsPage');

  // Variables
  const imageUrl = occasion.image || null;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated transition-all duration-300 hover:-translate-y-1.5 hover:border-border-primary hover:shadow-xl hover:shadow-maroon-500/10">
      {/* Top Media Section */}
      <Link
        href={`/products?occasionId=${occasion.id}`}
        className="relative block h-60 w-full overflow-hidden bg-gradient-to-tr from-soft-pink-100 via-rose-100 to-amber-50 dark:from-maroon-950 dark:via-neutral-900 dark:to-neutral-950"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={occasion.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 shadow-sm dark:bg-maroon-900/40 text-maroon-600 dark:text-soft-pink-300">
              <PartyPopper className="h-8 w-8 animate-bounce" />
            </div>
            <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              {occasion.title}
            </span>
          </div>
        )}

        {/* Ambient Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Occasion Floating Pill */}
        <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-xs font-medium border border-white/10">
            <Sparkles className="h-3 w-3 text-amber-300" />
            <span>{occasion.title}</span>
          </span>

          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition-transform group-hover:scale-110">
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </span>
        </div>
      </Link>

      {/* Details Body */}
      <div className="flex flex-1 flex-col p-5">
        <Link
          href={`/products?occasionId=${occasion.id}`}
          className="group-hover:text-text-primary transition-colors"
        >
          <h3 className="text-lg font-bold text-text-primary line-clamp-1">
            {occasion.title}
          </h3>
        </Link>

        <p className="mt-2 text-sm text-text-soft line-clamp-2 leading-relaxed">
          {occasion.description || t('subtitle')}
        </p>

        {/* Bottom CTA */}
        <div className="mt-6 border-t border-border-subtle pt-4">
          <Link
            href={`/products?occasionId=${occasion.id}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-bg-subtle py-2.5 text-xs font-semibold text-text-default transition-all duration-200 group-hover:bg-bg-primary group-hover:text-text-inverse"
          >
            <span>{t('explore')}</span>
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
