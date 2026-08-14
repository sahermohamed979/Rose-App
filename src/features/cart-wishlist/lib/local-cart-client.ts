export type LocalCartItem = {
  productId: string;
  quantity: number;
};

const LOCAL_CART_KEY = 'client-cart';

export default function saveCartItemToLocalStorage({
  productId,
  quantity = 1,
}: {
  productId: string;
  quantity?: number;
}) {
  const storedCart = localStorage.getItem(LOCAL_CART_KEY);

  const cart: LocalCartItem[] = storedCart
    ? JSON.parse(storedCart)
    : [];

  const existingItem = cart.find(
    (item) => item.productId === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('local-cart-updated'));
}

export function getLocalCart(): LocalCartItem[] {
  const storedCart = localStorage.getItem(LOCAL_CART_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
}

export function getLocalCartCount(): number {
  const cart = getLocalCart();
  return cart.length;
}

export function clearLocalCart(): void {
  localStorage.removeItem(LOCAL_CART_KEY);
}

export function clearLocalIndex(productId: string): void {
  const cart = getLocalCart();

  const updatedCart = cart.filter(
    (item) => item.productId !== productId
  );

  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updatedCart));
}

export function updateLocalQuantity({
  productId,
  quantity,
}: LocalCartItem) {
  const cart = getLocalCart();

  const updatedCart = cart.map((item) =>
    item.productId === productId ? { ...item, quantity } : item
  );

  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updatedCart));
}
