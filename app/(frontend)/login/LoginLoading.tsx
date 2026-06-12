export function LoginLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-4" />
        <div className="h-32 bg-gray-200 rounded w-80" />
      </div>
    </div>
  )
}
