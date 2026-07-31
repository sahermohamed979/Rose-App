import {
  FILTER_KEYS,
  ProductsSearchParams,
} from '../../../shared/lib/types/product-types';

export type FilterChanges = Partial<
  Record<keyof ProductsSearchParams, string | null>
>;

export function buildFilterUrl(
  current: ProductsSearchParams,
  changes: FilterChanges,
  basePath = '/products'
): string {
  const params = new URLSearchParams();
  const merged: Record<string, string | string[] | null | undefined> =
    {
      ...current,
      ...changes,
    };

  Object.entries(merged).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      return;
    }
    params.set(key, Array.isArray(value) ? value[0] : value);
  });

  if (Object.keys(changes).length > 0) {
    params.delete('page');
  }

  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function hasAnyFilter(
  searchParams: ProductsSearchParams
): boolean {
  return FILTER_KEYS.some((key) => !!searchParams[key]);
}
