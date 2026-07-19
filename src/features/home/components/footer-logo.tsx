import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function FooterLogo() {
  // Translate footer logo
  const t = useTranslations('footer.logo');

  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-4">
      {/* Brand Logo Container */}
      <div className="relative w-60 h-56 md:w-48 md:h-48">
        <Image
          src="../../../shared/assets/images/footer-logo-image.png"
          alt="Rose Logo"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Brand Titles & Copyright */}
      <div className="flex flex-col gap-1 text-center">
        <h3 className="text-lg font-semibold text-text-secondary">
          {t('title')}
        </h3>
        <p className="text-sm text-text-inverse">{t('copyright')}</p>
      </div>
    </div>
  );
}
