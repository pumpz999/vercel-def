import React from 'react'

interface LoadingSpinnerProps {
  message?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-900">
      <div className="flex flex-col items-center">
        <div 
          className="w-16 h-16 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        />
        <p className="mt-4 text-white text-lg font-semibold">
          {message}
        </p>
      </div>
    </div>
  )
}

export default LoadingSpinner
