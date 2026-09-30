import { Link } from '@/i18n/navigation';
import lock from '@/shared/assets/images/Unauthorized.webp';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
export default function UnauthorizedScreen() {
  const t = useTranslations();
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 text-center">
      <div className="md:h-90 h-64 md:w-90 w-64 md:mb-12 mb-8">
        <Image
          src={lock}
          alt="unauthorized image"
          width={360}
          height={360}
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-2xl md:text-4xl  font-semibold text-text-plain max-w-4xl">
        {t('dashboard.unauthorized.title')}
      </h1>

      <p className="text-sm md:text-xl  text-text-muted text-center mt-1.5 mb-5 max-w-2xl">
        {t('dashboard.unauthorized.subtitle')}
      </p>

      <div className="border-b w-125 max-w-full mb-5" />

      <Link
        href="/"
        className="rounded-md px-6 py-2 text-base border border-border-soft"
      >
        {t('dashboard.unauthorized.home')}
      </Link>
    </main>
  );
}
