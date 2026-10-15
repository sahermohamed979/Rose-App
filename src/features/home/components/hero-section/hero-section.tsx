'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import {
  Sparkles,
  ArrowRight,
  Star,
  Truck,
  Gift,
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import dynamic from 'next/dynamic';

const HeroThreeCanvas = dynamic(
  () =>
    import('./hero-three-canvas').then((mod) => ({
      default: mod.HeroThreeCanvas,
    })),
  { ssr: false }
);

export default function HeroSection(): React.JSX.Element {
  const t = useTranslations();
  const route = useRouter();

  return (
    <section className="w-full px-4 sm:px-6 md:px-9 mt-4 sm:mt-8">
      <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 bg-[#0d0509] shadow-2xl shadow-black/40">
        {/* ── Backgrounds ───────────────────────────── */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#14060d] via-[#1f0914] to-[#0f0616]" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[420px] h-[420px] md:w-[560px] md:h-[560px] rounded-full bg-[radial-gradient(circle,rgba(190,40,85,0.35)_0%,rgba(120,20,60,0.12)_50%,transparent_75%)]" />
          <div className="absolute -bottom-24 -left-16 w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(243,201,122,0.10)_0%,transparent_70%)]" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
            }}
          />
        </div>

        {/* ── Main area ─────────────────────────────── */}
        <div className="relative min-h-[460px] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[560px]">
          {/* 3D canvas (background on mobile, right side on desktop) */}
          <div className="absolute inset-y-0 end-0 w-full lg:w-[58%] z-[1] pointer-events-none opacity-70 lg:opacity-100">
            <HeroThreeCanvas />
          </div>

          {/* Floating glass chips over the 3D (desktop only) */}

          {/* Text */}
          <div className="relative z-[2] flex flex-col  justify-end lg:justify-center min-h-[460px] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[560px] px-6 sm:px-10 md:px-14 lg:px-16 py-10 max-w-xl lg:max-w-[46%]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight bg-gradient-to-r from-white via-soft-pink-300 to-soft-pink-400 bg-clip-text text-transparent">
              {t('hero.flowersTitle')}
            </h1>

            <div className="mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-soft-pink-400 to-amber-300" />

            <p className="text-white/60 text-sm sm:text-base md:text-lg mt-4 max-w-md leading-relaxed">
              {t('hero.flowersSubtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-7 sm:mt-9">
              <Button
                onClick={() => route.push('/products')}
                className="group bg-gradient-to-r from-maroon-600 to-soft-pink-600 hover:from-maroon-500 hover:to-soft-pink-500 text-white px-7 sm:px-9 h-11 sm:h-12 rounded-full text-sm sm:text-base font-semibold shadow-xl shadow-maroon-900/40 transition-all duration-300 hover:scale-[1.03]"
              >
                <Gift size={16} className="me-2" />
                {t('hero.shopNow')}
                <ArrowRight
                  size={16}
                  className="ms-2 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                />
              </Button>

              <button
                type="button"
                onClick={() => route.push('/products')}
                className="text-white/80 hover:text-white text-sm sm:text-base font-medium underline underline-offset-8 decoration-white/30 hover:decoration-soft-pink-300 transition-colors"
              >
                {t('hero.buyNow')}
              </button>
            </div>
          </div>
        </div>

        {/* ── Glass stats bar ───────────────────────── */}
        <div className="relative z-[3] grid grid-cols-3 border-t border-white/10 bg-black/25 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 py-4 sm:py-5 px-2">
            <Gift size={18} className="text-soft-pink-300" />
            <div className="text-center sm:text-start leading-tight">
              <p className="text-white font-bold text-base sm:text-lg">
                500+
              </p>
              <p className="text-white/45 text-[10px] sm:text-xs">
                {t('hero.specialGifts')
                  .split(' ')
                  .slice(0, 2)
                  .join(' ')}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 py-4 sm:py-5 px-2 border-x border-white/10">
            <Star size={18} className="text-soft-pink-300" />
            <div className="text-center sm:text-start leading-tight">
              <p className="text-white font-bold text-base sm:text-lg">
                4.9
              </p>
              <p className="text-white/45 text-[10px] sm:text-xs">
                Rating
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 py-4 sm:py-5 px-2">
            <Truck size={18} className="text-soft-pink-300" />
            <div className="text-center sm:text-start leading-tight">
              <p className="text-white font-bold text-sm sm:text-base">
                {t('features.freeDelivery')}
              </p>
              <p className="text-white/45 text-[10px] sm:text-xs">
                {t('hero.startingFrom')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
