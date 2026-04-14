import React from 'react'
import { WifiOff, RefreshCw } from 'lucide-react'

const NetworkError = ({ onRetry, message }) => {
  const handleRetry = () => {
    if (onRetry) onRetry()
    else window.location.reload()
  }

  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center gap-6 p-8 text-center"
    >
      {/* Icon */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
          border: '1px solid rgba(99,102,241,0.3)',
          boxShadow: '0 0 40px rgba(99,102,241,0.15)',
          animation: 'float-icon 3s ease-in-out infinite',
        }}
      >
        <WifiOff
          className="w-9 h-9"
          style={{ color: '#818cf8', filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.5))' }}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">Connection Failed</h2>
        <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
          {message || "Unable to reach the server. Please check your internet connection and try again."}
        </p>
      </div>

      <button
        onClick={handleRetry}
        className="flex items-center gap-2 px-8 py-3 rounded-xl text-white text-sm font-semibold transition-all active:scale-95 hover:opacity-90"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          boxShadow: '0 0 24px rgba(99,102,241,0.4)',
        }}
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>

      <style>{`
        @keyframes float-icon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}

export default NetworkError
