'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/shared/components/ui/carousel';
import { useLocale } from 'next-intl';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({
  images,
  title,
}: ProductGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const locale = useLocale();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  if (!images?.length) {
    return null;
  }

  return (
    <div>
      {/* Main Carousel */}
      <Carousel
        setApi={setApi}
        className="w-full relative group"
        opts={{ loop: true, direction: direction }}
        dir={direction}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-120 w-full overflow-hidden rounded-2xl">
                <Image
                  src={image}
                  alt={`${title} - image ${index + 1}`}
                  width={800}
                  height={500}
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Thumbnails */}
      <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`group relative h-24 w-24 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
              current === index
                ? 'border-border-primary'
                : 'border-transparent '
            }`}
          >
            {/* Thumbnail */}
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        ))}
      </div>
    </div>
  );
}
