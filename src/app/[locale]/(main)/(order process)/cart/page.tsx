import CartScreen from '@/features/cart/screen/cart-screen';
import { getCartAction } from '@/features/cart/apis/cart-actions';
import { ICartResponse } from '@/features/cart/types/cart-types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import LocalCartScreen from '@/features/cart/screen/local-cart-screen';

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const cartData = await getCartAction();
    if (!cartData.status) {
      throw new Error(cartData.message);
    }
    return (
      <CartScreen cartData={cartData.payload as ICartResponse} />
    );
  }

  return <LocalCartScreen />;
}
