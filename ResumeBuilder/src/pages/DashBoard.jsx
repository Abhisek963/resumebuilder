<<<<<<< HEAD
import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon, UploadCloud, LoaderCircleIcon, SparklesIcon, AlertTriangleIcon } from 'lucide-react'
=======
import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon, UploadCloud, LoaderCircleIcon } from 'lucide-react'
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import { toast } from 'react-hot-toast';
import pdfToText from 'react-pdftotext';

const ModalWrapper = ({ onClose, onSubmit, children }) => (
  <form onSubmit={onSubmit} onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
<<<<<<< HEAD
    style={{ background: 'rgba(5,4,14,0.85)', backdropFilter: 'blur(12px)' }}>
    <div onClick={e => e.stopPropagation()}
      className="relative w-full max-w-sm rounded-2xl p-7 shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(139,92,246,0.25)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 0 60px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.08)'
      }}>
=======
    style={{ background: 'rgba(15,13,26,0.75)', backdropFilter: 'blur(6px)' }}>
    <div onClick={e => e.stopPropagation()}
      className="relative w-full max-w-sm rounded-2xl p-7 shadow-2xl"
      style={{ background: 'white', border: '1px solid #e5e7eb' }}>
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
      {children}
    </div>
  </form>
);

const DashBoard = () => {

  const { user } = useSelector((state) => state.auth)

<<<<<<< HEAD
  const cardAccents = [
    { from: '#6366f1', to: '#8b5cf6', glow: 'rgba(99,102,241,0.4)' },
    { from: '#ec4899', to: '#a855f7', glow: 'rgba(236,72,153,0.4)' },
    { from: '#06b6d4', to: '#6366f1', glow: 'rgba(6,182,212,0.4)' },
    { from: '#10b981', to: '#06b6d4', glow: 'rgba(16,185,129,0.4)' },
    { from: '#f59e0b', to: '#ef4444', glow: 'rgba(245,158,11,0.4)' },
    { from: '#f97316', to: '#ec4899', glow: 'rgba(249,115,22,0.4)' },
    { from: '#3b82f6', to: '#6366f1', glow: 'rgba(59,130,246,0.4)' },
    { from: '#8b5cf6', to: '#ec4899', glow: 'rgba(139,92,246,0.4)' },
  ];
=======
  const colors = [
    "#3A86FF", "#8338EC", "#FF006E", "#FB5607",
    "#FFBE0B", "#06D6A0", "#118AB2", "#EF476F",
    "#8AC926", "#6A4C93"
  ]
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResumes, setShowCreateResumes] = useState(false)
  const [showUploadResumes, setShowUploadResumes] = useState(false)
  const [title, setTitle] = useState("")
  const [resume, setResume] = useState(null)
  const [editResume, setEditResume] = useState('')
  const [loading, setLoading] = useState(false)
<<<<<<< HEAD
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
=======
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes');
      setAllResumes(data.resumes);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault()
      const { data } = await api.post('/api/resumes/create', { title })
      setAllResumes([...allResumes, data.resume])
      setTitle("")
      setShowCreateResumes(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const resumeText = await pdfToText(resume)
<<<<<<< HEAD
=======
      // Encode resume text to bypass WAF or proxy filters that block suspicious JSON payloads
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
      const encodedResumeText = encodeURIComponent(resumeText);
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText: encodedResumeText })
      if (data.warning) {
        toast.error(data.warning, { duration: 6000 });
      }
      setTitle("")
      setResume(null)
      setShowUploadResumes(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.response?.data?.error || error.message;
      if (errorMsg && errorMsg.includes("403 status code")) {
        toast.error("AI API Error: Your backend AI API Key is invalid or expired. Please check your Render environment variables.");
      } else {
        toast.error(errorMsg);
      }
    }
    setLoading(false)
  }

  const editTitle = async (e) => {
    try {
      e.preventDefault()
      const { data } = await api.put(`/api/resumes/update/`, { resumeId: editResume, resumeData: { title } })
      setAllResumes(allResumes.map(resume => resume._id === editResume ? { ...resume, title } : resume))
      setTitle("")
      setEditResume('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async (resumeId) => {
    try {
<<<<<<< HEAD
      const { data } = await api.delete(`/api/resumes/delete/${resumeId}`)
      setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
      setDeleteConfirmId(null)
      toast.success(data.message)
    } catch (error) {
      setDeleteConfirmId(null)
=======
      const confirmDelete = window.confirm("Are you sure you want to delete this resume?")
      if (confirmDelete) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`)
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    loadAllResumes();
  }, []);

<<<<<<< HEAD
  const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all placeholder:text-zinc-600 mb-4";
  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(139,92,246,0.25)',
  };

  const timeOfDay = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };
=======
  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-zinc-400 mb-4";
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b

  return (
    <>
      <style>{`
<<<<<<< HEAD
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .dash-root { font-family: 'Inter', sans-serif; }

        /* Animated background orbs */
        .bg-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.12;
          pointer-events: none;
          animation: orbFloat 8s ease-in-out infinite;
        }
        .bg-orb-1 { width: 600px; height: 600px; background: #6366f1; top: -200px; left: -200px; animation-delay: 0s; }
        .bg-orb-2 { width: 500px; height: 500px; background: #a855f7; bottom: -150px; right: -150px; animation-delay: -4s; }
        .bg-orb-3 { width: 350px; height: 350px; background: #06b6d4; top: 40%; left: 50%; transform: translate(-50%,-50%); animation-delay: -2s; }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-20px) scale(1.05); }
          66% { transform: translate(-20px,30px) scale(0.95); }
        }

        /* Resume cards */
        .resume-card {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .resume-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }
        .resume-card:hover { transform: translateY(-8px) scale(1.02); }

        .action-btns { opacity: 0; transition: opacity 0.2s; }
        .resume-card:hover .action-btns { opacity: 1; }

        /* Shimmer on card hover */
        .resume-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 40%;
          height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          pointer-events: none;
          z-index: 2;
        }
        .resume-card:hover::after { left: 130%; }

        /* Count badge */
        .count-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          background: rgba(139,92,246,0.15);
          border: 1px solid rgba(139,92,246,0.3);
          color: #a78bfa;
        }

        /* Fade-up animation */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; opacity: 0; }

        /* Section divider */
        .glow-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(99,102,241,0.5), transparent);
        }

        /* Stat card */
        .stat-card {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 20px 24px;
          backdrop-filter: blur(8px);
          transition: border-color 0.25s, background 0.25s;
        }
        .stat-card:hover {
          background: rgba(255,255,255,0.055);
          border-color: rgba(139,92,246,0.3);
        }

        /* Pulse dot */
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
        .pulse-dot { animation: pulse-dot 2s ease infinite; }

        /* Empty state */
        @keyframes float-icon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .float-icon { animation: float-icon 3s ease-in-out infinite; }

        /* Modal input focus */
        .modal-input:focus {
          border-color: rgba(139,92,246,0.6) !important;
          box-shadow: 0 0 0 3px rgba(139,92,246,0.1);
        }
      `}</style>

      {/* Background */}
      <div className="dash-root min-h-screen relative" style={{ background: '#0a0914' }}>
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">

          {/* ── Hero Header ── */}
          <div className="mb-10 fade-up">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-violet-400 font-medium mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400 pulse-dot inline-block" />
                  {timeOfDay()}, {user?.name} 👋
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
                  My <span style={{
                    background: 'linear-gradient(135deg, #818cf8, #a855f7, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>Resumes</span>
                </h1>
                <p className="text-zinc-500 text-sm mt-2">Create, upload and manage your resumes in one place</p>
              </div>

              {/* Stats */}
              {allResumes.length > 0 && (
                <div className="flex items-center gap-3 mt-1">
                  <div className="stat-card text-center">
                    <p className="text-2xl font-bold text-white">{allResumes.length}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Total Resumes</p>
                  </div>
                  <div className="stat-card text-center">
                    <p className="text-2xl font-bold" style={{
                      background: 'linear-gradient(135deg, #818cf8, #ec4899)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                    }}>
                      {new Date(Math.max(...allResumes.map(r => new Date(r.updatedAt)))).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">Last Updated</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Action Buttons ── */}
          <div className="flex gap-3 mb-10 fade-up" style={{ animationDelay: '80ms' }}>
            <button onClick={() => setShowCreateResumes(true)}
              className="group flex items-center gap-2.5 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-300 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 0 24px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)'
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(99,102,241,0.6), inset 0 1px 0 rgba(255,255,255,0.15)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 24px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)'}>
=======
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        .dash-root { font-family: 'Poppins', sans-serif; }
        .resume-card { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease; }
        .resume-card:hover { transform: translateY(-5px); }
        .action-btns { opacity: 0; transition: opacity 0.2s; }
        .resume-card:hover .action-btns { opacity: 1; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease forwards; }
      `}</style>

      <div className="dash-root min-h-screen bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* Header */}
          <div className="mb-8 fade-up">
            <p className="text-2xl font-semibold text-zinc-800 sm:hidden">
              Welcome, <span className="text-indigo-600">{user?.name}</span>
            </p>
            <h1 className="hidden sm:block text-3xl font-bold text-zinc-800 mb-1">My Resumes</h1>
            <p className="hidden sm:block text-sm text-zinc-400">Create, upload and manage your resumes</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8 fade-up" style={{ animationDelay: '60ms' }}>
            <button onClick={() => setShowCreateResumes(true)}
              className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-white text-sm font-medium shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
              <PlusIcon className="size-4 group-hover:rotate-90 transition-transform duration-300" />
              Create Resume
            </button>
            <button onClick={() => setShowUploadResumes(true)}
<<<<<<< HEAD
              className="group flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(139,92,246,0.3)',
                color: '#c4b5fd',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(139,92,246,0.1)';
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(139,92,246,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)';
                e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.05)';
              }}>
=======
              className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-white text-sm font-medium shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
              <UploadCloudIcon className="size-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
              Upload Resume
            </button>
          </div>

<<<<<<< HEAD
          <div className="glow-divider mb-10" />

          {/* Section label */}
          {allResumes.length > 0 && (
            <div className="flex items-center gap-3 mb-6 fade-up" style={{ animationDelay: '120ms' }}>
              <span className="count-badge">
                <SparklesIcon className="size-3" />
                {allResumes.length} {allResumes.length === 1 ? 'Resume' : 'Resumes'}
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
          )}

          {/* ── Resume Grid ── */}
          {allResumes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center fade-up">
              <div className="float-icon mb-6" style={{
                width: 80, height: 80, borderRadius: 24,
                background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
                border: '1px solid rgba(139,92,246,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 40px rgba(99,102,241,0.2)'
              }}>
                <FilePenLineIcon className="size-9 text-violet-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">No resumes yet</h3>
              <p className="text-zinc-600 text-sm mb-8 max-w-xs">
                Create your first resume or upload an existing PDF to get started.
              </p>
              <button onClick={() => setShowCreateResumes(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 0 24px rgba(99,102,241,0.4)'
                }}>
                <PlusIcon className="size-4" /> Create your first resume
              </button>
=======
          <div className="h-px bg-zinc-200 mb-8" />

          {/* Resume Grid */}
          {allResumes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center fade-up">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
                <FilePenLineIcon className="size-7 text-indigo-400" />
              </div>
              <p className="text-zinc-500 text-sm">No resumes yet. Create your first one!</p>
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {allResumes.map((resume, index) => {
<<<<<<< HEAD
                const accent = cardAccents[index % cardAccents.length];
                return (
                  <div key={resume._id}
                    onClick={() => navigate(`/app/builder/${resume._id}`)}
                    className="resume-card fade-up cursor-pointer rounded-2xl p-5 h-48 flex flex-col items-center justify-center"
                    style={{
                      background: `linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))`,
                      border: `1px solid rgba(255,255,255,0.07)`,
                      animationDelay: `${120 + index * 60}ms`,
                      boxShadow: `0 4px 24px rgba(0,0,0,0.3)`
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `rgba(${accent.glow.match(/[\d.]+/g).join(',')})`.replace(/,(\d+\.\d+)\)/, ',0.5)');
                      e.currentTarget.style.boxShadow = `0 8px 48px rgba(0,0,0,0.4), 0 0 30px ${accent.glow.replace('0.4', '0.25')}`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
                    }}>

                    {/* Icon */}
                    <div className="mb-3 rounded-xl flex items-center justify-center" style={{
                      width: 46, height: 46,
                      background: `linear-gradient(135deg, ${accent.from}25, ${accent.to}25)`,
                      border: `1px solid ${accent.from}40`,
                      boxShadow: `0 0 16px ${accent.glow.replace('0.4', '0.2')}`
                    }}>
                      <FilePenLineIcon className="size-5" style={{
                        color: accent.from,
                        filter: `drop-shadow(0 0 6px ${accent.from}80)`
                      }} />
                    </div>

                    {/* Title */}
                    <p className="text-xs font-semibold text-center leading-snug px-1 line-clamp-2 mb-auto" style={{
                      background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>{resume.title}</p>

                    {/* Date */}
                    <p className="text-[9px] font-medium mt-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {new Date(resume.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>

                    {/* Action buttons */}
                    <div onClick={e => e.stopPropagation()}
                      className="action-btns absolute top-2.5 right-2.5 flex items-center gap-0.5 rounded-lg overflow-hidden"
                      style={{
                        background: 'rgba(10,9,20,0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}>
                      <button onClick={() => { setEditResume(resume._id); setTitle(resume.title) }}
                        className="p-1.5 hover:bg-white/10 transition-colors rounded-l-lg" title="Rename">
                        <PencilIcon className="size-3 text-zinc-400 hover:text-white" />
                      </button>
                      <button onClick={() => setDeleteConfirmId(resume._id)}
                        className="p-1.5 hover:bg-red-500/20 transition-colors rounded-r-lg" title="Delete">
=======
                const color = colors[index % colors.length];
                return (
                  <div key={index} onClick={() => navigate(`/app/builder/${resume._id}`)}
                    className="resume-card fade-up relative flex flex-col items-center justify-center rounded-2xl p-4 h-44 border text-left cursor-pointer group"
                    style={{ background: `linear-gradient(145deg, ${color}12, ${color}30)`, borderColor: color + '35', animationDelay: `${index * 60}ms` }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: color + '20' }}>
                      <FilePenLineIcon className="size-5" style={{ color }} />
                    </div>
                    <p className="text-xs font-semibold text-center leading-snug px-1 line-clamp-2" style={{ color }}>{resume.title}</p>
                    <p className="absolute bottom-2.5 text-[9px] font-medium" style={{ color: color + 'bb' }}>
                      {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                    <div onClick={e => e.stopPropagation()}
                      className="action-btns absolute top-2 right-2 flex items-center gap-0.5 rounded-lg overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}>
                      <button onClick={() => { setEditResume(resume._id); setTitle(resume.title) }}
                        className="p-1.5 hover:bg-white transition-colors rounded-l-lg" title="Rename">
                        <PencilIcon className="size-3 text-zinc-600" />
                      </button>
                      <button onClick={() => deleteResume(resume._id)}
                        className="p-1.5 hover:bg-red-50 transition-colors rounded-r-lg" title="Delete">
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
                        <TrashIcon className="size-3 text-red-500" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Create Resume Modal ── */}
        {showCreateResumes && (
          <ModalWrapper onClose={() => setShowCreateResumes(false)} onSubmit={createResume}>
            <button type="button" onClick={() => { setShowCreateResumes(false); setTitle("") }}
<<<<<<< HEAD
              className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <XIcon className="size-4 text-zinc-400" />
            </button>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
              border: '1px solid rgba(99,102,241,0.4)',
              boxShadow: '0 0 20px rgba(99,102,241,0.2)'
            }}>
              <PlusIcon className="size-5" style={{ color: '#818cf8' }} />
            </div>
            <h2 className="text-lg font-semibold text-white mb-1">Create New Resume</h2>
            <p className="text-xs text-zinc-500 mb-5">Give your resume a title to get started</p>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text"
              placeholder="e.g. Software Engineer Resume"
              className={`${inputClass} modal-input`} style={inputStyle} required />
            <button className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
=======
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-zinc-100 transition-colors">
              <XIcon className="size-4 text-zinc-400" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
              <PlusIcon className="size-5 text-indigo-600" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-800 mb-1">Create New Resume</h2>
            <p className="text-xs text-zinc-400 mb-5">Give your resume a title to get started</p>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text"
              placeholder="e.g. Software Engineer Resume" className={inputClass} required />
            <button className="w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
              Create Resume
            </button>
          </ModalWrapper>
        )}

        {/* ── Upload Resume Modal ── */}
        {showUploadResumes && (
          <ModalWrapper onClose={() => setShowUploadResumes(false)} onSubmit={uploadResume}>
            <button type="button" onClick={() => { setShowUploadResumes(false); setTitle("") }}
<<<<<<< HEAD
              className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <XIcon className="size-4 text-zinc-400" />
            </button>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.2))',
              border: '1px solid rgba(139,92,246,0.4)',
              boxShadow: '0 0 20px rgba(139,92,246,0.2)'
            }}>
              <UploadCloud className="size-5" style={{ color: '#c084fc' }} />
            </div>
            <h2 className="text-lg font-semibold text-white mb-1">Upload Resume</h2>
            <p className="text-xs text-zinc-500 mb-5">We'll parse your PDF and prefill the builder</p>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text"
              placeholder="e.g. My Uploaded Resume"
              className={`${inputClass} modal-input`} style={inputStyle} required />
            <label htmlFor="resume-upload" className="block cursor-pointer mb-4">
              <div className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-8 transition-all ${resume ? 'border-violet-500/60 bg-violet-500/10' : 'border-white/10 hover:border-violet-500/40 hover:bg-violet-500/5'}`}>
                {resume ? (
                  <><UploadCloud className="size-8 text-violet-400" /><p className="text-xs font-medium text-violet-300">{resume.name}</p></>
                ) : (
                  <><UploadCloud className="size-8 text-zinc-600" /><p className="text-xs text-zinc-500">Click to upload your PDF resume</p><p className="text-[10px] text-zinc-700">PDF only</p></>
=======
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-zinc-100 transition-colors">
              <XIcon className="size-4 text-zinc-400" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-4">
              <UploadCloud className="size-5 text-violet-600" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-800 mb-1">Upload Resume</h2>
            <p className="text-xs text-zinc-400 mb-5">We'll parse your PDF and prefill the builder</p>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text"
              placeholder="e.g. My Uploaded Resume" className={inputClass} required />
            <label htmlFor="resume-upload" className="block cursor-pointer mb-4">
              <div className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-8 transition-colors ${resume ? 'border-violet-400 bg-violet-50' : 'border-zinc-200 hover:border-violet-300 hover:bg-violet-50/50'}`}>
                {resume ? (
                  <><UploadCloud className="size-8 text-violet-500" /><p className="text-xs font-medium text-violet-600">{resume.name}</p></>
                ) : (
                  <><UploadCloud className="size-8 text-zinc-300" /><p className="text-xs text-zinc-400">Click to upload your PDF resume</p><p className="text-[10px] text-zinc-300">PDF supported</p></>
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
                )}
              </div>
            </label>
            <input type="file" id="resume-upload" accept=".pdf" hidden onChange={(e) => setResume(e.target.files[0])} />
            <button disabled={loading}
<<<<<<< HEAD
              className="w-full py-3 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', boxShadow: '0 0 20px rgba(139,92,246,0.4)' }}>
=======
              className="w-full py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95 disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
              {loading && <LoaderCircleIcon className="animate-spin size-4" />}
              {loading ? "Uploading..." : "Upload Resume"}
            </button>
          </ModalWrapper>
        )}

        {/* ── Edit Title Modal ── */}
        {editResume && (
          <ModalWrapper onClose={() => setEditResume('')} onSubmit={editTitle}>
            <button type="button" onClick={() => { setEditResume(''); setTitle("") }}
<<<<<<< HEAD
              className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <XIcon className="size-4 text-zinc-400" />
            </button>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}>
              <PencilIcon className="size-5 text-zinc-300" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-1">Rename Resume</h2>
            <p className="text-xs text-zinc-500 mb-5">Update the title of your resume</p>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text"
              placeholder="Enter new title"
              className={`${inputClass} modal-input`} style={inputStyle} required />
            <button className="px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
=======
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-zinc-100 transition-colors">
              <XIcon className="size-4 text-zinc-400" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center mb-4">
              <PencilIcon className="size-5 text-zinc-600" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-800 mb-1">Rename Resume</h2>
            <p className="text-xs text-zinc-400 mb-5">Update the title of your resume</p>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text"
              placeholder="Enter new title" className={inputClass} required />
            <button className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
              Update Title
            </button>
          </ModalWrapper>
        )}
<<<<<<< HEAD
        {/* ── Delete Confirm Modal ── */}
        {deleteConfirmId && (() => {
          const target = allResumes.find(r => r._id === deleteConfirmId);
          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: 'rgba(5,4,14,0.88)', backdropFilter: 'blur(14px)' }}
              onClick={() => setDeleteConfirmId(null)}>
              <div onClick={e => e.stopPropagation()}
                className="relative w-full max-w-xs rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, rgba(20,8,8,0.95) 0%, rgba(15,6,6,0.98) 100%)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  boxShadow: '0 0 80px rgba(239,68,68,0.2), 0 0 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}>

                {/* Red top accent bar */}
                <div style={{
                  height: 3,
                  background: 'linear-gradient(90deg, transparent, #ef4444, #f97316, transparent)'
                }} />

                <div className="p-7">
                  {/* Icon */}
                  <div className="flex justify-center mb-5">
                    <div style={{
                      width: 60, height: 60, borderRadius: 18,
                      background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(249,115,22,0.1))',
                      border: '1px solid rgba(239,68,68,0.3)',
                      boxShadow: '0 0 30px rgba(239,68,68,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <AlertTriangleIcon className="size-7" style={{
                        color: '#f87171',
                        filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.6))'
                      }} />
                    </div>
                  </div>

                  {/* Text */}
                  <h2 className="text-white text-lg font-bold text-center mb-1">Delete Resume?</h2>
                  <p className="text-zinc-500 text-xs text-center mb-1">This will permanently remove</p>
                  <p className="text-center mb-6" style={{
                    fontSize: 13, fontWeight: 600,
                    background: 'linear-gradient(135deg, #f87171, #fb923c)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                  }}>
                    &ldquo;{target?.title}&rdquo;
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(161,161,170,1)'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}>
                      Cancel
                    </button>
                    <button
                      onClick={() => deleteResume(deleteConfirmId)}
                      className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                        boxShadow: '0 0 20px rgba(239,68,68,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 32px rgba(239,68,68,0.6), inset 0 1px 0 rgba(255,255,255,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(239,68,68,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'; }}>
                      <TrashIcon className="size-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
=======
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
      </div>
    </>
  )
}

export default DashBoard