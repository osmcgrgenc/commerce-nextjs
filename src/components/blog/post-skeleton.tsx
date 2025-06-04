export function PostSkeleton() {
  return (
    <div className="group relative">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-200">
        <div className="h-full w-full animate-pulse bg-gray-300" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
} 