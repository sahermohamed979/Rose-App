import { ICart } from '@/features/cart/types/cart-types';

const LOCAL_CART_KEY = 'client-cart';

export default function saveCartItemToLocalStorage({
  productId,
  quantity = 1,
  product,
}: ICart) {
  const storedCart = localStorage.getItem(LOCAL_CART_KEY);

  const cart: ICart[] = storedCart ? JSON.parse(storedCart) : [];

  const existingItem = cart.find(
    (item) => item.productId === productId
  );

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 0) + quantity;
    existingItem.product = product ?? existingItem.product;
  } else {
    cart.push({ productId, quantity, product });
  }

  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('local-cart-updated'));
}

export function getLocalCart(): ICart[] {
  const storedCart = localStorage.getItem(LOCAL_CART_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
}

export function getLocalCartCount(): number {
  const cart = getLocalCart();
  return cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
}

export function clearLocalCart(): void {
  localStorage.removeItem(LOCAL_CART_KEY);
  window.dispatchEvent(new Event('local-cart-updated'));
}
