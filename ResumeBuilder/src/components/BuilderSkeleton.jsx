import React from 'react'
import Skeleton from './ui/Skeleton'

/**
 * Skeleton that mirrors the two-column ResumeBuilder layout
 * while resume data is being fetched from the API.
 */
const BuilderSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Back-link bar */}
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Skeleton className="h-4 w-36" />
    </div>

    <div className="max-w-7xl mx-auto px-4 pb-8">
      <div className="grid lg:grid-cols-12 gap-8">

        {/* ── Left: Form panel ── */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-5">
            {/* Top toolbar row */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-200">
              <Skeleton className="h-8 w-24 bg-gray-200" />
              <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
              <Skeleton className="h-8 w-20 bg-gray-200" />
              <Skeleton className="h-8 w-20 bg-gray-200" />
              <Skeleton className="h-8 w-24 bg-gray-200" />
            </div>

            {/* Section breadcrumb dots */}
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-20 bg-gray-200 rounded-md" />
              ))}
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              <div className="space-y-1">
                <Skeleton className="h-3 w-24 bg-gray-200" />
                <Skeleton className="h-10 w-full bg-gray-200 rounded-md" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-3 w-20 bg-gray-200" />
                <Skeleton className="h-10 w-full bg-gray-200 rounded-md" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-16 bg-gray-200" />
                  <Skeleton className="h-10 w-full bg-gray-200 rounded-md" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-16 bg-gray-200" />
                  <Skeleton className="h-10 w-full bg-gray-200 rounded-md" />
                </div>
              </div>
              <div className="space-y-1">
                <Skeleton className="h-3 w-28 bg-gray-200" />
                <Skeleton className="h-24 w-full bg-gray-200 rounded-md" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-3 w-20 bg-gray-200" />
                <Skeleton className="h-10 w-full bg-gray-200 rounded-md" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-3 w-24 bg-gray-200" />
                <Skeleton className="h-10 w-full bg-gray-200 rounded-md" />
              </div>
            </div>

            {/* Save button */}
            <Skeleton className="h-9 w-32 bg-gray-200 rounded-md mt-2" />
          </div>
        </div>

        {/* ── Right: Preview panel ── */}
        <div className="lg:col-span-7">
          {/* A4-ratio preview placeholder */}
          <div
            className="bg-white rounded-lg shadow-sm overflow-hidden"
            style={{ aspectRatio: '1 / 1.414' }}
          >
            <div className="h-full flex flex-col p-8 gap-4">
              {/* Header section */}
              <div className="flex flex-col items-center gap-2 pb-4 border-b border-gray-100">
                <Skeleton className="h-6 w-48 bg-gray-200" />
                <Skeleton className="h-3 w-32 bg-gray-200" />
                <div className="flex gap-3 mt-1">
                  <Skeleton className="h-3 w-24 bg-gray-200" />
                  <Skeleton className="h-3 w-24 bg-gray-200" />
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-28 bg-gray-200" />
                <Skeleton className="h-2 w-full bg-gray-200" />
                <Skeleton className="h-2 w-5/6 bg-gray-200" />
                <Skeleton className="h-2 w-4/5 bg-gray-200" />
              </div>

              {/* Experience */}
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-24 bg-gray-200" />
                {[1, 2].map(i => (
                  <div key={i} className="space-y-1 pl-2">
                    <Skeleton className="h-2.5 w-40 bg-gray-200" />
                    <Skeleton className="h-2 w-28 bg-gray-200" />
                    <Skeleton className="h-2 w-full bg-gray-200" />
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-20 bg-gray-200" />
                <div className="space-y-1 pl-2">
                  <Skeleton className="h-2.5 w-36 bg-gray-200" />
                  <Skeleton className="h-2 w-24 bg-gray-200" />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-16 bg-gray-200" />
                <div className="flex flex-wrap gap-2">
                  {[60, 80, 50, 70, 55, 75].map((w, i) => (
                    <Skeleton key={i} className={`h-5 rounded-full bg-gray-200`} style={{ width: w }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
)

export default BuilderSkeleton
