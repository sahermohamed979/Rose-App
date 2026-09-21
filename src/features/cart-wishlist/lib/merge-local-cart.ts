import addToCartAction from '../apis/add-to-cart-action';
import { clearLocalCart, getLocalCart } from './local-cart-client';

export async function mergeLocalCartToServer(): Promise<void> {
  const localCart = getLocalCart();

  if (!localCart.length) {
    return;
  }

  await Promise.all(
    localCart.map((item) =>
      addToCartAction({
        productId: item.productId,
        quantity: item.quantity || 1,
      })
    )
  );

  clearLocalCart();
}
