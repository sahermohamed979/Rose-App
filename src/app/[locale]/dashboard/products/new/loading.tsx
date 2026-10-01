import { useTranslations } from 'next-intl';

import ProductFormSkeleton from '@/features/products/skeletons/product-form.skeleton';
import PageHeader from '@/shared/components/dashboard-page-header';

export default function Loading() {
  // Translations
  const t = useTranslations('dashboard.products');

  return (
    <div className="p-4 md:p-0">
      <PageHeader title={t('addNewProduct')} />
      <div className="flex flex-col space-y-6 rounded-2xl bg-bg-plain p-6">
        <ProductFormSkeleton />
      </div>
    </div>
  );
}
