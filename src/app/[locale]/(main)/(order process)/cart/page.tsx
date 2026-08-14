import CartScreen from '@/features/cart/screen/cart-screen';
import { getCart } from '@/features/cart/apis/cart-service';
import { ICartResponse } from '@/features/cart/types/cart-types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    const cartData = await getCart();
    if (!cartData.status) {
      throw new Error(cartData.message);
    }
    return (
      <CartScreen cartData={cartData.payload as ICartResponse} />
    );
  }
  return <CartScreen cartData={{ cartItems: [] }} />;
}
