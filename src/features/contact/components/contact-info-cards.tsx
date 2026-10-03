import { useTranslations } from 'next-intl';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

export function ContactInfoCards() {
  // Translation
  const t = useTranslations('contactPage.info');

  // Variables
  const contactCards = [
    {
      icon: Phone,
      title: t('phoneTitle'),
      desc: t('phoneDesc'),
      value: t('phoneValue'),
      href: `tel:${t('phoneValue').replace(/\s+/g, '')}`,
    },
    {
      icon: Mail,
      title: t('emailTitle'),
      desc: t('emailDesc'),
      value: t('emailValue'),
      href: `mailto:${t('emailValue')}`,
    },
    {
      icon: MapPin,
      title: t('locationTitle'),
      desc: t('locationDesc'),
      value: t('locationValue'),
      href: 'https://maps.google.com/?q=Zamalek,Cairo',
      target: '_blank',
    },
    {
      icon: Clock,
      title: t('hoursTitle'),
      desc: t('hoursDesc'),
      value: t('hoursValue'),
      href: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {contactCards.map((card) => {
        const Icon = card.icon;
        const CardWrapper = card.href ? 'a' : 'div';
        const wrapperProps = card.href
          ? {
              href: card.href,
              target: card.target,
              rel: card.target ? 'noopener noreferrer' : undefined,
            }
          : {};

        return (
          <CardWrapper
            key={card.title}
            {...wrapperProps}
            className="group flex flex-col justify-between rounded-2xl border border-border-subtle bg-bg-elevated p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-border-primary hover:shadow-md"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-soft-pink-100 text-maroon-700 dark:bg-maroon-900/60 dark:text-soft-pink-300 transition-transform group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-base font-bold text-text-primary">
                {card.title}
              </h3>

              <p className="mt-1 text-xs text-text-soft">
                {card.desc}
              </p>
            </div>

            <p className="mt-4 text-sm font-semibold text-maroon-600 dark:text-soft-pink-300 break-words">
              {card.value}
            </p>
          </CardWrapper>
        );
      })}
    </div>
  );
}
