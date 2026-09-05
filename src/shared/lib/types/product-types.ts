// ─────────────────────────────────────────────────────────────
// Category
// ─────────────────────────────────────────────────────────────

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  subCategories?: ProductSubCategory[];
}

export interface ProductSubCategory {
  id: string;
  title: string;
  description?: string;
  image?: string;
  immutable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ─────────────────────────────────────────────────────────────
// Review
// ─────────────────────────────────────────────────────────────

export interface ReviewUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface ProductReview {
  id: string;
  userId: string;
  productId: string;
  headline: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: ReviewUser;
}

export interface ProductCount {
  reviews: number;
  cartItems: number;
  wishlistItems: number;
  orderItems?: number;
}

// occasion
export interface OccasionType {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductOccasion {
  id: string;
  productId: string;
  occasionId: string;
  createdAt: string;
  occasion: OccasionType;
}

// ─────────────────────────────────────────────────────────────
// Product
// ─────────────────────────────────────────────────────────────

export interface IProduct {
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
  subCategoryId: string | null;

  immutable: boolean;
  deletedAt: string | null;

  createdAt: string;
  updatedAt: string;

  category: ProductCategory;
  subCategory?: ProductSubCategory | null;

  occasion?: OccasionType;
  occasions?: ProductOccasion[];

  reviews?: ProductReview[];

  _count?: ProductCount;
}

// ─────────────────────────────────────────────────────────────
// API Payloads
// ─────────────────────────────────────────────────────────────

export interface ProductPayload {
  products: IProduct[];
}

export interface ProductDetailsResponse {
  product: IProduct;
}

// ─────────────────────────────────────────────────────────────
// Reviews
// ─────────────────────────────────────────────────────────────

export interface ReviewsMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ReviewsPayload {
  data: ProductReview[];
  metadata: ReviewsMetadata;
}

// ─────────────────────────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────────────────────────

export interface PaginationMeta {
  totalPages: number;
  totalItems?: number;
  currentPage?: number;
}

// ─────────────────────────────────────────────────────────────
// Product Query
// ─────────────────────────────────────────────────────────────

export interface ProductsQuery {
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

// ─────────────────────────────────────────────────────────────
// Search Params
// ─────────────────────────────────────────────────────────────

export type ProductsSearchParams = Awaited<
  PageProps<'/[locale]/products'>['searchParams']
>;

export type FilterKey =
  | 'categoryId'
  | 'occasionId'
  | 'minPrice'
  | 'maxPrice'
  | 'minRating';

export const FILTER_KEYS: FilterKey[] = [
  'categoryId',
  'occasionId',
  'minPrice',
  'maxPrice',
  'minRating',
];
