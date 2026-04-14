import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

const ErrorFallback = ({ error, resetError }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: '#0a0914', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Background orbs */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          style={{
            position: 'absolute', width: 500, height: 500, borderRadius: '50%',
            background: '#ef4444', filter: 'blur(120px)', opacity: 0.06,
            top: -150, left: -150,
          }}
        />
        <div
          style={{
            position: 'absolute', width: 400, height: 400, borderRadius: '50%',
            background: '#6366f1', filter: 'blur(100px)', opacity: 0.06,
            bottom: -100, right: -100,
          }}
        />
      </div>

      <div
        className="relative z-10 w-full max-w-md text-center rounded-2xl p-10"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(239,68,68,0.25)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 80px rgba(239,68,68,0.1)',
        }}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(249,115,22,0.1))',
            border: '1px solid rgba(239,68,68,0.3)',
            boxShadow: '0 0 30px rgba(239,68,68,0.2)',
          }}
        >
          <AlertTriangle
            className="w-8 h-8"
            style={{ color: '#f87171', filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.6))' }}
          />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
        <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
          An unexpected error occurred. Don't worry — your data is safe.
        </p>

        {/* Error details (dev only) */}
        {error && (
          <details className="mb-6 text-left">
            <summary className="text-xs text-zinc-500 cursor-pointer hover:text-zinc-400 transition-colors">
              View error details
            </summary>
            <div
              className="mt-2 p-3 rounded-lg text-xs font-mono text-red-400 overflow-auto max-h-28"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              {error.message}
            </div>
          </details>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(161,161,170,1)',
            }}
          >
            <Home className="w-4 h-4" /> Home
          </button>
          <button
            onClick={resetError || (() => window.location.reload())}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: '0 0 20px rgba(99,102,241,0.4)',
            }}
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback
