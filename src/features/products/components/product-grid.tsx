import { useTranslations } from 'next-intl';
import ProductCard from '../../home/components/product-card';
import EmptyState from './empty-state';
import { IProduct } from '@/shared/lib/types/product-types';

export default function ProductGrid({
  products,
}: {
  products: IProduct[];
}) {
  const t = useTranslations('products');

  if (products.length === 0) {
    return (
      <EmptyState
        title={t('noProductMatch')}
        description={t('tryClear')}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-b pb-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
