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
    <div className="flex flex-row items-center justify-between ">
      <h2 className="text-5xl font-bold text-text-plain">
        {t('title')}
        <span className="text-base font-medium text-text-muted  ms-2.5">
          {t('product', { count: cartData?.cartItems.length || 0 })}
        </span>
      </h2>
      <ClearButton cart={cartData} />
    </div>
  );
}
