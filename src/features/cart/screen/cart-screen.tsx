'use client';
import CartCard from '../components/cart-card';
import { ICartResponse } from '../types/cart-types';
import EmptyCart from '../components/empty-cart';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MoveLeft } from 'lucide-react';
import CartHeader from '../components/cart-header';
import { useSession } from 'next-auth/react';
import { useLocalCart } from '../hooks/cart-local-hook';
import CartSkeleton from '../skeletons/cart-skeleton';
import { ErrorCartView } from '../components/error-cart-view';
export default function CartScreen({
  cartResponse,
}: {
  cartResponse: ICartResponse | null;
}) {
  const t = useTranslations('cart');
  const { status } = useSession();

  const {
    data: localCartData,
    isLoading,
    error,
    refetch,
  } = useLocalCart();

  const cartData =
    status === 'authenticated' ? cartResponse : localCartData;
  if (isLoading) {
    return <CartSkeleton />;
  }
  if (error) {
    return <ErrorCartView error={error} reset={() => refetch()} />;
  }
  return (
    <>
      {/* cart header */}
      <CartHeader cartData={cartData as ICartResponse} />
      {/* order card */}
      <div className="border border-border-muted   px-4 rounded-2xl mt-4">
        {cartData?.cartItems?.length === 0 ? (
          <EmptyCart />
        ) : (
          cartData?.cartItems?.map((cartItem) => (
            <CartCard key={cartItem.productId} cartItem={cartItem} />
          ))
        )}
      </div>
      <Link
        href={'/products'}
        className="w-55.75 h-12 bg-bg-primary-saturated py-2 mt-4 flex items-center justify-center rounded-xl text-text-inverse"
      >
        <MoveLeft size={20} className="me-3  rtl:rotate-y-180 " />
        {t('continueShopping')}
      </Link>
    </>
  );
}
