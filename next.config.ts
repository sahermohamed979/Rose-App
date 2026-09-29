import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rose-app.elevate-bootcamp.cloud',
        pathname: '/storage/entities/product/**',
      },
      {
        protocol: 'https',
        hostname: 'rose-app.elevate-bootcamp.cloud',
        pathname: '/storage/entities/category/**',
      },
      {
        protocol: 'https',
        hostname: 'rose-app.elevate-bootcamp.cloud',
        pathname: '/api/upload/temp/**',
      },
      {
        protocol: 'https',
        hostname: 'rose-app.elevate-bootcamp.cloud',
        pathname: '/storage/entities/occasion/**',
      },
      {
        protocol: 'https',
        hostname: 'rose-app.elevate-bootcamp.cloud',
        pathname: '/storage/entities/user/**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
