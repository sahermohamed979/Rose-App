import { getTranslations } from 'next-intl/server';

import AddNewProductForm from '@/features/products/components/add-new-product-form';
import ProductOptionsLoadError from '@/features/products/components/product-options-load-error';
import {
  getCategories,
  getOccasions,
} from '@/features/products/apis/filter-api';
import PageHeader from '@/shared/components/dashboard-page-header';
import type {
  OccasionType,
  ProductCategory,
} from '@/shared/lib/types/product-types';

export default async function AddProductPage() {
  const t = await getTranslations('dashboard.products');

  // Data
  const [categories, occasions]: [
    ProductCategory[] | null,
    OccasionType[] | null,
  ] = await Promise.all([getCategories(), getOccasions()]);

  return (
    <div className="p-4 md:p-0">
      <PageHeader title={t('addNewProduct')} />
      <div className="flex flex-col space-y-6 rounded-2xl bg-bg-plain p-6">
        {!categories?.length || !occasions?.length ? (
          <ProductOptionsLoadError />
        ) : (
          <AddNewProductForm
            categories={categories}
            occasions={occasions}
          />
        )}
      </div>
    </div>
  );
}
