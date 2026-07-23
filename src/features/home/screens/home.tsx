import Bestselling from '../components/best-selling';
import { Suspense } from 'react';
import MostPopularSection from '../components/most-popular-section';
import ProductCardSkeletonGrid from '../skeltons/product-card-skeleton';
import MostPopularSkeleton from '../skeltons/most-popular-skelton';

interface HomeProps {
  searchParams: {
    occasion?: string | string[];
  };
}
export default function Home({
  searchParams,
}: {
  searchParams: HomeProps['searchParams'];
}) {
  return (
    <div className="container mx-auto">
      <Bestselling />
      <Suspense fallback={<MostPopularSkeleton />}>
        <MostPopularSection searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
