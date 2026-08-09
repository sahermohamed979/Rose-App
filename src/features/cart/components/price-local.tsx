import { useTranslations } from 'next-intl';
import { ICart } from '../types/cart-types';

export default function PriceLocal({
  cartItem,
}: {
  cartItem: ICart;
}) {
  const t = useTranslations();

  const totalPrice =
    Number(cartItem?.product?.price || 0) * (cartItem.quantity || 0);

  return (
    <span className=" ms-1 text-primary-600 font-bold text-lg me-2">
      {totalPrice} {t('cart.currency')}
    </span>
  );
}
