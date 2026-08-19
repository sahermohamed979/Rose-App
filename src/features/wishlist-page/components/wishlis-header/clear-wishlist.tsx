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
import clearWishList from '../../actions/clear-wishlist-action';
import clearWishListAction from '../../actions/clear-wishlist-action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function ClearWishlist() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['clear-wishlist'],
    mutationFn: clearWishListAction,
    onSuccess: (data) => {
      setOpen(false);
      router.refresh();
      toast.success('Your wishlist is empty');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="relative">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger
          render={
            <Button
              className={
                'w-45.25 h-11 bg-bg-danger text-text-inverse'
              }
              variant="destructive"
            >
              <BrushCleaning /> Clear Wishlist
            </Button>
          }
        />
        <AlertDialogContent
          size="sm"
          className="w-118.5 data-[size=sm]:max-w-118.5 data-[size=sm]:sm:max-w-118.5 h-86.75"
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
              <p className="text-[20px] mt-4 font-semibold">
                Are you sure you want to clear your Wishlist?
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className={'w-full bg-bg-muted  h-10 rounded'}
              variant="outline"
            >
              Cancel
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
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
