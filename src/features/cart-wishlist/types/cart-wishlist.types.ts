export type CartItem = {
  productId: string;
  quantity: number;
};

export type WishlistItem = {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product: {
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
  };
};

export type CartApiResponse = {
  status: boolean;
  code: number;
  payload: {
    cartItems: CartItem[];
  };
};

export type WishlistResponse = {
  wishlistItems: WishlistItem[];
};

export type WishlistApiResponse = {
  status: boolean;
  code: number;
  payload: WishlistResponse;
};
