import React from 'react';

import ProductScreen from '@/features/products/screens/product-screen';
export default function page() {
  return (
    <div className="flex flex-row gap-5 my-17">
      <div className="w-1/3">{/* sidebar */}</div>

      <div className="w-2/3  ">
        <ProductScreen />
      </div>
    </div>
  );
}
