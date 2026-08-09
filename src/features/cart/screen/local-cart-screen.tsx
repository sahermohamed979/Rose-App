'use client';
import CartCard from '../components/cart-card';
import EmptyCart from '../components/empty-cart';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MoveLeft } from 'lucide-react';
import ClearCartLocal from '../components/clear-cart-local';
import useLocalCart from '../hooks/use-local-cart';

export default function LocalCartScreen() {
  //  translate
  const t = useTranslations('cart');

  // get local cart
  const LocalCartData = useLocalCart();

  return (
    <>
      {/* cart header */}
      <div className="flex flex-row items-center justify-between ">
        <h2 className="text-5xl font-bold text-text-plain">
          {t('title')}
          <span className="text-base font-medium text-text-muted  ms-2.5">
            {t('product', { count: LocalCartData?.length || 0 })}
          </span>
        </h2>
        <ClearCartLocal cart={LocalCartData} />
      </div>
      {/* order card */}
      <div className="border border-border-muted   px-4 rounded-2xl mt-4">
        {LocalCartData?.length === 0 ? (
          <EmptyCart />
        ) : (
          LocalCartData?.map((cartItem) => (
            <CartCard key={cartItem.productId} cartItem={cartItem} />
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
