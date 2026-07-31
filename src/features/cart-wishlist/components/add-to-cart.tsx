import React from 'react';
import { Button } from '../../../shared/components/ui/button';
import { ShoppingCartIcon } from 'lucide-react';
import { useAddToCart } from '@/features/cart-wishlist/hooks/use-add-to-cart';

interface addToCartProps {
  productId: string;
  stock: number;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function AddToCart({
  productId,
  stock,
  quantity = 1,
  children,
  ...props
}: addToCartProps) {
  const { handleAddToCart, isPending } = useAddToCart();
  return (
    <>
      {/*add to cart button*/}
      <Button
        onClick={() => {
          handleAddToCart({ productId, quantity });
        }}
        disabled={isPending || stock === 0}
        roundedCartLoading={isPending}
        {...props}
      >
        {children ?? (
          <ShoppingCartIcon className="w-4 h-4 text-text-inverse dark:text-white" />
        )}
      </Button>
    </>
  );
}
