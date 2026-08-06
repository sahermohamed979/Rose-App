import AddressSkeleton from '@/features/checkout/skeletons/addresses.skeleton';

export default function CheckoutLoading() {
  return (
    <div className="w-full">
      <AddressSkeleton />
    </div>
  );
}
