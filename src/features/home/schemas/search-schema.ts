import { z } from 'zod';

// Schema for search input validation
export const searchSchema = () =>
  z.object({
    query: z.string().min(1, { message: 'Search query is required' }),
  });

// Schema for an individual product
export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.coerce.number(),
  discountPrice: z.coerce.number().optional(),
  rating: z.coerce.number(),
  cover: z.string(),
  reviewsCount: z.number().default(0),
});

// Schema for a list of products
export const ProductsResponseSchema = z.array(ProductSchema);
