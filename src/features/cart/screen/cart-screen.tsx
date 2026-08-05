import { BrushCleaning } from 'lucide-react';
import CartCard from '../components/cart-card';

export default function CartScreen() {
  return (
    <main className="py-15 px-20 grid grid-cols-12 gap-x-10">
      {/* order summary */}
      <div className="col-span-8 w-full ">
        {/* cart header */}
        <div className="flex flex-row items-center justify-between ">
          <h2 className="text-5xl font-bold text-text-plain">
            Cart
            <span className="text-base font-medium text-text-muted  ms-2.5">
              6 products
            </span>
          </h2>
          <button className="flex items-center justify-center gap-2 text-base font-semibold text-text-primary">
            <span>
              <BrushCleaning size={20} />
            </span>
            Clear Cart{' '}
          </button>
        </div>
        {/* order card */}
        <div className="border border-border-muted p-4 rounded-2xl mt-4">
          <CartCard />
        </div>
        {/* <div className=" w-full grid grid-cols-12 py-2 px-2 gap-2">
          <div className="col-span-2">
            <div className="  w-full ">
              <Image
                className="w-full h-full object-contain "
                src={cartImage}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col  justify-center col-span-10 ">
            <div className="flex flex-row items-center justify-between w-full">
              <h3>hello</h3>
              <Button>Remove</Button>
            </div>
            <div className="w-full">
              {' '}
              (×1) 199.50 EGP <span>color red</span>
              <span>size large</span>
              <span>100 g</span>
            </div>
          </div>
        </div> */}
      </div>
      {/* cart items */}
      <div className="col-span-4 w-full bg-blue-600">saher</div>
    </main>
  );
}
