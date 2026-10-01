'use client';

import { Trash, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';

interface DeleteProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  onConfirm: () => void;
  isPending?: boolean;
}

export default function DeleteProductDialog({
  open,
  onOpenChange,
  productTitle,
  onConfirm,
  isPending = false,
}: DeleteProductDialogProps) {
  // Translations
  const t = useTranslations('products');
  const tButton = useTranslations('button');

  // Functions
  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) {
      return;
    }

    onOpenChange(nextOpen);
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="scrollbar-none max-h-[calc(100dvh-2rem)] w-4/5 max-w-4/5 gap-0 overflow-y-auto p-0 sm:max-w-4/5 md:w-[36.5%] md:max-w-[37.5%]"
        showCloseButton={false}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label={tButton('cancel')}
          className="absolute inset-e-0 top-0 z-10 mt-4 me-4 border-0 bg-transparent p-0 text-text-default outline-none hover:bg-transparent focus-visible:outline-none disabled:opacity-50"
          onClick={handleCancel}
          disabled={isPending}
        >
          <X className="size-6.25 text-text-default" />
        </button>

        <DialogHeader className="items-center px-4 pb-0 pt-12 text-center md:px-6 md:pt-20">
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-bg-muted md:mb-7 md:size-27.5 md:px-5 md:py-5">
            <div className="flex size-14 items-center justify-center rounded-full bg-bg-soft md:size-17.5 md:px-5 md:py-5">
              <Trash size={29} className="text-text-plain" />
            </div>
          </div>
          <DialogTitle className="mb-8 text-lg font-semibold leading-tight text-text-plain md:mb-14 md:text-xl md:leading-none">
            {t('deleteProduct', { title: productTitle })}
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className="m-0 gap-2 border-0 p-4 md:justify-between md:p-6">
          <Button
            className="w-full font-medium md:w-[48.8%] md:max-w-52"
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isPending}
          >
            {tButton('cancel')}
          </Button>
          <Button
            className="w-full font-medium md:w-[48.8%] md:max-w-52"
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? t('deleting') : tButton('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
