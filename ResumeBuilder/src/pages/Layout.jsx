import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import PageLoader from '../components/PageLoader'

/**
 * Protected layout wrapper.
 * - Shows spinner while auth state is being restored (page refresh).
 * - Redirects unauthenticated users to /login, preserving the intended URL
 *   so they can be redirected back after logging in.
 */
const Layout = () => {
  const { token, loading } = useSelector((state) => state.auth)
  const location = useLocation()

  if (loading) return <PageLoader />

  if (!token) {
    // Pass the current location so Login can redirect back after auth
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout