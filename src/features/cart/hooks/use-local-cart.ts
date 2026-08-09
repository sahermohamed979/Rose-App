'use client';
import { useEffect, useState } from 'react';
import { ICart } from '../types/cart-types';
import { getLocalCart } from '@/features/cart-wishlist/lib/local-cart-client';

export default function useLocalCart(): ICart[] {
  const [cart, setCart] = useState<ICart[]>([]);

  useEffect(() => {
    const updateCart = () => setCart(getLocalCart());

    updateCart();

    window.addEventListener('local-cart-updated', updateCart);

    return () => {
      window.removeEventListener('local-cart-updated', updateCart);
    };
  }, []);

  return cart;
}
