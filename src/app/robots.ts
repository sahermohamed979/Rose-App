import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://rose-app-gilt.vercel.app'
  ).replace(/\/+$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/*/account-setting',
          '/*/cart',
          '/*/checkout',
          '/*/orders',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
