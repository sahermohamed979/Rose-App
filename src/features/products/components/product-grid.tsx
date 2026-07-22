'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ProductCard from './products-cards';
import { Pagination } from '@/shared/components/ui/pagination';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Product } from '../types/products-types';
import { useTranslations } from 'next-intl';

export default function ProductGrid() {
  const t = useTranslations('products');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current page from URL or default to 1
  const currentPage = Number(searchParams.get('page')) || 1;

  // Fetch products based on URL search parameters and filters
  const { data, isLoading } = useQuery({
    queryKey: ['grid-products', currentPage, searchParams.toString()],
    queryFn: async () => {
      const baseUrl =
        typeof window !== 'undefined' ? window.location.origin : '';

      const res = await fetch(
        `${baseUrl}/api/products?${searchParams.toString()}`
      );
      const json = await res.json();
      return json;
    },
  });

  // Extract products array and total pages from the API response payload
  const products: Product[] = data?.payload?.data || [];
  const totalPages = data?.payload?.metadata?.totalPages || 1;

  // Handle pagination change and update URL query params smoothly
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="text-center py-20 text-text-muted">
        Loading products...
      </div>
    );
  }

  // Show empty state if no products match the current filters
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl bg-bg-subtle">
        <p className="text-lg font-semibold text-text-plain">
          {t('noProductMatch')}
        </p>
        <p className="text-sm text-text-muted mt-1">
          {t('tryClear')}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between items-center">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-b pb-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Component */}
      <div className="my-6 w-full flex justify-center  ">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
