export function ContactLoading() {
  return (
    <>
      <div className="max-w-7xl w-full">
        <div className="flex flex-row gap-8 my-10">
          <div className="w-2/3">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-32 mb-4" />
              <div className="h-64 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-32 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-48" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
