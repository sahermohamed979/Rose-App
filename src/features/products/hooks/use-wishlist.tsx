'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AddToWishlistResponse } from '../types/products-types';

export function useWishlist(
  productId: string | number,
  initialWishlistItemId: string | null | undefined,
  initialWishlisted: boolean
) {
  const queryClient = useQueryClient();

  const [isWishlist, setIsWishlist] =
    useState<boolean>(initialWishlisted);
  const [wishlistItemId, setWishlistItemId] = useState<
    string | null | undefined
  >(initialWishlistItemId);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Tracks the last props seen, so we can sync state when a prop changes
  // without using an effect (see: react.dev - adjusting state when a prop changes)
  const [prevInitialWishlisted, setPrevInitialWishlisted] =
    useState(initialWishlisted);
  const [prevWishlistItemId, setPrevWishlistItemId] = useState(
    initialWishlistItemId
  );

  if (
    initialWishlisted !== prevInitialWishlisted ||
    initialWishlistItemId !== prevWishlistItemId
  ) {
    setPrevInitialWishlisted(initialWishlisted);
    setPrevWishlistItemId(initialWishlistItemId);
    setIsWishlist(initialWishlisted);
    setWishlistItemId(initialWishlistItemId);
  }

  async function addToWishlist(): Promise<string | undefined> {
    const response = await fetch('/api/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok && response.status !== 409) {
      throw new Error('Failed to add to wishlist');
    }

    const data: AddToWishlistResponse = await response.json();
    return data.payload?.wishlistItem?.id;
  }

  async function removeFromWishlist(itemId: string): Promise<void> {
    const response = await fetch(`/api/wishlist/${itemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove from wishlist');
    }
  }

  async function toggleWishlist() {
    if (isLoading) {
      return;
    }

    const previousState = isWishlist;
    const previousWishlistItemId = wishlistItemId;
    const newState = !previousState;

    setIsWishlist(newState);
    setIsLoading(true);

    try {
      if (newState) {
        const newWishlistItemId = await addToWishlist();
        setWishlistItemId(newWishlistItemId);
      } else {
        if (!wishlistItemId) {
          setIsWishlist(true);
          return;
        }
        await removeFromWishlist(wishlistItemId);
        setWishlistItemId(null);
      }

      queryClient.invalidateQueries({ queryKey: ['user-wishlist'] });
    } catch (error) {
      console.error('Wishlist toggle failed:', error);
      setIsWishlist(previousState);
      setWishlistItemId(previousWishlistItemId);
    } finally {
      setIsLoading(false);
    }
  }

  return { isWishlist, isLoading, toggleWishlist };
}
