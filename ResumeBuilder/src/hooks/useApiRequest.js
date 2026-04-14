import { useState, useCallback } from 'react'

/**
 * useApiRequest — a thin wrapper for API calls that manages:
 *  - loading state
 *  - error state (human-readable message)
 *  - network-down detection (no error.response → backend unreachable)
 *
 * Usage:
 *   const { loading, error, networkError, execute } = useApiRequest()
 *   await execute(() => resumeService.getAllResumes())
 */
const useApiRequest = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [networkError, setNetworkError] = useState(false)

  const execute = useCallback(async (fn) => {
    setLoading(true)
    setError(null)
    setNetworkError(false)

    try {
      const result = await fn()
      return result
    } catch (err) {
      if (!err.response) {
        // No response → backend is unreachable / timeout / CORS / offline
        setNetworkError(true)
      } else {
        const msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          'Something went wrong.'
        setError(msg)
      }
      throw err // re-throw so callers can also handle if needed
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, error, networkError, execute }
}

export default useApiRequest
