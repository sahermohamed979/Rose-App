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
  return cart.length;
}

export function clearLocalCart(): void {
  localStorage.removeItem(LOCAL_CART_KEY);
  window.dispatchEvent(new Event('local-cart-updated'));
}

export function clearLocalIndex(productId: string): void {
  const cart = getLocalCart();

  const updatedCart = cart.filter(
    (item) => item.productId !== productId
  );

  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updatedCart));

  window.dispatchEvent(new Event('local-cart-updated'));
}

export function updateLocalQuantity({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const cart = getLocalCart();

  const updatedCart = cart.map((item) =>
    item.productId === productId ? { ...item, quantity } : item
  );

  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updatedCart));

  window.dispatchEvent(new Event('local-cart-updated'));
}
