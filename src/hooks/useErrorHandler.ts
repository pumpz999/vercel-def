import { useState } from 'react'

interface ErrorHandler {
  error: string | null
  setError: (message: string | null) => void
  clearError: () => void
}

const useErrorHandler = (): ErrorHandler => {
  const [error, setErrorState] = useState<string | null>(null)

  const setError = (message: string | null) => {
    setErrorState(message)
  }

  const clearError = () => {
    setErrorState(null)
  }

  return { error, setError, clearError }
}
