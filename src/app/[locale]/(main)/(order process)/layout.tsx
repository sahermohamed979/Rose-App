import React from 'react';
import { getSuggestedProducts } from '@/features/checkout/apis/suggested-products.service';
import { getCart } from '@/features/cart/apis/cart-service';
import OrderSummary from '@/shared/components/order-summary';
import { SuggestedProductsSlider } from '@/features/checkout/components/suggested-products-slider';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function CheckoutLayout({
  children,
}: MainLayoutProps) {
  // Parallel data fetching
  const [products, cartResult] = await Promise.all([
    getSuggestedProducts(8),
    getCart(),
  ]);
  // calculate subtotal from cart items
  const subtotal =
    cartResult.status && cartResult.payload?.cartItems
      ? cartResult.payload.cartItems.reduce((sum, item) => {
          const price = parseFloat(item.product?.price ?? '0') || 0;
          const qty = item.quantity ?? 1;
          return sum + price * qty;
        }, 0)
      : 0;

  return (
    <main className="py-6 sm:py-10 lg:py-13 px-4 sm:px-8 md:px-12 lg:px-20">
      {/* Main grid: checkout steps (left) + order summary (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-10">
        <div className="col-span-1 lg:col-span-8 w-full">{children}</div>
        {/* Main Content (here CheckoutScreen or CartScreen is rendered) */}

        {/* Order Summary */}
        <div className="col-span-1 lg:col-span-4 w-full">
          <div className="lg:sticky lg:top-24">
            <OrderSummary subtotal={subtotal} />
          </div>
        </div>
      </div>

      {/* Order May Like (Products) */}
      <div className="mt-12 w-full">
        <SuggestedProductsSlider products={products} />
      </div>
    </main>
  );
}
