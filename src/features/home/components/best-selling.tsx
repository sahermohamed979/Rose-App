
import { Button } from '@/shared/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { Product } from '../types/product'
import BestSellingCarousel from './best-selling-carousel'
import { getLocale, getTranslations } from 'next-intl/server'

export default async function Bestselling({ bestSellingProducts }: { bestSellingProducts: Product[] }) {
const t = await getTranslations('home')
const locale = await getLocale()
  return (
    <div className='grid grid-cols-1 gap-9 px-5 md:px-0 lg:grid-cols-[minmax(260px,22.7%)_minmax(0,1fr)] mb-[138px]'>
      <div className=' flex flex-col justify-between mb-5 md:mb-0'>
        <div>
          <p className='text-base
      font-bold
      text-text-secondary
      leading-none 
      letter-spacing-[25%] mb-[10px]'>{t('bestSelling')}</p>
          <p className='text-3xl
      font-bold
      text-text-primary
      leading-none 
      mb-[10px]'>
            <span className=' text-text-secondary'>Check Out </span>
            What Everyone’s
            <span className='text-text-secondary'> Buying</span><br />
            Right Now</p>
          <p className='text-base
        text-text-soft
        leading-none 
        mb-[10px]'>Not sure what to choose?<br />
            Start with our best sellers, these are the gifts our customers keep coming back for.
            Whether you&apos;re celebrating a birthday, anniversary or wedding, our top picks are guaranteed to leave a lasting impression. </p>
        </div>
        <Button className='w-[53%]'>
          {t("exploreGifts")}
          
          {locale === 'ar' ? <ArrowRightIcon className='w-4 h-4 rotate-180' /> : <ArrowRightIcon
           className='w-4 h-4' />}
        </Button>
      </div>
      <div className='min-w-0 w-full'>

        <BestSellingCarousel bestSellingProducts={bestSellingProducts} />
      </div>
    </div>
  );
}
