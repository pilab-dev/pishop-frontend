'use client'

import { ErrorInfo } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import { FallbackProps, ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h1>

        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. An unexpected error occurred.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-xs bg-gray-100 p-3 rounded border overflow-auto max-h-32">
              {error.message}
              {error.stack && (
                <>
                  {'\n\n'}
                  {error.stack}
                </>
              )}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={resetErrorBoundary}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>

          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  )
}

interface AppErrorBoundaryProps {
  children: React.ReactNode
}

export function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo)
    }

    // In production, you could send this to an error reporting service
    // Example: Sentry, LogRocket, etc.
    // logErrorToService(error, errorInfo)
  }

  const handleReset = () => {
    // Optional: Clear any cached data or reset app state
    window.location.reload()
  }

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={handleReset}
    >
      {children}
    </ReactErrorBoundary>
  )
}

// Also export a simpler component for specific sections
export function SectionErrorBoundary({
  children,
  fallback
}: {
  children: React.ReactNode
  fallback?: React.ComponentType<FallbackProps>
}) {
  const SimpleFallback = () => (
    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
      <div className="flex items-center gap-2 text-red-700">
        <AlertTriangle className="h-5 w-5" />
        <span className="font-medium">Something went wrong in this section</span>
      </div>
      <p className="text-red-600 text-sm mt-1">
        Please refresh the page or try again later.
      </p>
    </div>
  )

  return (
    <ReactErrorBoundary FallbackComponent={fallback || SimpleFallback}>
      {children}
    </ReactErrorBoundary>
  )
}
