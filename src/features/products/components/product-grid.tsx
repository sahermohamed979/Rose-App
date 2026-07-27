'use client';

import { useTranslations } from 'next-intl';
import ProductCard from './product-cards';
import { ProductGridSkeleton } from '../skeletons/product-grid-skelton';
import EmptyState from './empty-state';
import { Product } from '../types/products-types';

const GRID_COLUMNS_CLASS =
  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-b pb-4';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

export default function ProductGrid({
  products,
  isLoading,
}: ProductGridProps) {
  const t = useTranslations('products');

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title={t('noProductMatch')}
        description={t('tryClear')}
      />
    );
  }

  return (
    <div className={GRID_COLUMNS_CLASS}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
