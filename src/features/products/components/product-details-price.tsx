import { formatCurrency } from '@/shared/lib/utils/formatter';

interface Props {
  price: string;
  discountValue: string;
  locale: string;
}

export default function ProductDetailsPrice({
  price,
  discountValue,
  locale,
}: Props) {
  const hasDiscount = Number(discountValue) > 0;

  const discountPrice =
    Number(price) - (Number(price) * Number(discountValue)) / 100;

  return (
    <div className="flex items-center gap-3 mt-4 flex-wrap">
      {hasDiscount ? (
        <>
          <span className="text-text-subtle line-through font-bold text-xl">
            {formatCurrency(Number(price), locale)}
          </span>

          <span className="text-3xl text-text-plain font-semibold">
            {formatCurrency(discountPrice, locale)}
          </span>
        </>
      ) : (
        <span className="text-3xl text-text-plain font-semibold">
          {formatCurrency(Number(price), locale)}
        </span>
      )}
    </div>
  );
}
