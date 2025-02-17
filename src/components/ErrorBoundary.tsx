import React, { ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { 
      hasError: false 
    }
  }

  static getDerivedStateFromError(error: Error) {
    return { 
      hasError: true,
      error 
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo)
    this.setState({ 
      error, 
      errorInfo 
    })
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false,
      error: undefined,
      errorInfo: undefined 
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
          <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
            <div className="text-center">
              <svg 
                className="mx-auto mb-4 h-16 w-16 text-red-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-600 mb-6">
                We encountered an unexpected error. Please try again.
              </p>
              
              {this.state.error && (
                <details className="bg-gray-100 p-4 rounded-md mb-6 text-left">
                  <summary className="cursor-pointer text-gray-700 font-semibold">
                    Error Details
                  </summary>
                  <pre className="text-xs text-red-700 overflow-x-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
              
              <div className="flex space-x-4 justify-center">
                <button 
                  onClick={this.handleRetry}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Retry
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
