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

const slides = [
  {
    id: 1,
    image: img1,
  },
  {
    id: 2,
    image: img2,
  },
  {
    id: 3,
    image: img3,
  },
];

import { Button } from '@base-ui/react/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function HeroCarousel() {
  const route = useRouter();
  const params = useParams();
  const locale = params?.locale as string;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const t = useTranslations();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
        opts={{
          loop: false,
          direction: dir === 'rtl' ? 'rtl' : 'ltr',
        }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-110 w-full">
                <Image
                  src={slide.image}
                  alt=""
                  className="object-cover"
                  fill
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black/80 to-black/0" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-10 rtl:right-6  ">
                  <p className="text-text-inverse text-4xl font-semibold ">
                    {t('hero.flowersTitle')}
                  </p>
                  <p className="text-text-inverse  h-12">
                    {t('hero.flowersSubtitle')}
                  </p>
                  <Button
                    onClick={() => {
                      route.push('products');
                    }}
                    className={
                      'bg-bg-primary-fade px-4 py-2.5 h-9 w-32 rounded-[10px] mt-1.5  flex justify-center items-center text-maroon-700 '
                    }
                  >
                    {t('hero.buyNow')}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots — top right */}
      <div className="absolute top-4 right-5 flex items-center gap-1.5 z-10 rtl:right-auto rtl:left-5">
        {slides.map((_, i) => (
          <Button
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
      <div className="absolute bottom-6 right-6 flex h-9 w-18.5 items-center justify-between rounded-full bg-bg-primary-fade rtl:right-auto rtl:left-6">
        <ChevronLeft
          size={30}
          onClick={canScrollPrev ? scrollPrev : undefined}
          className={`p-1 rtl:rotate-180 transition-colors
      ${
        canScrollPrev
          ? 'cursor-pointer text-black'
          : 'cursor-not-allowed text-gray-400'
      }
    `}
        />

        <ChevronRight
          size={30}
          onClick={canScrollNext ? scrollNext : undefined}
          className={`p-1 rtl:rotate-180 transition-colors
      ${
        canScrollNext
          ? 'cursor-pointer text-black'
          : 'cursor-not-allowed text-gray-400'
      }
    `}
        />
      </div>
    </div>
  );
}
