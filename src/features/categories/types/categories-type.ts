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
