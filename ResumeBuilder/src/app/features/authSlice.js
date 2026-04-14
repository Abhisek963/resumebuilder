import { createSlice } from '@reduxjs/toolkit'

/**
 * Auth slice.
 *
 * Storage strategy:
 *  - token → localStorage (persists across refresh; cleared on logout)
 *  - user  → localStorage (for name/email display; cleared on logout)
 *  - password → NEVER stored anywhere
 *  - remember_email → stored separately under 'rb_remember_email' only when
 *                     "Remember Me" is ticked on the Login page
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    user: (() => {
      try {
        const raw = localStorage.getItem('user')
        return raw ? JSON.parse(raw) : null
      } catch {
        // Corrupted localStorage — treat as logged out
        localStorage.removeItem('user')
        return null
      }
    })(),
    loading: true,
  },
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload
      state.token = token
      state.user  = user
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    logout: (state) => {
      state.token   = null
      state.user    = null
      state.loading = false
      // Clear all auth-related storage — but preserve rb_remember_email if set
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    },

    // Called when the server returns 401 "Session expired"
    sessionExpired: (state) => {
      state.token   = null
      state.user    = null
      state.loading = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

export const { login, logout, setLoading, sessionExpired } = authSlice.actions
export default authSlice.reducer