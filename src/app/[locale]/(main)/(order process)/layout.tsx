// app/checkout/layout.tsx
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function CheckoutLayout({
  children,
}: MainLayoutProps) {
  return (
    <main className="py-10 px-4 md:px-10 lg:py-10 lg:px-15 max-w-screen-2xl mx-auto">
      {/* Screens & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-10">
        {/* Main Content (هنا هيتعرض الـ CheckoutScreen) */}
        <div className="lg:col-span-8 w-full">{children}</div>

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
