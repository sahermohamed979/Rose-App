import { notFound } from 'next/navigation';
import { getProductDetailsInfo } from '@/features/products/apis/product-details-info.api';
import ProductDetailsInfo from '@/features/products/components/product-details-info';
import ProductReview from '@/features/products/components/product-review';

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
    <div className="flex flex-col gap-5 px-4">
      <ProductDetailsInfo
        productId={productId}
        initialData={response.payload.product}
      />
      <ProductReview productId={productId} />
    </div>
  );
}
