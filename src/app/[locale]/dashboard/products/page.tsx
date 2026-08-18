import { getProductAction } from '@/features/products/apis/products-api';
import DashboardProductsTable from '@/features/products/components/dashboad-table';
import PaginationProducts from '@/features/products/components/pagination-products';
import DashboardProductsTableSkeleton from '@/features/products/skeletons/dashboard-products.skeleton';
import GlobalSearch from '@/shared/components/dashboard-global-seach';
import PageHeader from '@/shared/components/dashboard-page-header';
import { ProductsSearchParams } from '@/shared/lib/types/product-types';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

interface PageProps {
  searchParams: Promise<ProductsSearchParams>;
}

async function ProductsDataWrapper({
  searchParams,
}: {
  searchParams: ProductsSearchParams;
}) {
  const data = await getProductAction(searchParams);
  const products = data?.data || [];

  return (
    <>
      <DashboardProductsTable products={products} />
      <PaginationProducts data={data} />
    </>
  );
}

export default async function ProductsPage({
  searchParams,
}: PageProps) {
  const resolvedParams = await searchParams;
  const t = await getTranslations('products');
  const pageKey = String(resolvedParams?.page || '1');

  return (
    <div className="p-6 space-y-6 flex flex-col h-full">
      {/* Header */}
      <PageHeader
        title={t('allProducts')}
        Text={t('addNewProduct')}
        Href="/dashboard/products/new"
      />

      {/* Search Bar */}
      <GlobalSearch queryName="search" />

      {/* Products Table */}
      <Suspense
        key={pageKey}
        fallback={<DashboardProductsTableSkeleton />}
      >
        <ProductsDataWrapper searchParams={resolvedParams} />
      </Suspense>
    </div>
  );
}
