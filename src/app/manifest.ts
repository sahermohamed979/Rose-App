import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rose - Luxury Flowers & Gifts',
    short_name: 'Rose',
    description:
      'Shop hand-crafted flower bouquets, luxury floral arrangements, and unique gifts with same-day delivery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#d45672',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
