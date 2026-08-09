import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';
import { clearLocalIndex } from '@/features/cart-wishlist/lib/local-cart-client';

export default function ClearButtonLocalId({ id }: { id: string }) {
  const t = useTranslations('cart');

  return (
    <Button
      onClick={() => clearLocalIndex(id)}
      className="h-10 w-24 rounded-xl  flex items-center justify-center transition-all duration-200 "
      title={t('remove')}
    >
      <Trash2 size={20} />
      {t('remove')}
    </Button>
  );
}
