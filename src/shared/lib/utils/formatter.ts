export const getFormatterLocale = (locale: string) => {
  return locale.startsWith('ar') ? 'ar-EG-u-nu-arab' : 'en-US';
};

export const formatCurrency = (value: number, locale: string) => {
  return new Intl.NumberFormat(getFormatterLocale(locale), {
    style: 'currency',
    currency: 'EGP',
  }).format(value);
};

export const formatNumber = (
  value: number,
  locale: string,
  minFraction = 0,
  maxFraction = 0
) => {
  return new Intl.NumberFormat(getFormatterLocale(locale), {
    minimumFractionDigits: minFraction,
    maximumFractionDigits: maxFraction,
  }).format(value);
};
