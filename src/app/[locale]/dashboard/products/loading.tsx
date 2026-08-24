import DashboardProductsTableSkeleton from '@/features/products/skeletons/dashboard-products.skeleton';
import GlobalSearch from '@/shared/components/dashboard-global-search';
import PageHeader from '@/shared/components/dashboard-page-header';
import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations('products');

  return (
    <div className="flex flex-col space-y-4">
      <div className="p-6 rounded-2xl bg-bg-plain space-y-6 flex flex-col shadow-sm">
        <PageHeader
          title={t('allProducts')}
          Text={t('addNewProduct')}
          Href="/dashboard/products/new"
        />

        <GlobalSearch queryName="search" />

        <DashboardProductsTableSkeleton />
      </div>
    </div>
  );
}
