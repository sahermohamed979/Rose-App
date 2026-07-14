import React from 'react';
import Image from 'next/image';
import { brandsData } from '../consts/brands-data';
import { useTranslations } from 'next-intl';

const BrandsSection = () => {
  // Translation
  const t = useTranslations('home');
  return (
    <section className="py-10 px-5 max-w-7xl mx-auto ">
      <div className="bg-bg-carosel rounded-2xl py-10 px-5">
        {/* Title */}
        <h3 className="text-center text-2xl md:text-4xl font-bold text-text-primary mb-5">
          {t.rich('partners.title', {
            highlight: (chunks) => (
              <span className="text-text-secondary">{chunks}</span>
            ),
          })}
        </h3>
        {/* Brands */}
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 w-full mx-auto">
          {brandsData.map((brand) => (
            <Image
              key={brand.id}
              src={brand.src}
              alt={brand.alt}
              width={140}
              height={50}
              className="w-auto h-8 md:h-10 object-contain "
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
