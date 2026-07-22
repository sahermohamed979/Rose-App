import { notFound } from 'next/navigation';
import { getProductDetailsInfo } from '@/features/products/apis/product-details-info.api';
import ProductDetailsInfo from '@/features/products/components/product-details-info';

interface PageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { productId } = await params;

  const response = await getProductDetailsInfo(productId);
  // Product doesn't exist
  if (response.code === 404) {
    notFound();
  }

  // Server / Network errors
  if (!response.status) {
    throw new Error('Failed to load product details');
  }

  return (
    <ProductDetailsInfo
      productId={productId}
      initialData={response.payload.product}
    />
  );
}
