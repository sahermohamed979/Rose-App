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

  const [quantity, setQuantity] = useState(cartItem.quantity || 0);

  const isFirstRender = useRef(true);

  const { UpdateCartQuantity } = useCartMutations();

  const clamp = (val: number) => {
    if (isNaN(val)) {
      return 1;
    }
    return Math.min(Math.max(val, 1), stock || 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(clamp(Number(e.target.value)));
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      UpdateCartQuantity.mutate({
        id: cartItem?.id || '',
        quantity,
      });
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [quantity]);

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        size="icon"
        className="h-12 w-12 rounded-xl bg-bg-carosel"
        onClick={() => setQuantity((q) => clamp(q - 1))}
        disabled={quantity <= 1 || UpdateCartQuantity.isPending}
      >
        <Minus size={20} className="text-text-primary" />
      </Button>

      <Field className="h-12 w-28">
        <Input
          type="number"
          min={1}
          max={stock}
          value={quantity}
          onChange={handleChange}
          onBlur={() => setQuantity((q) => clamp(q))}
        />
      </Field>

      <Button
        type="button"
        size="icon"
        className="h-12 w-12 rounded-xl bg-bg-carosel"
        onClick={() => setQuantity((q) => clamp(q + 1))}
        disabled={
          quantity >= (stock || 0) || UpdateCartQuantity.isPending
        }
      >
        <Plus size={20} className="text-text-primary" />
      </Button>
    </div>
  );
}
