'use client';
import { BrushCleaning } from 'lucide-react';
import { ICartResponse } from '../types/cart-types';
import { Button } from '@/shared/components/ui/button';
import useClearCart from '../hooks/clear-cart-hook';
import { useTranslations } from 'next-intl';

export default function ClearButton({
  cart,
}: {
  cart: ICartResponse;
}) {
  const { mutate: clearCart, isPending } = useClearCart();
  const t = useTranslations('cart');
  return (
    <Button
      disabled={cart?.cartItems.length === 0 || isPending}
      onClick={() => clearCart()}
      className="flex items-center justify-center gap-2 text-base font-semibold text-text-primary bg-bg-carosel h-10 w-34 rounded-xl"
    >
      <span>
        <BrushCleaning size={20} />
      </span>
      {t('clearCart')}
    </Button>
  );
}
