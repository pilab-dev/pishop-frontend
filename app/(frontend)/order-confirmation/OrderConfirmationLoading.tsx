export function OrderConfirmationLoading() {
  return (
    <>
      <div className="container mx-auto p-4 text-center">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-6" />
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto mb-4" />
          <div className="h-6 bg-gray-200 rounded w-80 mx-auto mb-8" />
          <div className="h-12 bg-gray-200 rounded w-48 mx-auto" />
        </div>
      </div>
    </>
  )
}
