export interface GetOccasionsParams {
  page?: number;
  limit?: number;
  search?: string;
}
export interface CreateOccasionPayload {
  title: string;
  description?: string;
  image: string;
}
export interface UpdateOccasionPayload {
  title: string;
  description?: string;
}
export const OCCASIONS_QUERY_KEY = ['occasions'] as const;
