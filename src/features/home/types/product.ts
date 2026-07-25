import { OccasionType } from './occasions';

export interface ProductType {
  id: string;
  title: string;
  description: string;
  rating: number;
  ratings: number;
  stock: number;
  price: string;
  discountType: string;
  discountValue: string;
  cover: string;
  gallery: string[];
  categoryId: string;
  subCategoryId: string;
  immutable: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    title: string;
  };
  subCategory: {
    id: string;
    title: string;
  };
  occasion: OccasionType;
  _count: {
    reviews: number;
    cartItems: number;
    wishlistItems: number;
    orderItems: number;
  };
}

export interface ProductsType {
  page: number;
  limit?: number;
  minRating?: number;
  categoryId?: string;
  subCategoryId?: string;
  occasionId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
