'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AddToCartResponse } from '../types/products-types';

export function useCart(
  productId: string | number,
  initialCartItemId: string | null | undefined,
  initialInCart: boolean
) {
  const queryClient = useQueryClient();

  const [isInCart, setIsInCart] = useState<boolean>(initialInCart);
  const [cartItemId, setCartItemId] = useState<string | null | undefined>(initialCartItemId);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Tracks the last props seen, so we can sync state when a prop changes
  const [prevInitialInCart, setPrevInitialInCart] = useState(initialInCart);
  const [prevCartItemId, setPrevCartItemId] = useState(initialCartItemId);

  if (initialInCart !== prevInitialInCart || initialCartItemId !== prevCartItemId) {
    setPrevInitialInCart(initialInCart);
    setPrevCartItemId(initialCartItemId);
    setIsInCart(initialInCart);
    setCartItemId(initialCartItemId);
  }

  async function addToCart(): Promise<string | undefined> {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1 }),
    });

    if (!response.ok && response.status !== 409) {
      throw new Error('Failed to add to cart');
    }

    const data: AddToCartResponse = await response.json();
    return data.payload?.cartItem?.id;
  }

  async function removeFromCart(itemId: string): Promise<void> {
    const response = await fetch(`/api/cart/${itemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove from cart');
    }
  }

  async function toggleCart() {
    if (isLoading) {return};

    const previousState = isInCart;
    const previousCartItemId = cartItemId;
    const newState = !previousState;

    setIsInCart(newState);
    setIsLoading(true);

    try {
      if (newState) {
        const newCartItemId = await addToCart();
        setCartItemId(newCartItemId);
      } else {
        if (!cartItemId) {
          setIsInCart(true);
          return;
        }
        await removeFromCart(cartItemId);
        setCartItemId(null);
      }

      queryClient.invalidateQueries({ queryKey: ['user-cart'] });
    } catch (error) {
      console.error('Cart toggle failed:', error);
      setIsInCart(previousState);
      setCartItemId(previousCartItemId);
    } finally {
      setIsLoading(false);
    }
  }

  return { isInCart, isLoading, toggleCart };
}