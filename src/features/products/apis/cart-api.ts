import { CartResponse } from '../types/products-types';

const EMPTY_CART_RESPONSE: CartResponse = {
  status: false,
  code: 200,
  payload: { cartItems: [] },
};

export async function fetchCart(): Promise<CartResponse> {
  const baseUrl =
    typeof window !== 'undefined' ? window.location.origin : '';
  const res = await fetch(`${baseUrl}/api/cart`);

  if (!res.ok) {
    return EMPTY_CART_RESPONSE;
  }

  return res.json();
}
