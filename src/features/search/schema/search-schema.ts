import { z } from 'zod';

// Schema for search input validation
export const searchSchema = () =>
  z.object({
    query: z
      .string()
      .min(1, { message: 'Search query is required' })
      .max(200, { message: 'Search query is too long' }),
  });
// Schema for an individual product
export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.coerce.number(),
  discountType: z.enum(['FIXED', 'PERCENT']).nullable(),
  discountValue: z.string().nullable(),
  rating: z.coerce.number(),
  ratings: z.coerce.number(),
  cover: z.string(),
});

// Schema for a list of products
export const ProductsResponseSchema = z.array(ProductSchema);

export type SearchProduct = z.infer<typeof ProductSchema>;
