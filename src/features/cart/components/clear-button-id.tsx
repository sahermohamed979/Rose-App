'use client';
import { Button } from '@/shared/components/ui/button';

import { Trash2 } from 'lucide-react';
import { useCartMutations } from '../hooks/cart-hook';
import { useTranslations } from 'next-intl';

export default function ClearButtonId({ id }: { id: string }) {
  const { RemoveCartById } = useCartMutations();
  const t = useTranslations('cart');
  return (
    <Button
      disabled={RemoveCartById.isPending}
      onClick={() => RemoveCartById.mutate({ id })}
      className="h-10 w-24 rounded-xl  flex items-center justify-center transition-all duration-200 "
      title={t('remove')}
    >
      <Trash2 size={20} />
      {t('remove')}
    </Button>
  );
}
