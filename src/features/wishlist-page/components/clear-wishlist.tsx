'use client';

import { BrushCleaning, X } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';
import { Button } from '@/shared/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import clearWishListAction from '../apis/clear-wishlist-action';

import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

export function ClearWishlist() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('wishlist');

  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['clear-wishlist'],
    mutationFn: clearWishListAction,
    onSuccess: (_data) => {
      setOpen(false);
      router.refresh();
      toast.success('Your wishlist is empty');
    },
    onError: (_error) => {},
  });

  return (
    <div className="relative">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger
          render={
            <Button
              className="w-auto px-3 sm:px-4 sm:w-45.25 h-9 sm:h-11 flex items-center gap-1.5 sm:gap-2 bg-bg-danger text-text-inverse text-xs sm:text-sm"
              variant="destructive"
            >
              <BrushCleaning className="w-4 h-4 rtl:order-2" />
              <span className="rtl:order-1">
                {t('clearWishlist')}
              </span>
            </Button>
          }
        />
        <AlertDialogContent
          size="sm"
          className="w-[92vw] max-w-[474px] sm:w-118.5 data-[size=sm]:max-w-[92vw] data-[size=sm]:sm:max-w-118.5 h-auto max-h-[90vh] p-4 sm:p-6"
        >
          <AlertDialogHeader className="mt-18.25">
            <AlertDialogCancel className="absolute top-6 right-6 border-none">
              <X />
            </AlertDialogCancel>
            <div className="bg-bg-muted rounded-full size-26.25 flex justify-center items-center">
              <AlertDialogMedia className="bg-bg-soft rounded-full size-17.5 flex justify-center items-center mt-2">
                <BrushCleaning size={29} />
              </AlertDialogMedia>
            </div>
            <AlertDialogDescription>
              <span className="text-[20px] mt-4 font-semibold">
                {t('clearWishlistConfirmation')}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className={'w-full bg-bg-muted  h-10 rounded'}
              variant="outline"
            >
              {t('cancel')}
            </AlertDialogCancel>
            <Button
              onClick={() => {
                mutate();
              }}
              className={
                'w-full h-10 rounded bg-bg-danger text-text-inverse'
              }
              variant="destructive"
            >
              {t('confirm')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
