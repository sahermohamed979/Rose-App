import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export function useWishlist(
  productId: string | number,
  initialWishlistItemId: string | null | undefined,
  initialWishlisted: boolean
) {
  const queryClient = useQueryClient();
  const [isWishlist, setIsWishlist] = useState<boolean>(initialWishlisted);
  const [wishlistItemId, setWishlistItemId] = useState<string | null | undefined>(
    initialWishlistItemId
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleWishlist = async () => {
    if (isLoading) {return};

    const previousState = isWishlist;
    const previousWishlistItemId = wishlistItemId;
    const newState = !previousState;

    setIsWishlist(newState);
    setIsLoading(true);

    try {
      if (newState) {
        const response = await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });

        if (!response.ok && response.status !== 409) {
          throw new Error('Failed to add to wishlist');
        }

        const data = await response.json();
        setWishlistItemId(data.payload?.wishlistItem?.id);
      } else {
        if (!wishlistItemId) {
          console.error('No wishlistItemId available to delete');
          setIsWishlist(true);
          return;
        }

        const response = await fetch(`/api/wishlist/${wishlistItemId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to remove from wishlist');
        }

        setWishlistItemId(null);
      }

      queryClient.invalidateQueries({ queryKey: ['user-wishlist'] });
    } catch (error) {
      setIsWishlist(previousState);
      setWishlistItemId(previousWishlistItemId);
      console.error('Wishlist error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isWishlist, isLoading, toggleWishlist };
}