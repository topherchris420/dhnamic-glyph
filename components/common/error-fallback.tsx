"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Card className="w-full max-w-md bg-slate-800/50 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300">
            We encountered an unexpected error. Please try refreshing the page or contact support if the problem
            persists.
          </p>

          {process.env.NODE_ENV === "development" && (
            <details className="bg-slate-700/50 p-3 rounded text-sm">
              <summary className="text-red-300 cursor-pointer">Error Details</summary>
              <pre className="mt-2 text-red-200 whitespace-pre-wrap">{error.message}</pre>
            </details>
          )}

          <Button onClick={resetErrorBoundary} className="w-full bg-purple-600 hover:bg-purple-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
