import OrderSkeleton from '@/features/orders/skeltons/order-skeleton';

export default function OrdersLoading() {
  return (
    <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-4 w-12 rounded bg-bg-muted" />
        <div className="h-4 w-2 rounded bg-bg-muted" />
        <div className="h-4 w-20 rounded bg-bg-muted" />
      </div>

      {/* Header Banner skeleton */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8 pb-6 border-b border-border-muted/60">
        <div className="space-y-2.5">
          <div className="h-6 w-20 rounded-full bg-bg-muted" />
          <div className="h-9 sm:h-10 w-44 rounded-xl bg-bg-muted" />
          <div className="h-4 w-72 rounded bg-bg-muted" />
        </div>

        <div className="h-8 w-24 rounded-2xl bg-bg-muted" />
      </div>

      {/* Cards skeleton */}
      <OrderSkeleton />
    </div>
  );
}
