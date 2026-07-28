export interface ProductDetailsResponse {
  product: ProductDetails;
}

export interface ProductDetails {
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
  gallery: string;
  categoryId: string;
  subCategoryId: string | null;
  immutable: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;

  category: ICategory;
  subCategory: SubCategory | null;
  occasions: IOccasion[];
  reviews: Review[];
  _count: ProductCount;
}

export interface ICategory {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  title: string;
  description?: string;
  image?: string;
  immutable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IOccasion {
  id: string;
  title: string;
  description?: string;
  image?: string;
  immutable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
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

export interface ReviewUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface ProductCount {
  reviews: number;
  cartItems: number;
  wishlistItems: number;
}
