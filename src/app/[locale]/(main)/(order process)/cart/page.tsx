import CartScreen from '@/features/cart/screen/cart-screen';
import { getCart } from '@/features/cart/apis/cart-service';
import { ICartResponse } from '@/features/cart/types/cart-types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    const cartResponse = await getCart();

    if (!cartResponse.status) {
      throw new Error(cartResponse.message);
    }
    return (
      <CartScreen
        cartResponse={cartResponse.payload as ICartResponse}
      />
    );
  }
  return <CartScreen cartResponse={{ cartItems: [] }} />;
}
