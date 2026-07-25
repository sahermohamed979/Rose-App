export interface Product {
  id: string | number;
  title: string;
  cover?: string;
  image?: string;
  price: number;
  discountValue?: number;
  rating?: number;
  createdAt?: number;
  isWishlisted?: boolean;
  wishlistItemId?: string | null;
  isNew?: boolean;
  isHot?: boolean;
  stock?: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  userId: string;
  createdAt: string;
}

export interface WishlistResponse {
  status: boolean;
  code: number;
  payload: {
    wishlistItems: WishlistItem[];
  };
}

export interface ProductsResponse {
  payload: {
    data: Product[];
    metadata: {
      totalPages: number;
    };
  };
}