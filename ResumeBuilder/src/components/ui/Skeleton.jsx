import React from 'react'

/**
 * Reusable skeleton shimmer — dark glassmorphism style.
 * Pass `className` to control width/height/border-radius.
 */
const Skeleton = ({ className = '' }) => (
  <div
    className={`relative overflow-hidden rounded-lg ${className}`}
    style={{ background: 'rgba(255,255,255,0.06)' }}
  >
    <div
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)',
        animation: 'skeleton-shimmer 1.6s infinite',
        backgroundSize: '200% 100%',
      }}
    />
    <style>{`
      @keyframes skeleton-shimmer {
        0%   { background-position: -200% 0; }
        100% { background-position:  200% 0; }
      }
    `}</style>
  </div>
)

export default Skeleton
