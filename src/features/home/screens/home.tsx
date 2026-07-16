

import { getBestSellingProducts } from '../apis/home-products-actions';

import Bestselling from '../components/best-selling';
import { Suspense } from 'react';


export default async function Home() {

  const bestSellingProducts = await getBestSellingProducts(1, 6, 3);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='container mx-auto'>

        <Bestselling bestSellingProducts={bestSellingProducts} />


      </div>
    </Suspense>

  )
}
