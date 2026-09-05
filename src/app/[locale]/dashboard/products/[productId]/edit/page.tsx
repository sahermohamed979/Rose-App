import { getTranslations } from 'next-intl/server';
import {
  getCategories,
  getOccasions,
} from '@/features/products/apis/filter-api';
import {
  ProductCategory,
  OccasionType,
} from '@/shared/lib/types/product-types';
import { Loader2 } from 'lucide-react';
import EditProductForm from '@/features/products/components/edit-product-form';
import PageHeader from '@/shared/components/dashboard-page-header';
import { notFound } from 'next/navigation';
import { getSingleProduct } from '@/features/products/apis/get-single-product-api';

export default async function EditProduct({
  params,
}: {
  params: { productId: string };
}) {
  const t = await getTranslations('dashboard.products');

  // Data
  const [categories, occasions]: [
    ProductCategory[] | null,
    OccasionType[] | null,
  ] = await Promise.all([getCategories(), getOccasions()]);

  const { productId } = await params;
  const productData = await getSingleProduct(productId);
  if (!productData) {
    notFound();
  }
  console.log(productData?.product);
  return (
    <div className="p-4 md:p-0">
      <PageHeader title={t('editProductTitle')} />
      <div className="flex flex-col space-y-6 rounded-2xl bg-bg-plain p-6">
        {!categories?.length || !occasions?.length ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <EditProductForm
            categories={categories}
            occasions={occasions}
            product={productData?.product}
          />
        )}
      </div>
    </div>
  );
}
