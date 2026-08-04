import { useLocale, useTranslations } from 'next-intl';

interface OrderTotalsProps {
  subtotal: number;
  discount: number;
  total: number;
  currency: string;
}

export function OrderTotals({
  subtotal,
  discount,
  total,
  currency,
}: OrderTotalsProps) {
  const t = useTranslations('cart');
  const locale = useLocale();

  const formatNumber = (num: number) =>
    new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US').format(
      num
    );

  return (
    <div className="flex flex-col gap-0.5 border-t border-border-soft pt-4">
      {/* Subtotal */}
      <div className="flex items-center justify-between text-sm text-text-plain py-1.5">
        <span>{t('subtotal')}</span>
        <span className="font-medium tabular-nums">
          {formatNumber(subtotal)} {currency}
        </span>
      </div>

      {/* Discount row — only visible when a coupon is applied */}
      {discount > 0 && (
        <div className="flex items-center justify-between text-sm text-text-success py-1.5 animate-in fade-in-0 duration-200">
          <span>{t('discount')}</span>
          <span className="font-medium tabular-nums">
            -{formatNumber(discount)} {currency}
          </span>
        </div>
      )}

      {/* Separator */}
      <div className="border-t border-border-soft my-1" />

      {/* Total */}
      <div className="flex items-center justify-between pt-1">
        <span className="font-bold text-base text-text-primary">
          {t('total')}
        </span>
        <span className="font-bold text-lg text-text-primary tabular-nums">
          {formatNumber(total)} {currency}
        </span>
      </div>
    </div>
  );
}
