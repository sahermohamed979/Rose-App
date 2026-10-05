import { Suspense } from 'react';

import Header from '@/features/home/components/header';
import Footer from '@/shared/components/footer';
import HeaderSkeleton from '@/features/home/skeletons/header-skeleton';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="grow min-h-screen flex flex-col">
      {/* Suspense decouples header data-fetching from page content streaming */}
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  );
}
