import { ProductCategory } from '@/shared/lib/types/product-types';

export interface CategoryWithCount extends ProductCategory {
  _count: {
    products: number;
  };
}

export interface GetCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
}
export interface CreateCategoryPayload {
  title: string;
  description?: string;
  image: string;
}
export interface UpdateCategoryPayload {
  title: string;
  description?: string;
}
export const CATEGORIES_QUERY_KEY = ['categories'] as const;
