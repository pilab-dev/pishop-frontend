export function AboutLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-16 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}
