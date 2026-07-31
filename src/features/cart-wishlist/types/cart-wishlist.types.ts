export type CartItem = {
  productId: string;
  quantity: number;
};

export type WishlistItem = {
  productId: string;
};

export type CartApiResponse = {
  status: boolean;
  code: number;
  payload: {
    cartItems: CartItem[];
  };
};

export type WishlistResponse = {
  items: WishlistItem[];
};
