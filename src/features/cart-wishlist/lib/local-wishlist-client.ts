const LOCAL_WISHLIST_KEY = 'client-wishlist';

export function getLocalWishlist(): string[] {
  const storedWishlist = localStorage.getItem(LOCAL_WISHLIST_KEY);
  return storedWishlist ? JSON.parse(storedWishlist) : [];
}

export function isInLocalWishlist(productId: string): boolean {
  return getLocalWishlist().includes(productId);
}

export function toggleLocalWishlistItem(productId: string): boolean {
  const wishlist = getLocalWishlist();
  const isAdded = wishlist.includes(productId);

  const nextWishlist = isAdded
    ? wishlist.filter((id) => id !== productId)
    : [...wishlist, productId];

  localStorage.setItem(
    LOCAL_WISHLIST_KEY,
    JSON.stringify(nextWishlist)
  );

  return !isAdded;
}

export function clearLocalWishlist(): void {
  localStorage.removeItem(LOCAL_WISHLIST_KEY);
}
