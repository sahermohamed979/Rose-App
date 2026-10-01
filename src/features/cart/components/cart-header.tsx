import { useTranslations } from 'next-intl';
import ClearButton from './clear-button';
import { ICartResponse } from '../types/cart-types';

export default function CartHeader({
  cartData,
}: {
  cartData: ICartResponse | null;
}) {
  const t = useTranslations('cart');
  return (
    <div className="flex flex-row items-center justify-between gap-3">
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-text-plain">
        {t('title')}
        <span className="text-xs sm:text-base font-medium text-text-muted ms-2 sm:ms-2.5">
          {t('product', { count: cartData?.cartItems.length || 0 })}
        </span>
      </h2>
      <ClearButton cart={cartData} />
    </div>
  );
}
