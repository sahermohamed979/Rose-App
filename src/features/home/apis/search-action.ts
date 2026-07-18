import {
  ProductsResponseSchema,
  searchSchema,
} from '../schemas/search-schema';
import { FetchProductsResult } from '../types/search-types';

// Search products by query
export const searchProducts = async (query: string) => {
  // Validate query schema
  const t = (key: string) => key;
  const schema = searchSchema(t);
  const result = schema.safeParse({ query });

  if (!result.success) {
    return { success: false, data: [] };
  }

  try {
    // Call the local API route
    const response = await fetch(
      `/api/products?query=${encodeURIComponent(query)}`
    );
    const res = await response.json();

    if (!response.ok || !res.status) {
      return { success: false, data: [] };
    }

    // Validate response data
    const validation = ProductsResponseSchema.safeParse(
      res.payload?.data
    );
    if (!validation.success) {
      return { success: false, data: [] };
    }

    return { success: true, data: validation.data };
  } catch {
    return { success: false, data: [] };
  }
};

// Fetch suggested products
export const fetchSuggestedProducts =
  async (): Promise<FetchProductsResult> => {
    try {
      // Call the local API route
      const response = await fetch('/api/products');
      const res = await response.json();

      // Validate response data
      const validation = ProductsResponseSchema.safeParse(
        res.payload?.data
      );
      if (!validation.success) {
        return { success: false, data: [] };
      }

      return { success: true, data: validation.data };
    } catch {
      return { success: false, data: [] };
    }
  };
