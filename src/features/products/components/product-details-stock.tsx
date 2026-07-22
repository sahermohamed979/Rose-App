import { Package } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { useTranslations } from 'next-intl';
import { formatNumber } from '@/shared/lib/utils/formatter';

interface Props {
  stock: number;
  locale: string;
}

export default function ProductStockBadge({ stock, locale }: Props) {
  const t = useTranslations('ProductDetails');

  return (
    <Badge
      variant="subtle"
      className="ml-2 bg-bg-muted text-sm text-text-plain"
    >
      <Package size={18} className="mr-1" />

      {stock > 0
        ? t('unitsInStock', {
            count: formatNumber(stock, locale),
          })
        : t('outOfStock')}
    </Badge>
  );
}
