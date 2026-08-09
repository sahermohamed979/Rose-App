import React from 'react';
import { GetRelatedProducts } from './get-related-products';

interface RelatedProductsType {
  categoryId: string;
  currentProductId: string;
}

export default function RelatedProducts({
  categoryId,
  currentProductId,
}: RelatedProductsType) {
  return (
    <>
      <main>
        <div className="ms-10 mt-12.5 mb-10">
          {/** Title  */}
          <div className="relative inline-block">
            <div className="absolute bottom-0 left-0 h-5 w-[55%] rounded-r-[18px] bg-bg-primary-fade" />
            <h2 className="relative z-10 text-3xl font-bold text-maroon-700">
              Related Products
            </h2>
            <div className="absolute bottom-0 left-0 z-20 h-0.5 w-15 bg-bg-primary-saturated" />
          </div>

          {/** Related products  */}

          <div>
            <GetRelatedProducts
              currentProductId={currentProductId}
              categoryId={categoryId}
            />
          </div>
        </div>
      </main>
    </>
  );
}
