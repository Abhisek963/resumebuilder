/**
 * Centralized API service layer.
 * All Axios calls live here — components import from this file,
 * not directly from api.js, keeping components clean.
 */
import api from '../configs/api'

// ── Resume CRUD ───────────────────────────────────────────────────────────────

export const getAllResumes = () =>
  api.get('/api/users/resumes')

export const getResume = (id) =>
  api.get(`/api/resumes/get/${id}`)

export const createResume = (title) =>
  api.post('/api/resumes/create', { title })

export const updateResume = (formData) =>
  api.put('/api/resumes/update', formData)

export const deleteResume = (id) =>
  api.delete(`/api/resumes/delete/${id}`)

// ── User ──────────────────────────────────────────────────────────────────────

export const getUserData = (token) =>
  api.get('/api/users/data', { headers: { Authorization: token } })

// ── AI ────────────────────────────────────────────────────────────────────────

export const uploadResumePdf = (title, resumeText) =>
  api.post('/api/ai/upload-resume', { title, resumeText })

export const generateSummary = (payload) =>
  api.post('/api/ai/generate-summary', payload)
