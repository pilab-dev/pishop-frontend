"use client";

import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="my-8 flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto p-8 bg-white shadow-2xl">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 text-center">
            We apologize for the inconvenience. Please try again or contact
            support if the problem persists.
          </p>
          <div className="pt-4">
            <button
              className="px-6 py-2 bg-primary text-white  hover:bg-primary/80 
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => reset()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
