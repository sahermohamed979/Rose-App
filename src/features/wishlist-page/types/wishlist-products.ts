export interface WishlistPayload {
  wishlistItems: WishlistItem[];
}

interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product: Product;
}

interface Product {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  rating: number;
  ratings: number;
  stock: number;
  price: string;
  discountType: string | null;
  discountValue: string | null;
  cover: string;
  gallery: string;
  categoryId: string;
  subCategoryId: string;
  immutable: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  category: Category;
  subCategory: SubCategory;
}

interface Category {
  id: string;
  title: string;
}

interface SubCategory {
  id: string;
  title: string;
}
