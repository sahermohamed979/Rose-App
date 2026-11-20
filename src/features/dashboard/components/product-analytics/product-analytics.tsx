import { ProductResponse } from '@/shared/lib/types/product-types';
import { getDirectToken } from '@/shared/lib/utils/get-direct-token';
import TopSelling from './top-selling-products';
import LowStock from './low-stock-products';

export default async function ProductsAnalaytics() {
  const token = await getDirectToken();
  const response = await fetch(
    `${process.env.NEXT_API_URL}/products?page=1&limit=100`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw Error('failed to fetch data');
  }
  const data: ProductResponse = await response.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TopSelling data={data} />
      <LowStock data={data} />
    </div>
  );
}
