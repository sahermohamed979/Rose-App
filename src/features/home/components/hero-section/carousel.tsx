'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/shared/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import img1 from '../../assets/images/01467f720fe7a76f6c05ac3be7d4de290cc20957.png';
import img2 from '../../assets/images/e7f218b3bfaca1e7ad292827dc8a72cab87798a6.png';
import img3 from '../../assets/images/47cf4ce3cc028ed55f9510ba0b3b684365c1387a.png';
import { Button } from '@/shared/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';

const slides = [
  { id: 1, image: img1 },
  { id: 2, image: img2 },
  { id: 3, image: img3 },
];

export default function HeroCarousel() {
  const params = useParams();
  const locale = params?.locale as string;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const t = useTranslations();
  const route = useRouter();

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    if (!api) {
      return;
    }
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
        opts={{
          loop: true,
          direction: dir === 'rtl' ? 'rtl' : 'ltr',
        }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-72 sm:h-96 md:h-110 w-full">
                <Image
                  src={slide.image}
                  alt=""
                  className="object-cover"
                  fill
                  priority={slide.id === 1}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 bg-linear-to-r from-black/80 to-black/0 pointer-events-none z-10" />

      <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-10 rtl:left-auto rtl:right-4 sm:rtl:right-6 z-20 max-w-[85%] sm:max-w-none">
        <p className="text-text-inverse text-2xl sm:text-3xl md:text-4xl font-semibold">
          {t('hero.flowersTitle')}
        </p>
        <p className="text-text-inverse text-xs sm:text-base mb-2">
          {t('hero.flowersSubtitle')}
        </p>
        <Button
          onClick={() => route.push('products')}
          className="bg-bg-primary-fade px-3 py-2 sm:px-4 sm:py-2.5 h-8 sm:h-9 w-28 sm:w-32 rounded-[10px] text-xs sm:text-sm flex justify-center items-center text-maroon-700 font-semibold"
        >
          {t('hero.buyNow')}
        </Button>
      </div>

      {/* Dots — top right */}
      <div className="absolute top-4 right-5 flex items-center gap-1.5 z-20 rtl:right-auto rtl:left-5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              borderRadius: i === current ? '4px' : '50%',
              background:
                i === current
                  ? 'var(--maroon-600)'
                  : 'var(--maroon-50)',
            }}
          />
        ))}
      </div>

      {/* Arrows — both in one pill, bottom right */}
      <div className="absolute bottom-6 right-6 flex h-9 w-18.5 items-center justify-between rounded-full bg-bg-primary-fade rtl:right-auto rtl:left-6 z-20">
        <button
          type="button"
          onClick={canScrollPrev ? scrollPrev : undefined}
          disabled={!canScrollPrev}
          aria-label={t('header.nav.prevSlide')}
          className="flex items-center justify-center p-1 rounded-full text-black disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-black/10 transition-colors"
        >
          <ChevronLeft size={24} className="rtl:rotate-180" />
        </button>
        <button
          type="button"
          onClick={canScrollNext ? scrollNext : undefined}
          disabled={!canScrollNext}
          aria-label={t('header.nav.nextSlide')}
          className="flex items-center justify-center p-1 rounded-full text-black disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-black/10 transition-colors"
        >
          <ChevronRight size={24} className="rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
}
