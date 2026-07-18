import React from 'react';
import img1 from '../../assets/images/9c80f839880ae4729e2ed36e6a6e2ce4c8acf962.png';
import img2 from '../../assets/images/650ebce97e11985e0c78fa1a2c8b1633ad6865ae.png';
import img3 from '../../assets/images/f1ae11b6a3272e3325efa8c7c66af85509d2b54c.png';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
export default async function PromoCards() {
  const t = await getTranslations();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-4  relative">
        <Link href="/products?occasion=wedding">
          <Image
            src={img1}
            alt=""
            className="object-cover size-full rounded-[16px]"
          />
          <div className="absolute bottom-6 left-6 rtl:right-6">
            <div className="bg-bg-primary-fade flex justify-center items-center rounded-full w-fit ">
              <p className="text-maroon-600 text-xs py-0.5 px-2">
                {t('categories.wedding')}
              </p>
            </div>
            <p className="text-2xl mt-2.5 font-semibold text-text-inverse">
              {t('cards.weddingTitle')}
            </p>
          </div>
        </Link>
      </div>

      <div className="col-span-4  relative">
        <Link href="/products?occasion=engagement">
          <Image
            src={img2}
            alt=""
            className="object-cover size-full rounded-[16px]"
          />
          <div className="absolute bottom-6 left-6 rtl:right-6">
            <div className="bg-bg-primary-fade flex justify-center items-center rounded-full w-fit ">
              <p className="text-maroon-600 text-xs py-0.5 px-2">
                {t('categories.engagement')}
              </p>
            </div>
            <p className="text-2xl mt-2.5 font-semibold text-text-inverse">
              {t('cards.engagementTitle')}
            </p>
          </div>
        </Link>
      </div>

      <div className="col-span-4  relative">
        <Link href="/products?occasion=anniversary">
          <Image
            src={img3}
            alt=""
            className="object-cover size-full rounded-[16px]"
          />
          <div className="absolute bottom-6 left-6 rtl:right-6">
            <div className="bg-bg-primary-fade flex justify-center items-center rounded-full w-fit ">
              <p className="text-maroon-600 text-xs py-0.5 px-2">
                {t('categories.anniversary')}
              </p>
            </div>
            <p className="text-2xl mt-2.5 font-semibold text-text-inverse">
              {t('cards.anniversaryTitle')}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
