import { Suspense } from 'react';
import { ProductGridSkeleton } from '@/features/products/skeletons/product-grid-skelton';
import { FilterSidebarSkeleton } from '@/features/products/skeletons/filter-sidebar-skeleton';
import {
  getCategories,
  getOccasions,
} from '@/features/products/apis/filter-api';
import { ProductsSearchParams } from '@/shared/lib/types/product-types';
import SidebarFilters from '@/features/products/components/filters/sidebar-filters';
import ProductScreen from '@/features/products/screens/product-screen';
import { getProductAction } from '@/features/products/apis/products-api';

export default async function Page({
  searchParams,
}: PageProps<'/[locale]/products'>) {
  const categoriesPromise = getCategories();
  const occasionsPromise = getOccasions();

  const resolvedSearchParams: ProductsSearchParams =
    await searchParams;
  const productsData = getProductAction(resolvedSearchParams);

  return (
    <div className="flex flex-col lg:flex-row gap-6 my-4 md:my-8 px-4 md:px-8 py-4 md:py-8 max-w-7xl mx-auto">
      <aside className="w-full lg:w-1/4 lg:border-r border-border-subtle lg:pe-4">
        <Suspense fallback={<FilterSidebarSkeleton />}>
          <SidebarFilters
            categoriesPromise={categoriesPromise}
            occasionsPromise={occasionsPromise}
            searchParams={resolvedSearchParams}
          />
        </Suspense>
      </aside>

      <main className="w-full lg:w-3/4">
        <Suspense
          key={JSON.stringify(resolvedSearchParams)}
          fallback={<ProductGridSkeleton />}
        >
          <ProductScreen data={productsData} />
        </Suspense>
      </main>
    </div>
  );
}
