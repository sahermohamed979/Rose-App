import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<ProductsSearchParams>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Translations
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.products',
  });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function Page({ searchParams }: PageProps) {
  const categoriesPromise = getCategories();
  const occasionsPromise = getOccasions();

  const resolvedSearchParams: ProductsSearchParams =
    await searchParams;
  const productsData = getProductAction(resolvedSearchParams);

  return (
    <div className="flex flex-col lg:flex-row gap-6 my-4 md:my-8 px-4 sm:px-6 md:px-9 py-4 md:py-8 w-full">
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
