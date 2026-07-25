import {
  getOccasions,
  getProductsByFilters,
} from '../apis/home-products-actions';
import { OccasionType } from '../types/occasions';
import { ProductType } from '../types/product';
import MostPopular from './most-popular';

interface MostPopularSectionProps {
  searchParams: {
    occasion?: string | string[];
  };
}

export default async function MostPopularSection({
  searchParams,
}: MostPopularSectionProps) {
  let occasions: OccasionType[] = [];
  let ProductsByOccasion: ProductType[] = [];

  try {
    occasions = await getOccasions({ page: 1, limit: 4 });
  } catch {
    occasions = [];
  }

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

  if (activeOccasionId) {
    try {
      ProductsByOccasion = await getProductsByFilters({
        page: 1,
        limit: 13,
        occasionId: activeOccasionId,
      });
    } catch {
      ProductsByOccasion = [];
    }
  }

  return (
    <MostPopular
      occasions={occasions}
      ProductsByOccasion={ProductsByOccasion}
      activeOccasionId={activeOccasionId}
    />
  );
}
