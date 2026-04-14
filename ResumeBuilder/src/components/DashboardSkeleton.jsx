import React from 'react'
import Skeleton from './ui/Skeleton'

/**
 * Skeleton that exactly mirrors the DashBoard layout
 * while resumes are being fetched from the API.
 */
const DashboardSkeleton = () => (
  <div
    className="min-h-screen relative"
    style={{ background: '#0a0914', fontFamily: 'Inter, sans-serif' }}
  >
    {/* Background orbs (same as DashBoard) */}
    <div
      style={{
        position: 'fixed', width: 600, height: 600, borderRadius: '50%',
        background: '#6366f1', filter: 'blur(80px)', opacity: 0.08,
        top: -200, left: -200, pointerEvents: 'none',
      }}
    />
    <div
      style={{
        position: 'fixed', width: 500, height: 500, borderRadius: '50%',
        background: '#a855f7', filter: 'blur(80px)', opacity: 0.08,
        bottom: -150, right: -150, pointerEvents: 'none',
      }}
    />

    <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">

      {/* ── Header ── */}
      <div className="mb-10 flex items-start justify-between flex-wrap gap-4">
        <div className="space-y-3">
          <Skeleton className="h-4 w-36" style={{ borderRadius: 999 }} />
          <Skeleton className="h-10 w-56" />
          <Skeleton className="h-3 w-64" />
        </div>
        {/* Stats */}
        <div className="flex gap-3">
          <Skeleton className="h-16 w-24 rounded-2xl" />
          <Skeleton className="h-16 w-24 rounded-2xl" />
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className="flex gap-3 mb-10">
        <Skeleton className="h-11 w-36 rounded-xl" />
        <Skeleton className="h-11 w-36 rounded-xl" />
      </div>

      {/* Divider */}
      <div
        className="mb-10"
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)',
        }}
      />

      {/* ── Section label ── */}
      <div className="flex items-center gap-3 mb-6">
        <Skeleton className="h-6 w-28" style={{ borderRadius: 999 }} />
        <div className="flex-1" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* ── Resume card grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 h-48 flex flex-col items-center justify-center gap-3"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              animationDelay: `${i * 60}ms`,
            }}
          >
            <Skeleton className="w-11 h-11 rounded-xl" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2 w-16" />
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default DashboardSkeleton
