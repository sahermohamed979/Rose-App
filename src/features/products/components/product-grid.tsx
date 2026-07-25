
'use client';

import ProductCard from './product-cards';
import { Pagination } from '@/shared/components/ui/pagination';
import { Product } from '../types/products-types';
import { useTranslations } from 'next-intl';
import { useProductsGrid } from '../hooks/use-product-grid';

export default function ProductGrid() {
  const t = useTranslations('products');
  const { products, isLoading, currentPage, totalPages, handlePageChange } = useProductsGrid();

  if (isLoading) {
    return (
      <div className="text-center py-20 text-text-muted">
        {t("loadingProducts")}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl bg-bg-subtle">
        <p className="text-lg font-semibold text-text-plain">{t('noProductMatch')}</p>
        <p className="text-sm text-text-muted mt-1">{t('tryClear')}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-b pb-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="my-6 w-full flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}