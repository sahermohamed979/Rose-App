export interface Product {
  id: string | number;
  title: string;
  cover: string;
  gallery?: string;
  price: number;
  discountValue?: number;
  rating?: number;
  ratings?: number;
  createdAt?: number;
  isWishlisted?: boolean;
  wishlistItemId?: string | null;
  isNew?: boolean;
  isHot?: boolean;
  stock?: number;
  isInCart?: boolean;
  cartItemId?: string | null;
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
export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartResponse {
  status: boolean;
  code: number;
  payload: {
    cartItems: CartItem[];
  };
}

export interface AddToCartResponse {
  status: boolean;
  code: number;
  payload: {
    cartItem: CartItem;
  };
}
export interface AddToWishlistResponse {
  status: boolean;
  code: number;
  payload: {
    wishlistItem: {
      id: string;
      productId: string;
      userId: string;
    };
  };
}
export interface PaginationMeta {
  totalPages: number;
  totalItems?: number;
  currentPage?: number;
}

export interface ProductsResponse {
  payload: {
    data: Product[];
    metadata: PaginationMeta;
  };
}
