import bgImg from '../../assets/images/132a2f7f5902767a6f99bcab7221e6bf3f2703e8.webp';
import Image from 'next/image';
import { Button } from '@base-ui/react/button';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
export default async function SidePromoCard() {
  const t = await getTranslations();
  return (
    <div className="bg-bg-primary h-109.75 rounded-xl relative">
      <Image
        src={bgImg}
        alt="Back Ground image"
        className="object-cover size-full rounded-xl "
      />
      <div className="absolute bottom-6 left-6  flex flex-col items-start gap-2 rtl:right-6 ">
        <div className="bg-bg-primary-fade flex justify-center items-center rounded-full">
          <p className="text-maroon-600 text-xs py-0.5 px-2">
            {t('hero.startingFrom')}
          </p>
        </div>

        <p className="text-2xl font-semibold text-text-inverse h-19.5">
          {t('hero.specialGifts')}
        </p>
        <Button className="bg-bg-primary-fade rounded-[10px] text-maroon-700 h-9 mt-2.5 ">
          <Link href={'products'}>
            <p className="flex justify-center items-center py-2.2 px-4 gap-1.5 ">
              {t('hero.shopNow')}
              <ArrowRight className="rtl:rotate-180" size={16} />
            </p>
          </Link>
        </Button>
      </div>
    </div>
  );
}
