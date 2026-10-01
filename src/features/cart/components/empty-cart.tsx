import Image from 'next/image';
import emptyCart from '../assets/empty.png';
import { useTranslations } from 'next-intl';

export default function EmptyCart() {
  const t = useTranslations('cart');
  return (
    <div className="h-100 flex flex-col items-center justify-center">
      <Image
        src={emptyCart}
        alt="empty-cart"
        width={250}
        height={214}
      />
      <h2 className="text-lg text-text-muted">{t('empty')}</h2>
    </div>
  );
}
