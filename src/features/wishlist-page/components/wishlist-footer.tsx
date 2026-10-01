import { MoveLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function WishlistFooter() {
  const t = useTranslations('wishlist');

  return (
    <div>
      <Link
        href={'/products'}
        className={
          'bg-bg-primary mb-2.5 text-text-inverse py-3 sm:py-3.5 px-6 sm:px-8 flex justify-center items-center rounded-md gap-2.5 w-full sm:w-fit text-sm sm:text-base'
        }
      >
        <MoveLeft size={20} className="rtl:rotate-180" />{' '}
        {t('continueShopping')}
      </Link>
    </div>
  );
}
