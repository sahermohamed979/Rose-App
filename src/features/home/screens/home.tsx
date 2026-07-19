import {
  getOccasions,
  getProductsByFilters,
} from '../apis/home-products-actions';

import Bestselling from '../components/best-selling';
import { Suspense } from 'react';
import MostPopular from '../components/most-popular';
import { ProductType } from '../types/product';

interface HomeProps {
  searchParams: {
    occasion?: string | string[];
  };
}
export default async function Home({
  searchParams,
}: {
  searchParams: HomeProps['searchParams'];
}) {
  let bestSellingProducts: ProductType[] = [];
  const occasions = await getOccasions({ page: 1, limit: 4 });
  const occasionParam = searchParams?.occasion;
  const activeOccasionName =
    typeof occasionParam === 'string' ? occasionParam : undefined;
  const activeOccasion =
    occasions.find(
      (occasion) =>
        occasion.title.toLowerCase() ===
        activeOccasionName?.toLowerCase()
    ) ?? occasions[0];
  const activeOccasionId = activeOccasion?.id;

  const ProductsByOccasion = await getProductsByFilters({
    page: 1,
    limit: 13,
    occasionId: activeOccasionId,
  });
  bestSellingProducts = await getProductsByFilters({
    page: 1,
    limit: 6,
    minRating: 3,
    sortBy: 'bestSelling',
    sortOrder: 'desc',
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto">
        <Bestselling bestSellingProducts={bestSellingProducts} />
        <MostPopular
          occasions={occasions}
          ProductsByOccasion={ProductsByOccasion}
          activeOccasionId={activeOccasionId}
        />
      </div>
    </Suspense>
  );
}
