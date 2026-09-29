import { Truck, RefreshCw, ShieldCheck, Headset } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function FeaturesStrip() {
  const t = await getTranslations();
  return (
    <div className="bg-bg-primary-fade rounded-2xl p-5 sm:p-8 md:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Free Delivery */}
        <div className="flex items-center gap-4">
          <div className="bg-maroon-600 rounded-full pt-4 pb-4.5 px-[13.75px] items-center flex justify-center size-16.25">
            <Truck
              className="text-text-inverse"
              size={40}
              strokeWidth={1.3}
            />
          </div>
          <div className="flex flex-col ">
            <p className="text-maroon-600 font-semibold text-[20px]">
              {t('features.freeDelivery')}
            </p>
            <p className="text-text-soft text-sm">
              {t('features.freeDeliveryDesc')}
            </p>
          </div>
        </div>

        {/* Get Refund */}
        <div className="flex items-center gap-3">
          <div className="bg-maroon-600 rounded-full pt-4 pb-4.5 px-[13.75px] items-center flex justify-center size-16.25">
            <RefreshCw
              className="text-text-inverse"
              size={40}
              strokeWidth={1.3}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-maroon-600 font-semibold text-[20px]">
              {t('features.refund')}
            </p>
            <p className="text-text-soft text-sm">
              {t('features.refundDesc')}
            </p>
          </div>
        </div>

        {/* Safe Payment */}
        <div className="flex items-center gap-3">
          <div className="bg-maroon-600 rounded-full pt-4 pb-4.5 px-[13.75px] items-center flex justify-center size-16.25">
            <ShieldCheck
              className="text-text-inverse"
              size={40}
              strokeWidth={1.3}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-maroon-600 font-semibold text-[20px]">
              {t('features.safePayment')}
            </p>
            <p className="text-text-soft text-sm">
              {t('features.safePaymentDesc')}
            </p>
          </div>
        </div>

        {/* 24/7 Support */}
        <div className="flex items-center gap-3">
          <div className="bg-maroon-600 rounded-full pt-4 pb-4.5 px-[13.75px] items-center flex justify-center size-16.25">
            <Headset
              className="text-text-inverse"
              size={40}
              strokeWidth={1.3}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-maroon-600 font-semibold text-[20px]">
              {t('features.support')}
            </p>
            <p className="text-text-soft text-sm">
              {t('features.supportDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
