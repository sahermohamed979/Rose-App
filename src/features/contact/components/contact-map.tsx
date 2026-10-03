import { useTranslations } from 'next-intl';
import { ExternalLink, MapPin, Sparkles } from 'lucide-react';

export function ContactMap() {
  // Translation
  const t = useTranslations('contactPage');
  const tInfo = useTranslations('contactPage.info');

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-br from-soft-pink-100/60 via-bg-elevated to-bg-subtle p-6 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-bg-plain px-3 py-1 text-xs font-semibold text-text-primary border border-border-subtle">
          <Sparkles className="h-3 w-3 text-maroon-600 dark:text-soft-pink-400" />
          <span>{t('boutiqueBadge')}</span>
        </div>

        <a
          href="https://maps.google.com/?q=Zamalek,Cairo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-maroon-600 dark:text-soft-pink-300 hover:underline"
        >
          <span>{t('openInMaps')}</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bg-primary text-text-inverse">
          <MapPin className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-base font-bold text-text-primary">
            {tInfo('locationTitle')}
          </h4>
          <p className="mt-0.5 text-xs text-text-soft">
            {tInfo('locationValue')}
          </p>
          <p className="mt-1 text-xs font-medium text-maroon-700 dark:text-soft-pink-300">
            {tInfo('hoursValue')}
          </p>
        </div>
      </div>

      {/* Decorative Floral / Stylized Map Card */}
      <div className="mt-6 overflow-hidden rounded-xl border border-border-subtle bg-bg-plain p-4 text-center">
        <div className="flex flex-col items-center justify-center py-6 text-text-muted">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-soft-pink-200/50 dark:bg-maroon-900/40 text-maroon-600 dark:text-soft-pink-400">
            <MapPin className="h-7 w-7 animate-bounce" />
          </div>
          <span className="mt-3 text-xs font-medium text-text-default">
            {t('locationCity')}
          </span>
          <span className="text-[11px] text-text-muted">
            {t('locationNote')}
          </span>
        </div>
      </div>
    </div>
  );
}
