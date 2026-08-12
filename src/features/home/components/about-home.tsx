'use client';
import React from 'react';
import img1 from '@/shared/assets/images/about-home (1).png';
import img2 from '@/shared/assets/images/about-home (2).png';
import img3 from '@/shared/assets/images/about-home (3).png';
import Image from 'next/image';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import SectionSubtitle from './section-subtitle';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

function AboutSection() {
  // Translations
  const t = useTranslations('home.about');

  // Hooks
  const router = useRouter();

  // Data
  const features = [
    t('features.price'),
    t('features.quality'),
    t('features.occasion'),
    t('features.delivery'),
  ];

  return (
    <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-8 overflow-hidden">
      {/* Photos */}
      <div className="flex flex-col sm:flex-row gap-6 w-full md:w-1/2 items-center">
        {/* Main Photo */}
        <div className="relative w-full sm:w-3/5">
          {/* Back Line */}
          <div className="absolute -bottom-0.5 rotate-3 -left-2 sm:-left-4 rtl:left-auto rtl:-right-2 rtl:sm:-right-4 w-full h-full border-4 sm:border-5 border-bg-primary-saturated rounded-[50px_120px_120px_120px] z-0"></div>
          <Image
            src={img3}
            placeholder="blur"
            alt="Purple Gift Box"
            className="relative w-full h-72 sm:h-80 md:h-96 aspect-3/4 object-cover rounded-[50px_120px_120px_120px] z-10"
          />
        </div>

        {/* Other Photos */}
        <div className="flex flex-row sm:flex-col gap-6 w-full sm:w-2/5">
          <Image
            src={img1}
            placeholder="blur"
            alt="Wrapped Gift"
            className="w-full aspect-square rounded-full object-cover"
          />
          <Image
            src={img2}
            placeholder="blur"
            alt="Gift with Balloons"
            className="w-full aspect-4/3 rounded-[50px_100px_100px_50px] object-cover"
          />
        </div>
      </div>

      {/* About */}
      <div className="w-full md:w-1/2">
        <SectionSubtitle Text={t('label')} className="mx-auto" />

        {/* Title */}
        <h2 className="text-3xl md:text-4xl text-text-primary font-bold leading-snug mb-5">
          {t.rich('title', {
            highlight: (chunks) => (
              <span className="text-text-secondary">{chunks}</span>
            ),
          })}
        </h2>

        {/* Description */}
        <p className="text-text-soft text-base leading-relaxed mb-8 font-normal">
          {t('description')}
        </p>

        {/* Button */}
        <Button
          onClick={() => router.push('/products')}
          className="bg-bg-primary-saturated text-text-inverse mb-5 text-base font-normal flex items-center gap-2"
          variant="default"
        >
          {t('discover')}
          <ArrowRight size={16} className="rtl:rotate-180" />
        </Button>

        {/* Product Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 font-normal text-plain text-sm"
            >
              {/* Icon */}
              <Check
                size={20}
                className="text-text-primary shrink-0"
              />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
