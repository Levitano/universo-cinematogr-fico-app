export function MovieCardSkeleton() {
  return (
    <div className="w-full max-w-xs">
      <div className="skeleton h-64 w-full rounded-lg mb-3" />
      <div className="space-y-2">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
      </div>
    </div>
  )
}

export function MovieCarouselSkeleton() {
  return (
    <div className="space-y-4">
      <div className="skeleton h-6 w-48 rounded" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-40">
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="w-full h-96 md:h-screen skeleton rounded-lg mb-8" />
  )
}

export function MovieDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-96 w-full rounded-lg" />
      <div className="space-y-3">
        <div className="skeleton h-8 w-2/3 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
      </div>
    </div>
  )
}
