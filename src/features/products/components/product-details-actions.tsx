import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import AddToCart from '@/features/cart-wishlist/components/add-to-cart';
import WishlistButton from '@/features/cart-wishlist/components/wishlist-button';

interface Props {
  productId: string;
  stock: number;
}

export default function ProductActions({ productId, stock }: Props) {
  const t = useTranslations('ProductDetails');

  return (
    <div className="flex gap-4">
      <WishlistButton
        className="w-12 h-12 rounded-lg hover:w-12"
        addedClassName="bg-bg-inverse enabled:hover:bg-bg-inverse hover:w-39.25"
        notAddedClassName="bg-bg-muted enabled:hover:bg-bg-muted hover:w-39.25"
        productId={productId}
      />
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
