import CartCard from '../components/cart-card';
import { ICartResponse } from '../types/cart-types';
import EmptyCart from '../components/empty-cart';
import ClearButton from '../components/clear-button';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MoveLeft } from 'lucide-react';
import CartHeader from '../components/cart-header';

export default function CartScreen({
  cartData,
}: {
  cartData: ICartResponse;
}) {
  const t = useTranslations('cart');

  return (
    <>
      {/* cart header */}
      <CartHeader cartData={cartData} />
      {/* order card */}
      <div className="border border-border-muted   px-4 rounded-2xl mt-4">
        {cartData?.cartItems?.length === 0 ? (
          <EmptyCart />
        ) : (
          cartData?.cartItems?.map((cartItem) => (
            <CartCard key={cartItem.id} cartItem={cartItem} />
          ))
        )}
      </div>
      <Link
        href={'/'}
        className="w-55.75 h-12 bg-bg-primary-saturated py-2 mt-4 flex items-center justify-center rounded-xl text-text-inverse"
      >
        <MoveLeft size={20} className="me-3  rtl:rotate-y-180 " />
        {t('continueShopping')}
      </Link>
    </>
  );
}
