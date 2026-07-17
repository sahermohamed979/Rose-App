import { searchSchema } from '../schemas/search-schema';

// Search products by query
export const searchProducts = async (query: string) => {
  const t = (key: string) => key;
  const schema = searchSchema(t);
  const result = schema.safeParse({ query });

  // Validate input schema
  if (!result.success) {
    return { success: false, data: [] };
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await response.json();

    if (!response.ok || !res.status) {
      return { success: false, data: [] };
    }

    return {
      success: true,
      data: res.payload.data || [],
    };
  } catch {
    return { success: false, data: [] };
  }
};

// Fetch suggested products
export const fetchSuggestedProducts = async (
  signal?: AbortSignal
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal,
    });

    const res = await response.json();

    // Checked if response is ok and status is true
    if (!response.ok || !res.status) {
      return { success: false, data: [] };
    }

    return {
      success: true,
      data: res.payload.data || [],
    };
  } catch (error) {
    // Return empty state on error
    if ((error as Error).name !== 'AbortError') {
      return { success: false, data: [] };
    }
    return { success: false, data: [] };
  }
};
