import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';

import img1 from '@/shared/assets/images/about-home (1).png';
import img2 from '@/shared/assets/images/about-home (2).png';
import img3 from '@/shared/assets/images/about-home (3).png';

export function AboutStory() {
  // Translation
  const t = useTranslations('aboutPage');

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
      {/* Visual Composition */}
      <div className="flex flex-col sm:flex-row gap-5 w-full lg:w-1/2 items-center">
        {/* Main Photo with Decorative Outline */}
        <div className="relative w-full sm:w-3/5">
          <div className="absolute -bottom-1 -left-2 sm:-left-3 rtl:left-auto rtl:-right-2 rtl:sm:-right-3 w-full h-full border-4 border-maroon-500/30 rounded-[40px_100px_100px_100px] z-0" />
          <Image
            src={img3}
            placeholder="blur"
            alt="Luxury Flower Bouquet Presentation"
            className="relative w-full h-80 sm:h-96 object-cover rounded-[40px_100px_100px_100px] shadow-lg z-10"
          />
        </div>

        {/* Stacked Complementary Photos */}
        <div className="flex flex-row sm:flex-col gap-5 w-full sm:w-2/5">
          <Image
            src={img1}
            placeholder="blur"
            alt="Handcrafted Gift Packaging"
            className="w-full aspect-square rounded-3xl object-cover shadow-sm"
          />
          <Image
            src={img2}
            placeholder="blur"
            alt="Festive Flower Basket"
            className="w-full aspect-4/3 rounded-3xl object-cover shadow-sm"
          />
        </div>
      </div>

      {/* Story Narrative */}
      <div className="w-full lg:w-1/2">
        <div className="inline-flex items-center gap-2 rounded-full bg-soft-pink-100 dark:bg-maroon-900/50 px-3.5 py-1 text-xs font-semibold text-maroon-700 dark:text-soft-pink-300 mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{t('storyBadge')}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary leading-tight">
          {t('storyTitle')}
        </h2>

        <div className="mt-5 space-y-4 text-sm sm:text-base text-text-soft leading-relaxed">
          <p>{t('storyP1')}</p>
          <p>{t('storyP2')}</p>
        </div>
      </div>
    </section>
  );
}
