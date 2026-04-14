import axios from 'axios'
import { store } from '../app/store'
import { sessionExpired } from '../app/features/authSlice'

/**
 * Hardened Axios instance:
 *  - 15s timeout (prevents Render cold-start hanging)
 *  - Auth token injected via request interceptor
 *  - 401 → auto-dispatch sessionExpired (redirect to login)
 *  - Network/timeout → retry up to 2× with exponential back-off
 */

if (!import.meta.env.VITE_BASE_URL) {
  console.warn(
    '[api.js] VITE_BASE_URL is not set. API calls will fail. ' +
    'Add VITE_BASE_URL to your .env file.'
  )
}

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || '',
  timeout: 15000,
})

// ── Request interceptor: inject auth token ────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token =
      store.getState().auth.token || localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response interceptor ──────────────────────────────────────────────────────
const MAX_RETRIES = 2
const RETRY_DELAY_MS = 1000

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config

    // Handle 401 — session expired or invalid token
    if (error.response?.status === 401) {
      const msg = error.response?.data?.message || ''
      // Only auto-logout on token errors, not on "wrong password" etc.
      if (
        msg.toLowerCase().includes('token') ||
        msg.toLowerCase().includes('session') ||
        msg.toLowerCase().includes('unauthorized')
      ) {
        store.dispatch(sessionExpired())
        // Optionally redirect — use window.location so we don't need router here
        if (!window.location.pathname.startsWith('/login')) {
          window.location.href = '/login'
        }
      }
      return Promise.reject(error)
    }

    // Retry only on network failures / timeouts (no response at all)
    if (
      !config ||
      (config.__retryCount ?? 0) >= MAX_RETRIES ||
      error.response ||               // real HTTP error — don't retry
      axios.isCancel(error)
    ) {
      return Promise.reject(error)
    }

    config.__retryCount = (config.__retryCount ?? 0) + 1
    const delay = RETRY_DELAY_MS * config.__retryCount
    await new Promise((r) => setTimeout(r, delay))
    return api(config)
  }
)

export default api