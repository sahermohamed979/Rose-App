'use client';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function UserInfoTitle({ email }: { email: string }) {
  const searchParams = useSearchParams();
  const step = Number(searchParams.get('step')) || 1; // Get current step from URL, default to 1
  const t = useTranslations();
  const router = useRouter();
  return (
    <>
      {/* step2 titles */}
      <div className={step !== 2 ? 'hidden' : 'block'}>
        <div className="border-b border-border-soft pb-6 mb-6">
          <h1 className="text-text-plain font-bold text-[30px] leading-[100%]">
            {t('register.createAccount')}
          </h1>
          <p className="text-text-primary font-semibold text-[20px] mt-2">
            {t('register.otp.title')}
          </p>
          <p className="text-sm mt-1 inline-block">
            {' '}
            {t('register.otp.subtitle', { email: email })}{' '}
          </p>
          <span>
            <Button
              variant="link"
              className="p-0 text-text-primary leading-none hover:text-text-primary-saturated text-sm"
              onClick={() => router.push('/register?step=1')}
            >
              {' '}
              {t('register.edit')}
            </Button>
          </span>
        </div>
      </div>
      {/* step3 titles */}
      <div className={step !== 3 ? 'hidden' : 'block'}>
        <div className="border-b border-border-soft pb-6 mb-6">
          <h1 className="text-text-plain font-bold text-[30px] leading-[100%]">
            {t('register.createAccount')}
          </h1>
          <p className="text-text-primary font-semibold text-[20px] mt-2">
            {t('register.aboutYou')}
          </p>
          <p className="text-sm mt-1"> {t('register.fewDetails')} </p>
        </div>
      </div>
      {/* step4 titles */}
      <div className={step !== 4 ? 'hidden' : 'block'}>
        <div className="border-b border-border-soft pb-6 mb-6">
          <h1 className="text-text-plain font-bold text-[30px] leading-[100%]">
            {t('register.createAccount')}
          </h1>
          <p className="text-text-primary font-semibold text-[20px] mt-2">
            {t('register.strongPassword')}
          </p>
          <p className="text-sm mt-1">
            {t('register.securePassword')}{' '}
          </p>
        </div>
      </div>
    </>
  );
}
