import PrdouctDetailsInfo from '@/features/products/components/product-details-info';
import React from 'react';

export default async function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = await params;
  return <PrdouctDetailsInfo productId={productId} />;
}
