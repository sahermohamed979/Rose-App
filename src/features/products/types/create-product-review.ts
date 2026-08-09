interface IProductReviewSuccess {
  status: boolean;
  code: number;
  payload: payload;
}

interface IProductReviewError {
  status: boolean;
  code: number;
  message: string;
}

interface payload {
  review: Review;
  user: User;
  product: Product;
}

interface Review {
  id: number;
  userId: number;
  productId: number;
  headline: string;
  content: string;
  rating: number;
  createdAt: number;
  updatedAt: number;
}

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

interface Product {
  id: number;
  title: string;
}

export type IProductReviewresponse =
  | IProductReviewSuccess
  | IProductReviewError;
