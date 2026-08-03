import ProductGrid from '../components/product-grid';
import { IPaginationResponse } from '@/shared/lib/types/api';
import PaginationProducts from '../components/pagination-products';
import { IProduct } from '@/shared/lib/types/product-types';

export default async function ProductScreen({
  data,
}: {
  data: Promise<IPaginationResponse<IProduct> | null>;
}) {
  const productsData = await data;
  return (
    <>
      <ProductGrid products={productsData?.data || []} />
      <PaginationProducts data={productsData} />
    </>
  );
}
