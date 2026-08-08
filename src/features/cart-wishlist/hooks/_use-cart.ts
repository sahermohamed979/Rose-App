// import { useQuery } from '@tanstack/react-query';
// import { CART_WISHLIST_KEYS } from '../constants/query-keys';
// import { CartApiResponse } from '../types/cart-wishlist.types';

// export function useCart(enabled: boolean) {
//   return useQuery({
//     queryKey: CART_WISHLIST_KEYS.cart,
//     queryFn: fetchCart,
//     enabled,
//   });
// }

// const fetchCart = async (): Promise<CartApiResponse> => {
//   const response = await fetch('/api/cart');
//   if (!response.ok) {
//     throw new Error('Failed to fetch cart');
//   }
//   return response.json();
// };
