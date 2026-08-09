// app/checkout/layout.tsx
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function CheckoutLayout({
  children,
}: MainLayoutProps) {
  return (
    <main className="py-13 px-20 ">
      {/* screens */}
      <div className="grid grid-cols-12 gap-x-10">
        <div className="col-span-8 w-full ">{children}</div>
        {/* Main Content (هنا هيتعرض الـ CheckoutScreen) */}

        {/* Order Summary */}
        <div className="lg:col-span-4 w-full">
          <div className="p-6 border border-border-soft rounded-xl text-text-plain bg-bg-muted sticky top-24">
            <p> Summary Component Here</p>
          </div>
        </div>
      </div>

      {/* Order May Like (Products) */}
      <div className="mt-12 w-full">
        <div className="p-6 border border-border-soft rounded-xl text-text-plain bg-bg-muted">
          <p>Products Component Here</p>
        </div>
      </div>
    </main>
  );
}
