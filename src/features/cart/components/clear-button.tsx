'use client';

import { useState } from 'react';

import { BrushCleaning } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ICartResponse } from '../types/cart-types';
import { Button } from '@/shared/components/ui/button';
import { useCartMutations } from '../hooks/cart-hook';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';

export default function ClearButton({
  cart,
}: {
  cart: ICartResponse | null;
}) {
  const { clearCart } = useCartMutations();
  const t = useTranslations('cart');
  const tButton = useTranslations('button');

  // State
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        disabled={cart?.cartItems.length === 0 || clearCart.isPending}
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-base font-semibold text-text-primary bg-bg-carosel h-9 sm:h-10 w-auto px-3 sm:px-4 sm:w-34 rounded-xl"
      >
        <span>
          <BrushCleaning size={18} />
        </span>
        {t('clearCart')}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[92vw] max-w-[474px] min-h-[300px] sm:min-h-[347px] rounded-2xl flex flex-col items-center justify-around p-4 sm:p-6">
          {/* Icon */}
          <div className="flex items-center justify-center rounded-full bg-bg-muted p-5 mt-5">
            <span className="flex items-center justify-center rounded-full bg-bg-soft p-4">
              <BrushCleaning size={29} className="text-text-plain" />
            </span>
          </div>

          {/* Title */}
          <DialogHeader>
            <DialogTitle className="text-lg font-medium text-center">
              {t('confirmClear')}
            </DialogTitle>
          </DialogHeader>

          {/* Actions */}
          <DialogFooter className="grid grid-cols-2 gap-3 w-full bg-transparent border-t-0 p-0 m-0">
            <DialogClose
              render={
                <Button
                  variant="secondary"
                  className="w-full cursor-pointer text-sm font-medium text-text-plain"
                >
                  {tButton('cancel')}
                </Button>
              }
            />
            <Button
              variant="destructive"
              className="w-full cursor-pointer text-sm font-medium"
              onClick={() => {
                clearCart.mutate();
                setOpen(false);
              }}
            >
              {tButton('confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
