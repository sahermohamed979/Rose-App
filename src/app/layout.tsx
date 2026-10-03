import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ||
      'https://rose-app-gilt.vercel.app'
  ),
  title: {
    default: 'Rose | Luxury Flowers & Gifts',
    template: '%s | Rose',
  },
  description:
    'Shop hand-crafted flower bouquets, luxury floral arrangements, and unique gifts for every occasion with fast same-day delivery.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
