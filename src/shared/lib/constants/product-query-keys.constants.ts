export const PRODUCT_QUERY_KEYS = {
  suggested: ['suggested-products'] as const,
  searchAll: ['search-products'] as const,
  search: (query: string) => ['search-products', query] as const,
  details: (productId: string) =>
    ['product-info', productId] as const,
} as const;
