import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (
    process.env.NEXT_PUBLIC_APP_URL || 'https://rose-app.com'
  ).replace(/\/+$/, '');
  const currentDate = new Date().toISOString();

  const publicRoutes = [
    '',
    '/products',
    '/categories',
    '/occasions',
    '/about',
    '/contact',
    '/login',
    '/register',
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of publicRoutes) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: currentDate,
        changeFrequency:
          route === '' || route === '/products' ? 'daily' : 'weekly',
        priority:
          route === '' ? 1.0 : route === '/products' ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${baseUrl}/${l}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}
