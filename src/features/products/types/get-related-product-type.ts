export interface RelatedProductsSuccess {
  status: true;
  message: string;
  payload: {
    category: Category;
  };
}

interface RelatedProductsError {
  status: false;
  message: string;
  errors?: { field: string; message: string }[];
}

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string | null;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  subCategories: SubCategory[];
  products: Product[];
  _count: {
    products: number;
    subCategories: number;
  };
}

export interface SubCategory {
  id: string;
  title: string;
  description: string;
  image: string | null;
  categoryId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  rating: number;
  ratings: number;
  stock: number;
  price: string;
  discountType: 'PERCENT' | 'FIXED' | null;
  discountValue: string | null;
  cover: string;
  gallery: string[];
  categoryId: string;
  subCategoryId: string;
  immutable: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type RelatedProductsApiResponse =
  | RelatedProductsSuccess
  | RelatedProductsError;
