import React from 'react'
import ErrorFallback from './ui/ErrorFallback'

/**
 * Global React Error Boundary.
 * Catches render-time errors in child component tree and shows
 * a user-friendly fallback UI instead of a blank crash.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
    this.resetError = this.resetError.bind(this)
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // In production you'd send this to Sentry / LogRocket etc.
    console.error('[ErrorBoundary] Caught error:', error, info)
  }

  resetError() {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          resetError={this.resetError}
        />
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
