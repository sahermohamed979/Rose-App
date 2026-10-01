import { useTranslations } from 'next-intl';

export default function ProductOptionsLoadError() {
  // Translations
  const t = useTranslations('dashboard.products');

  return (
    <p className="text-text-danger" role="alert">
      {t('optionsLoadError')}
    </p>
  );
}
