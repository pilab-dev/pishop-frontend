"use client";

const NotFoundComponent = () => {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center">
      <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
        <h1 className="text-6xl text-center font-bold mb-5">⚠️</h1>

        <h2 className="text-xl text-center font-bold">404 - Not found</h2>
        <p className="my-2">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default function NotFoundPage() {
  return <NotFoundComponent />;
}
