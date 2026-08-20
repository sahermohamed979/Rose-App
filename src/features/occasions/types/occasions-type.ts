// import { OccasionType } from "@/shared/lib/types/product-types";

// export interface OccasionWithCount extends OccasionType {
//  id:string;
//  title:string;
//  description:string;
//  image:string;
//  immutable:string;
//  createdAt:string;
//  updatedAt:string;
// }

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
