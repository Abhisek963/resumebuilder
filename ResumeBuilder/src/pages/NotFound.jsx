import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, LayoutDashboard, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = '404 — Page Not Found'
    return () => { document.title = 'Resume Builder' }
  }, [])

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: '#0a0914', fontFamily: 'Inter, sans-serif' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        /* Background orbs */
        .nf-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          opacity: 0.09;
          animation: nf-drift 10s ease-in-out infinite;
        }
        @keyframes nf-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(30px, -20px) scale(1.08); }
        }

        /* 404 glitch shimmer */
        @keyframes nf-gradient-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .nf-404 {
          background: linear-gradient(270deg, #818cf8, #a855f7, #ec4899, #6366f1, #818cf8);
          background-size: 400% 400%;
          animation: nf-gradient-shift 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Float icon */
        @keyframes nf-float {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50%       { transform: translateY(-16px) rotate(3deg); }
        }
        .nf-icon { animation: nf-float 4s ease-in-out infinite; }

        /* Particles */
        .nf-particle {
          position: absolute;
          border-radius: 50%;
          animation: nf-particle-float linear infinite;
          pointer-events: none;
        }
        @keyframes nf-particle-float {
          0%   { transform: translateY(100vh) opacity(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-100px); opacity: 0; }
        }

        /* Button hover glow */
        .nf-btn-primary:hover { box-shadow: 0 0 40px rgba(99,102,241,0.6) !important; }
        .nf-btn-secondary:hover { background: rgba(255,255,255,0.08) !important; }

        /* Card container */
        .nf-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(139,92,246,0.2);
          backdrop-filter: blur(24px);
          box-shadow: 0 0 80px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.05);
        }
      `}</style>

      {/* Orbs */}
      <div className="nf-orb" style={{ width: 600, height: 600, background: '#6366f1', top: -200, left: -200 }} />
      <div className="nf-orb" style={{ width: 500, height: 500, background: '#a855f7', bottom: -150, right: -150, animationDelay: '-5s' }} />
      <div className="nf-orb" style={{ width: 300, height: 300, background: '#06b6d4', top: '50%', left: '60%', animationDelay: '-2.5s' }} />

      {/* Floating particles */}
      {[
        { size: 4, left: '15%', delay: '0s', duration: '8s', color: '#6366f1' },
        { size: 3, left: '35%', delay: '2s', duration: '11s', color: '#a855f7' },
        { size: 5, left: '55%', delay: '4s', duration: '9s', color: '#ec4899' },
        { size: 3, left: '75%', delay: '1s', duration: '13s', color: '#06b6d4' },
        { size: 4, left: '85%', delay: '3s', duration: '10s', color: '#8b5cf6' },
      ].map((p, i) => (
        <div
          key={i}
          className="nf-particle"
          style={{
            width: p.size, height: p.size,
            left: p.left, bottom: 0,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Main card */}
      <div className="nf-card relative z-10 w-full max-w-lg rounded-3xl p-10 text-center">

        {/* Floating emoji illustration */}
        <div className="nf-icon text-6xl mb-6 select-none">🗺️</div>

        {/* 404 number */}
        <div
          className="nf-404 font-black mb-2 select-none leading-none"
          style={{ fontSize: 'clamp(5rem, 20vw, 9rem)' }}
        >
          404
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        {/* Divider */}
        <div
          className="mb-8 mx-auto w-24"
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }}
        />

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="nf-btn-secondary flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(139,92,246,0.25)',
              color: '#c4b5fd',
            }}
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>

          <Link
            to="/app"
            className="nf-btn-primary flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: '0 0 24px rgba(99,102,241,0.4)',
            }}
          >
            <LayoutDashboard className="w-4 h-4" />
            Open Dashboard
          </Link>
        </div>

        {/* Back shortcut */}
        <button
          onClick={() => navigate(-1)}
          className="mt-5 flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors mx-auto"
        >
          <ArrowLeft className="w-3 h-3" /> Go back to previous page
        </button>
      </div>
    </div>
  )
}

export default NotFound
