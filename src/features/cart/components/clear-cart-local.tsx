import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';
import { BrushCleaning } from 'lucide-react';
import { ICart } from '../types/cart-types';
import { clearLocalCart } from '@/features/cart-wishlist/lib/local-cart-client';

export default function ClearCartLocal({ cart }: { cart: ICart[] }) {
  const t = useTranslations('cart');
  return (
    <Button
      disabled={cart?.length === 0}
      onClick={() => {
        clearLocalCart();
      }}
      className="flex items-center justify-center gap-2 text-base font-semibold text-text-primary bg-bg-carosel h-10 w-34 rounded-xl"
    >
      <span>
        <BrushCleaning size={20} />
      </span>
      {t('clearCart')}
    </Button>
  );
}
