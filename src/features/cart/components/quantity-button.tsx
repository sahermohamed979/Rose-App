'use client';
import { Button } from '@/shared/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { ICart } from '../types/cart-types';
import { Input } from '@/shared/components/ui/input';
import { Field } from '@/shared/components/ui/field';
import { useCartMutations } from '../hooks/cart-hook';

export default function QuantityButton({
  cartItem,
}: {
  cartItem: ICart;
}) {
  const stock = cartItem?.product?.stock;
  const DEBOUNCE_MS = 400;

  const [quantity, setQuantity] = useState(cartItem.quantity || 1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { UpdateCartQuantity } = useCartMutations();

  const clamp = (val: number) => {
    if (isNaN(val)) {
      return 1;
    }
    return Math.min(Math.max(val, 1), stock || 0);
  };

  const handleUpdate = (newVal: number) => {
    const nextQty = clamp(newVal);
    setQuantity(nextQty);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      UpdateCartQuantity.mutate({
        id: cartItem?.id || '',
        quantity: nextQty,
      });
    }, DEBOUNCE_MS);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        size="icon"
        className="h-8 w-8 sm:h-10 sm:w-11 rounded-lg sm:rounded-xl bg-bg-carosel shrink-0"
        onClick={() => handleUpdate(quantity - 1)}
        disabled={quantity <= 1 || UpdateCartQuantity.isPending}
      >
        <Minus size={16} className="text-text-primary" />
      </Button>

      <Field className="h-8 w-12 sm:h-10 sm:w-16">
        <Input
          type="number"
          min={1}
          max={stock}
          value={quantity}
          onChange={(e) => handleUpdate(Number(e.target.value))}
          className="text-center h-full px-1 text-xs sm:text-sm"
        />
      </Field>

      <Button
        type="button"
        size="icon"
        className="h-8 w-8 sm:h-10 sm:w-11 rounded-lg sm:rounded-xl bg-bg-carosel shrink-0"
        onClick={() => handleUpdate(quantity + 1)}
        disabled={
          quantity >= (stock || 0) || UpdateCartQuantity.isPending
        }
      >
        <Plus size={16} className="text-text-primary" />
      </Button>
    </div>
  );
}
