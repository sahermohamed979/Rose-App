export function EditOccasionSkeleton() {
  return (
    <div className="p-4 sm:p-6 animate-pulse">
      {/* Page header skeleton (title includes occasion name, so wider) */}
      <div className="h-8 bg-bg-muted rounded-md w-64 mb-6"></div>

      <div className="bg-bg-plain rounded-2xl p-6 sm:p-6 w-full">
        {/* Name field skeleton */}
        <div className="mb-5 w-full md:w-3/4">
          <div className="h-4 bg-bg-muted rounded w-16 mb-2"></div>
          <div className="h-10 bg-bg-muted rounded-lg w-full"></div>
        </div>

        {/* View image button skeleton */}
        <div className="mb-8 flex justify-end w-full md:w-3/4">
          <div className="h-9 bg-bg-muted rounded-lg w-full sm:w-40"></div>
        </div>

        {/* Submit button skeleton */}
        <div className="h-11 bg-bg-muted rounded-lg w-full md:w-3/4"></div>
      </div>
    </div>
  );
}
