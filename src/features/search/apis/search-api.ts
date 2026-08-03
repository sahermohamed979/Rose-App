import {
  ProductsResponseSchema,
  searchSchema,
} from '../schema/search-schema';
import { SearchProduct } from '../schema/search-schema';

interface SearchProductsResult {
  success: boolean;
  data: SearchProduct[];
  hasMore: boolean;
}

const EMPTY_RESULT: SearchProductsResult = {
  success: false,
  data: [],
  hasMore: false,
};

// Fetches a products page and validates the response shape
async function fetchProductsPage(
  url: string,
  page: number
): Promise<SearchProductsResult> {
  try {
    const response = await fetch(url);
    const res = await response.json();

    if (!response.ok || !res.status) {
      return EMPTY_RESULT;
    }

    const validation = ProductsResponseSchema.safeParse(
      res.payload?.data
    );
    if (!validation.success) {
      return EMPTY_RESULT;
    }

    const totalPages = res.payload?.metadata?.totalPages || 1;

    return {
      success: true,
      data: validation.data,
      hasMore: page < totalPages,
    };
  } catch {
    return EMPTY_RESULT;
  }
}

export async function searchProducts(
  query: string,
  page: number = 1
): Promise<SearchProductsResult> {
  const schema = searchSchema();
  const result = schema.safeParse({ query });

  if (!result.success) {
    return EMPTY_RESULT;
  }

  const url = `/api/products?search=${encodeURIComponent(query)}&limit=10&page=${page}`;
  return fetchProductsPage(url, page);
}

export async function fetchSuggestedProducts(): Promise<SearchProductsResult> {
  const url =
    '/api/products?limit=5&sortBy=bestSelling&sortOrder=desc';
  return fetchProductsPage(url, 1);
}
