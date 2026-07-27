import { SearchProduct } from "../schema/search-schema";

// Product data model
export interface Product {
  id: string;
  title: string;
  cover: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
}

// Wrapper for fetching product results
export interface FetchProductsResult {
  success: boolean;
  data: SearchProduct[];
}

// API success response structure
interface SearchResponseSuccess {
  status: true;
  message: string;
  data: Product[];
}

// API error response structure
interface SearchResponseError {
  status: false;
  message: string;
  errors?: { field: string; message: string }[];
}

// Unified API response type
export type SearchApiResponse =
  | SearchResponseSuccess
  | SearchResponseError;
