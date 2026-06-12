export function SignupLoading() {
  return (
    <div className="flex flex-col items-center justify-center my-5 max-w-xl mx-auto">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-32 mb-4" />
        <div className="h-64 bg-gray-200 rounded w-96" />
      </div>
    </div>
  )
}
