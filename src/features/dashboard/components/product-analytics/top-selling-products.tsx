import { ProductResponse } from '@/shared/lib/types/product-types';

interface TopSellingType {
  data: ProductResponse;
}

export default function TopSelling({ data }: TopSellingType) {
  const sortedProducts = [...data.payload.data].sort(
    (product1, product2) => {
      return (
        (product2._count?.orderItems ?? 0) -
        (product1._count?.orderItems ?? 0)
      );
    }
  );

  return (
    <div className="bg-bg-plain p-6 rounded-xl h-110.75 overflow-y-auto scrollbar-hide ">
      <p className="text-2xl text-text-plain font-semibold mb-6 ">
        Top Selling Products
      </p>

      {sortedProducts.map((product, index) => {
        const background =
          index === 0
            ? 'linear-gradient(90deg, #DFAC16 10%, #FDF6E5 25%)'
            : index === 1
              ? 'linear-gradient(90deg, #C0C0C0 10%, #F5F5F5 25%)'
              : index === 2
                ? 'linear-gradient(90deg, #CD7F32 10%, #F8E9DF 25%)'
                : '#F3F4F6';
        return (
          <div
            key={product.id}
            className={`flex justify-between mb-2.5 py-1.5 px-2.5`}
            style={{ background }}
          >
            <p className="font-semibold text-text-plain">
              {product.title}{' '}
              <span className="ms-2 font-normal text-xs">
                ({product.price} EGP)
              </span>
            </p>
            <p className="text-[14px] font-bold">
              {product._count?.orderItems}{' '}
              <span className="font-medium">Sales</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
