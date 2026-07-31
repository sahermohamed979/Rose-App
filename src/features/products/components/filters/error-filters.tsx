import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function ErrorFilters() {
  // translations
  const t = await getTranslations('ProductsFilters');
  return (
    <div className="px-5 py-8 flex flex-col items-center justify-center text-center gap-4 rounded-xl border border-border-subtle bg-bg-subtle/50 my-4 shadow-sm">
      <div className="w-12 h-12 rounded-full bg-red-100/80 dark:bg-red-950/50 flex items-center justify-center text-red-500 ring-4 ring-red-50 dark:ring-red-950/30">
        <AlertTriangle size={24} />
      </div>
      <div className="space-y-1">
        <h4 className="text-base font-semibold text-text-plain">
          {t('error')}
        </h4>
        <p className="text-xs text-text-primary-faint max-w-[210px] leading-relaxed">
          {t('errorDescription')}
        </p>
      </div>
      <Link
        href="/products"
        className="mt-1 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-bg-primary text-white hover:opacity-90 transition-all shadow-xs"
      >
        <RefreshCw size={14} />
        <span>{t('retry')}</span>
      </Link>
    </div>
  );
}
