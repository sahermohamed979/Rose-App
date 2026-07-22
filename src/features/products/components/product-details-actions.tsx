import { HeartPlus, ShoppingCart } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';

interface Props {
  stock: number;
}

export default function ProductActions({ stock }: Props) {
  const t = useTranslations('ProductDetails');

  return (
    <div className="flex gap-4">
      <button
        className="w-12 h-12 rounded-lg bg-bg-muted flex items-center justify-center"
        aria-label={t('addToFavorites')}
      >
        <HeartPlus size={20} />
      </button>

      <Button
        disabled={stock === 0}
        className="flex-1 h-11 flex items-center justify-center gap-2 text-text-inverse"
      >
        <ShoppingCart size={22} />
        {t('addToCart')}
      </Button>
    </div>
  );
}
