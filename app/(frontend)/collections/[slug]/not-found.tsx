"use client";

import { useParams } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { handle } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-30rem)]">
      <h2 className="text-2xl font-bold">Collection {handle} not found!</h2>
      <button
        className="mt-4 bg-primary text-white px-4 py-2 hover:bg-primary/90 active:scale-95 transition-all duration-300"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
