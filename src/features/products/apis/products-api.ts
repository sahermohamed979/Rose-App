export async function fetchProducts(searchParams: string) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const res = await fetch(`${baseUrl}/api/products?${searchParams}`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}