export async function fetchWishlist() {
  const baseUrl =
    typeof window !== 'undefined' ? window.location.origin : '';
  const res = await fetch(`${baseUrl}/api/wishlist`);
  if (!res.ok) {
    return { payload: [] };
  }
  return res.json();
}
