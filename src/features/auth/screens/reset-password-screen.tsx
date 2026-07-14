import { useTranslations } from 'next-intl';
import ResetPasswordForm from '../components/reset-password-form';
import ForgetTittles from '../components/forgot-password-title';
import { Link } from '@/i18n/navigation';

export default function ResetPasswordScreen() {
  const t = useTranslations();
  return (
    <div className="max-w-lg w-full">
      {/* titles  */}
      <ForgetTittles
        title={t('forgotPw.step3.title')}
        description={t('forgotPw.step3.subtitle')}
      />
      {/* form */}
      <ResetPasswordForm />
      {/* footer  */}
      <div className="text-center text-sm  border-t mt-9">
        <span className=" text-sm mt-6 inline-block font-medium text-text-plain   ">
          {t('forgotPw.step2.help')}
          <Link href={'/contact'} className="text-maroon-700">
            {t('forgotPw.step2.contact')}
          </Link>
        </span>
      </div>
    </div>
  );
}
