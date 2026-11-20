import { ProductResponse } from '@/shared/lib/types/product-types';

interface TopSellingType {
  data: ProductResponse;
}

export default function LowStock({ data }: TopSellingType) {
  console.log('test', data);

  const productStock = [...data.payload.data].sort(
    (product1, product2) => {
      return product1.stock - product2.stock;
    }
  );

  return (
    <div className="bg-bg-plain p-6 rounded-xl h-110.75 overflow-y-auto scrollbar-hide ">
      <p className="text-2xl text-text-plain font-semibold mb-6 ">
        Low Stock Products
      </p>

      {productStock.map((product, index) => {
        const lowProduct =
          product.stock < 5 ? 'text-text-danger' : 'text-text-plain';

        return (
          <div key={product.id}>
            <div className="flex justify-between mb-2.5 py-1.5 px-2.5">
              <p className="text-text-plain">{product.title}</p>

              <p className={lowProduct}>
                {product.stock} <span>Products</span>
              </p>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
