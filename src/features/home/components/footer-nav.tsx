import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

/**
 * FooterNav Component
 * Renders the navigation links for the footer.
 * Uses the localized Link component from next-intl.
 */
export default function FooterNav() {
  const t = useTranslations('footer.nav');

  // --- Data ---
  const navLinks = [
    { label: t('home'), href: '/' },
    { label: t('products'), href: '/products' },
    { label: t('categories'), href: '/categories' },
    { label: t('occasions'), href: '/occasions' },
    { label: t('contact'), href: '/contact' },
    { label: t('about'), href: '/about' },
    { label: t('terms'), href: '/terms' },
    { label: t('privacy'), href: '/privacy' },
    { label: t('faq'), href: '/faq' },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Title */}
      <h3 className="text-lg font-semibold text-text-secondary">
        {t('title')}
      </h3>

      {/* Navigation Links */}
      <ul className="flex flex-col gap-1">
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-md text-text-inverse hover:underline transition-all"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
