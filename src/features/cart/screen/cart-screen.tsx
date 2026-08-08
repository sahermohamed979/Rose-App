import CartCard from '../components/cart-card';
import { ICartResponse } from '../types/cart-types';
import EmptyCart from '../components/empty-cart';
import ClearButton from '../components/clear-button';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MoveLeft } from 'lucide-react';

export default function CartScreen({
  cart,
}: {
  cart: ICartResponse;
}) {
  const t = useTranslations('cart');

  return (
    <>
      {/* cart header */}
      <div className="flex flex-row items-center justify-between ">
        <h2 className="text-5xl font-bold text-text-plain">
          {t('title')}
          <span className="text-base font-medium text-text-muted  ms-2.5">
            {t('product', { count: cart?.cartItems.length || 0 })}
          </span>
        </h2>
        <ClearButton cart={cart} />
      </div>
      {/* order card */}
      <div className="border border-border-muted   px-4 rounded-2xl mt-4">
        {cart?.cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          cart?.cartItems.map((cartItem) => (
            <CartCard key={cartItem.id} cartItem={cartItem} />
          ))
        )}
      </div>
      <Link
        href={'/home'}
        className="w-55.75 h-12 bg-bg-primary-saturated py-2 mt-4 flex items-center justify-center rounded-xl text-text-inverse"
      >
        <MoveLeft size={20} className="me-3  rtl:rotate-y-180 " />
        {t('continueShopping')}
      </Link>
    </>
  );
}
