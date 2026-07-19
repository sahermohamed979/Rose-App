import { ProductsType, ProductType } from '../types/product';
import { OccasionType } from '../types/occasions';

export const getProductsByFilters = async ({
  page,
  limit,
  minRating,
  categoryId,
  subCategoryId,
  occasionId,
  minPrice,
  maxPrice,
  sortBy,
  sortOrder,
}: ProductsType): Promise<ProductType[]> => {
  try {
    const params = new URLSearchParams();

    Object.entries({
      page,
      limit,
      categoryId,
      subCategoryId,
      occasionId,
      minPrice,
      maxPrice,
      minRating,
      sortBy,
      sortOrder,
    }).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });

    const response = await fetch(
      `${process.env.NEXT_API_URL}/products?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      console.error('Failed to fetch products:', data.message);
      return [];
    }

    return data.payload.data as ProductType[];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};
export const getOccasions = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<OccasionType[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/occasions?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      console.error('Failed to fetch occasions:', data.message);
      return [];
    }

    return data.payload.data as OccasionType[];
  } catch (error) {
    console.error('Failed to fetch occasions:', error);
    return [];
  }
};
