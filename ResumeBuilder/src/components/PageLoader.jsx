import React from 'react'

/**
 * Full-screen animated spinner used as the Suspense fallback
 * while lazy-loaded pages are being fetched.
 */
const PageLoader = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: '#0a0914' }}
  >
    <div className="flex flex-col items-center gap-5">
      {/* Spinner ring */}
      <div className="relative w-14 h-14">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid rgba(139,92,246,0.15)',
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid transparent',
            borderTopColor: '#8b5cf6',
            borderRightColor: '#6366f1',
            animation: 'page-spin 0.8s linear infinite',
          }}
        />
        {/* Inner glow dot */}
        <div
          className="absolute inset-3 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
            animation: 'page-pulse 1.6s ease-in-out infinite',
          }}
        />
      </div>

      <p
        className="text-sm font-medium"
        style={{ color: 'rgba(139,92,246,0.7)', letterSpacing: '0.05em' }}
      >
        Loading…
      </p>
    </div>

    <style>{`
      @keyframes page-spin {
        to { transform: rotate(360deg); }
      }
      @keyframes page-pulse {
        0%, 100% { opacity: 0.4; transform: scale(0.9); }
        50%       { opacity: 1;   transform: scale(1.1); }
      }
    `}</style>
  </div>
)

export default PageLoader
