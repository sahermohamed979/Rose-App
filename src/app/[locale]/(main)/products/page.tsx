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
    <div className="flex gap-5 my-8 px-4 py-8">
      <aside className="w-1/4 border-r border-border-subtle">
        <Suspense fallback={<FilterSidebarSkeleton />}>
          <SidebarFilters
            categoriesPromise={categoriesPromise}
            occasionsPromise={occasionsPromise}
            searchParams={resolvedSearchParams}
          />
        </Suspense>
      </aside>

      <main className="w-3/4">
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
