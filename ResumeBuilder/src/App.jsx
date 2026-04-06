import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import DashBoard from './pages/DashBoard'
import Layout from './pages/Layout'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import { useDispatch, useSelector } from 'react-redux'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import { Toaster } from 'react-hot-toast'

const App = () => {

  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.auth)

  const getUserData = async () => {
    const token = localStorage.getItem('token')
    try {
      if (token) {
        const { data } = await api.get('/api/users/data', {
          headers: { Authorization: token }
        })
        if (data.user) {
          dispatch(login({ token, user: data.user }))
        }
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  if (loading) return null

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/app' element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview />} />

        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App