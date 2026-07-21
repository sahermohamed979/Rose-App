import React from 'react';
import Image from 'next/image';
import galleryColumns from '../consts/gallery-data';
import HeaderTitle from './headr-title';
import SectionSubtitle from './section-subtitle';
import { useTranslations } from 'next-intl';

function GallerySection() {
  // Translation
  const t = useTranslations('header.home');

  return (
    <section className="max-w-7xl mx-auto py-16 px-5 font-sans">
      {/* Title*/}
      <div className="text-center mb-10">
        <SectionSubtitle
          Text={t('gallery.label')}
          className="mx-auto"
        />
        <HeaderTitle text={t('gallery.title')} className="mx-auto" />
      </div>

      {/* Gallery*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            {column.map((image) => (
              <Image
                key={image.id}
                src={image.src}
                alt={image.alt}
                width={400}
                className="w-full object-cover"
                style={{ height: `${image.height}px` }}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default GallerySection;
