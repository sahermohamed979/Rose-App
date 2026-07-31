import { HeartPlus, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import AddToCart from '@/features/cart-wishlist/components/add-to-cart';

interface Props {
  productId: string;
  stock: number;
}

export default function ProductActions({ productId, stock }: Props) {
  const t = useTranslations('ProductDetails');

  return (
    <div className="flex gap-4">
      <button
        className="w-12 h-12 rounded-lg bg-bg-muted flex items-center justify-center"
        aria-label={t('addToFavorites')}
      >
        <HeartPlus size={20} />
      </button>
      <AddToCart
        className="flex-1 h-11 flex items-center justify-center gap-2 text-text-inverse"
        productId={productId}
        stock={stock}
      >
        <ShoppingCart size={22} />
        {t('addToCart')}
      </AddToCart>
    </div>
  );
}
