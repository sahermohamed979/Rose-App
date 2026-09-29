import React from 'react';
import { ShoppingCartIcon } from 'lucide-react';

import { Button } from '../../../shared/components/ui/button';
import { ICart } from '@/features/cart/types/cart-types';
import { useAddToCart } from '@/features/cart-wishlist/hooks/use-add-to-cart';

type AddToCartProps = Pick<
  ICart,
  'productId' | 'quantity' | 'product'
> & {
  stock: number;
  className?: string;
  children?: React.ReactNode;
};

export default function AddToCart({
  productId,
  product,
  stock,
  quantity = 1,
  children,
  ...props
}: AddToCartProps) {
  // Hooks
  const { handleAddToCart, isPending } = useAddToCart();

  return (
    <Button
      onClick={() => {
        handleAddToCart({ productId, quantity, product });
      }}
      disabled={isPending || stock === 0}
      {...props}
    >
      {children ?? (
        <ShoppingCartIcon className="w-4 h-4 text-text-inverse dark:text-white" />
      )}
    </Button>
  );
}
