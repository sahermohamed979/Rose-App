import React from 'react';
import { getTranslations } from 'next-intl/server';

import { GetRelatedProducts } from './get-related-products';
import getRelatedProductsAction from '../apis/get-related-products-action';

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export default async function RelatedProducts({
  categoryId,
  currentProductId,
}: RelatedProductsProps) {
  // Translations
  const t = await getTranslations('ProductDetails');

  // Data fetching
  const category = await getRelatedProductsAction(categoryId);

  if (!category.status) {
    throw new Error('Failed to load related products');
  }

  const products = category.payload.category.products.filter(
    (product) => product.id !== currentProductId
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-4 sm:px-6 md:px-9 mt-8 sm:mt-12 md:mt-14 mb-8 sm:mb-12">
      {/* Title */}
      <div className="relative inline-block mb-4 sm:mb-6">
        <div className="absolute bottom-0 inset-s-0 h-4 sm:h-5 w-[55%] rounded-e-[18px] bg-bg-primary-fade" />
        <h2 className="relative z-10 text-xl sm:text-2xl md:text-3xl font-bold text-maroon-700 dark:text-maroon-300 tracking-tight">
          {t('relatedProducts')}
        </h2>
        <div className="absolute bottom-0 inset-s-0 z-20 h-0.5 w-12 sm:w-15 bg-bg-primary-saturated" />
      </div>

      {/* Related products carousel */}
      <div className="w-full">
        <GetRelatedProducts
          products={products}
          categoryId={categoryId}
          currentProductId={currentProductId}
        />
      </div>
    </section>
  );
}
