export default function ProfileFormSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="p-4 flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-bg-subtle shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-bg-subtle rounded" />
          <div className="h-3 w-48 bg-bg-subtle rounded" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-bg-subtle rounded" />
          <div className="h-10 w-full bg-bg-subtle rounded-md" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-20 bg-bg-subtle rounded" />
          <div className="h-10 w-full bg-bg-subtle rounded-md" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-20 bg-bg-subtle rounded" />
          <div className="h-10 w-full bg-bg-subtle rounded-md" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-20 bg-bg-subtle rounded" />
          <div className="h-10 w-full bg-bg-subtle rounded-md" />
        </div>

        <div className="flex justify-between pt-2">
          <div className="h-4 w-24 bg-bg-subtle rounded" />
          <div className="h-9 w-28 bg-bg-subtle rounded-md" />
        </div>
      </div>
    </div>
  );
}
