interface ClearWishlistSuccess {
  status: true;
  code: number;
  message: string;
}

interface ClearWishlistError {
  status: false;
  code: number;
  message: string;
}

export type ClearWishlistResponse =
  | ClearWishlistSuccess
  | ClearWishlistError;
