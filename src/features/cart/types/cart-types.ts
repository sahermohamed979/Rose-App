import { IProduct } from '@/shared/lib/types/product-types';
import { cartQuantitySchema } from '../schema/cart-quantity-schema';
import z from 'zod';

export interface ICart {
  id?: string;
  userId?: string;
  productId: string;
  quantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
  product?: IProduct;
}

export interface ICartResponse {
  cartItems: ICart[];
}

export type CartQuantitySchemaType = z.infer<
  typeof cartQuantitySchema
>;
