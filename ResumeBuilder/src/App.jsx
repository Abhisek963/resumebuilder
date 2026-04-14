import React, { Suspense, lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'

import { login, setLoading } from './app/features/authSlice'
import { getUserData } from './services/resumeService'

import ErrorBoundary from './components/ErrorBoundary'
import PageLoader from './components/PageLoader'

// ── Lazy-loaded pages ─────────────────────────────────────────────────────────
const Home = lazy(() => import('./pages/Home'))
const DashBoard = lazy(() => import('./pages/DashBoard'))
const Layout = lazy(() => import('./pages/Layout'))
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'))
const Preview = lazy(() => import('./pages/Preview'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))

const App = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const fetchUser = async () => {
    const token = localStorage.getItem('token')
    try {
      if (token) {
        const { data } = await getUserData(token)
        if (data.user) {
          dispatch(login({ token, user: data.user }))
        }
      }
    } catch (error) {
      // Silently fail — user is simply not logged in / token expired
      console.error('[App] Failed to restore session:', error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Show global spinner while auth is being verified — NOT a blank null render
  if (loading) return <PageLoader />

  return (
    <ErrorBoundary>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(20,18,35,0.97)',
            border: '1px solid rgba(139,92,246,0.3)',
            color: '#e4e4e7',
            fontSize: '0.875rem',
            backdropFilter: 'blur(12px)',
          },
          success: { iconTheme: { primary: '#8b5cf6', secondary: '#0a0914' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#0a0914' } },
        }}
      />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/app" element={<Layout />}>
            <Route index element={<DashBoard />} />
            <Route path="builder/:resumeId" element={<ResumeBuilder />} />
          </Route>

          <Route path="view/:resumeId" element={<Preview />} />
          <Route path="/login" element={<Login />} />

          {/* ── Catch-all: show 404 for any unknown route ── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App