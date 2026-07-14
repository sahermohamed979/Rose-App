export default function SkeletonsResetPassword() {
  return (
    <div className="max-w-lg w-full space-y-6">
      {/* Form Fields skeleton */}
      <div className="space-y-4">
        {/* New Password input */}
        <div className="space-y-2 mt-6">
          <div className="h-4 bg-bg-soft rounded-md w-1/4 animate-pulse" />
          <div className="h-11 bg-bg-soft rounded-lg w-full animate-pulse" />
        </div>

        {/* Confirm Password input */}
        <div className="space-y-2">
          <div className="h-4 bg-bg-soft rounded-md w-1/3 animate-pulse" />
          <div className="h-11 bg-bg-soft rounded-lg w-full animate-pulse" />
        </div>

        {/* Submit button */}
        <div className="h-11 bg-bg-soft rounded-[16px_14px] w-full mt-8.5 animate-pulse" />
      </div>
    </div>
  );
}
