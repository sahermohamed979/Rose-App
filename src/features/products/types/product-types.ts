// ─── Category ─────────────────────────────────────────────────────────────────

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Product ──────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  title: string;
  description: string;
  /** Average rating (0–5), 0 when no reviews */
  rating: number;
  /** Total number of ratings */
  ratings: number;
  stock: number;
  price: string;
  discountType: 'PERCENT' | 'FIXED' | null;
  discountValue: string | null;
  cover: string;
  gallery: string[];
  categoryId: string;
  subCategoryId: string | null;
  immutable: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  category: ProductCategory;
}

// ─── Product API Response ─────────────────────────────────────────────────────

export interface ProductPayload {
  product: Product;
}

// ─── Review ───────────────────────────────────────────────────────────────────

export interface ReviewUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface Review {
  id: string;
  rating: number;
  headline: string;
  content: string;
  productId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: ReviewUser;
}

// ─── Reviews API Response ─────────────────────────────────────────────────────

export interface ReviewsMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ReviewsPayload {
  data: Review[];
  metadata: ReviewsMetadata;
}

export interface PaginationMeta {
  totalPages: number;
  totalItems?: number;
  currentPage?: number;
}

export interface ProductsResponse {
  status: boolean;
  code: number;
  payload: {
    data: Product[];
    metadata: PaginationMeta;
  };
}
