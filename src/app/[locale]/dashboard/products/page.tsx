import { getProductAction } from '@/features/products/apis/products-api';
import DashboardProductsTable from '@/features/products/components/dashboard-products-table';
import PaginationProducts from '@/features/products/components/pagination-products';
import GlobalSearch from '@/shared/components/dashboard-global-search';
import PageHeader from '@/shared/components/dashboard-page-header';
import { ProductsSearchParams } from '@/shared/lib/types/product-types';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  searchParams: Promise<ProductsSearchParams>;
}

export default async function ProductsPage({
  searchParams,
}: PageProps) {
  const resolvedParams = await searchParams;
  const t = await getTranslations('products');

  const data = await getProductAction(resolvedParams);

  // API request failed
  if (!data) {
    throw new Error('Failed to fetch products');
  }

  const products = data.data;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-6 rounded-2xl bg-bg-plain p-6">
        <PageHeader
          title={t('allProducts')}
          Text={t('addNewProduct')}
          Href="/dashboard/products/new"
        />

        <GlobalSearch queryName="search" />

        <DashboardProductsTable products={products} />
      </div>

      <div className="flex justify-center">
        <PaginationProducts data={data} />
      </div>
    </div>
  );
}
