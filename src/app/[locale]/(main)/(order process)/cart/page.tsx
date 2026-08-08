import CartScreen from '@/features/cart/screen/cart-screen';
import { getCartAction } from '@/features/cart/apis/cart-actions';
import { ICartResponse } from '@/features/cart/types/cart-types';

export default async function page() {
  const cart = await getCartAction();
  if (!cart.status) {
    throw new Error(cart.message);
  }
  return <CartScreen cart={cart.payload as ICartResponse} />;
}
