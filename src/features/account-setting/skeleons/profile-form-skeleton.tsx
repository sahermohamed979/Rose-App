export default function ProfileFormSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      {/* Photo section */}
      <div className="p-4 flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-bg-muted shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-bg-muted rounded" />
          <div className="h-3 w-48 bg-bg-muted rounded" />
        </div>
      </div>

      {/* Fields section */}
      <div className="p-4 space-y-4">
        <div className="flex flex-row gap-4">
          <div className="flex-1 space-y-2">
            <div className="h-3 w-20 bg-bg-muted rounded" />
            <div className="h-10 w-full bg-bg-muted rounded-md" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-3 w-20 bg-bg-muted rounded" />
            <div className="h-10 w-full bg-bg-muted rounded-md" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-3 w-20 bg-bg-muted rounded" />
          <div className="h-10 w-full bg-bg-muted rounded-md" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-20 bg-bg-muted rounded" />
          <div className="h-10 w-full bg-bg-muted rounded-md" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-20 bg-bg-muted rounded" />
          <div className="h-10 w-full bg-bg-muted rounded-md" />
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="h-4 w-24 bg-bg-muted rounded" />
          <div className="h-10 w-28 bg-bg-muted rounded-md" />
        </div>
      </div>
    </div>
  );
}
