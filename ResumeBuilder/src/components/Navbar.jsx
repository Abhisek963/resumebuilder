import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/features/authSlice";
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { LogOutIcon, UserCircleIcon } from "lucide-react";
=======
import React from "react";
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
<<<<<<< HEAD
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
=======
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b

    const LogoutUser = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
<<<<<<< HEAD
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                .navbar-root { font-family: 'Inter', sans-serif; }

                .nav-link {
                    position: relative;
                    color: rgba(161,161,170,1);
                    font-size: 13px;
                    font-weight: 500;
                    transition: color 0.2s;
                    text-decoration: none;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: linear-gradient(90deg, #818cf8, #a855f7);
                    transition: width 0.25s ease;
                }
                .nav-link:hover { color: white; }
                .nav-link:hover::after { width: 100%; }

                .user-badge {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 5px 12px 5px 8px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(139,92,246,0.2);
                    transition: border-color 0.2s, background 0.2s;
                }
                .user-badge:hover {
                    background: rgba(139,92,246,0.08);
                    border-color: rgba(139,92,246,0.4);
                }

                .logout-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 16px;
                    border-radius: 10px;
                    font-size: 13px;
                    font-weight: 500;
                    color: rgba(161,161,170,1);
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .logout-btn:hover {
                    background: rgba(239,68,68,0.1);
                    border-color: rgba(239,68,68,0.3);
                    color: #f87171;
                }
                .logout-btn:active { transform: scale(0.96); }

                .get-started-btn {
                    display: inline-flex;
                    align-items: center;
                    padding: 8px 18px;
                    border-radius: 10px;
                    font-size: 13px;
                    font-weight: 600;
                    color: white;
                    text-decoration: none;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    box-shadow: 0 0 20px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
                    transition: box-shadow 0.25s, transform 0.2s;
                }
                .get-started-btn:hover {
                    box-shadow: 0 0 32px rgba(99,102,241,0.6), inset 0 1px 0 rgba(255,255,255,0.15);
                    transform: translateY(-1px);
                }
                .get-started-btn:active { transform: scale(0.97); }

                /* Animated bottom border */
                @keyframes shimmerLine {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .nav-border {
                    height: 1px;
                    background: linear-gradient(90deg,
                        transparent 0%,
                        rgba(99,102,241,0.6) 30%,
                        rgba(139,92,246,0.8) 50%,
                        rgba(168,85,247,0.6) 70%,
                        transparent 100%);
                    background-size: 200% 100%;
                    animation: shimmerLine 4s linear infinite;
                    opacity: 0.6;
                }

                /* Avatar ring */
                .avatar-ring {
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #6366f1, #a855f7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 11px;
                    font-weight: 700;
                    color: white;
                    flex-shrink: 0;
                }
            `}</style>

            <div className="navbar-root sticky top-0 z-50"
                style={{
                    background: scrolled
                        ? 'rgba(10,9,20,0.92)'
                        : 'rgba(10,9,20,0.75)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    transition: 'background 0.3s',
                }}>

                <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3 text-white">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group" style={{ textDecoration: 'none' }}>
                        <img src="/Rlogo.png" alt="logo" className="w-auto h-10"
                            style={{ filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.5))', transition: 'filter 0.2s' }}
                            onMouseEnter={e => e.target.style.filter = 'drop-shadow(0 0 14px rgba(139,92,246,0.8))'}
                            onMouseLeave={e => e.target.style.filter = 'drop-shadow(0 0 8px rgba(139,92,246,0.5))'} />
                    </Link>

                    {/* Center nav links (public only) */}
                    {!user && (
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="nav-link">Features</a>
                            <a href="#templates" className="nav-link">Templates</a>
                            <a href="#contact" className="nav-link">Contact</a>
                        </div>
                    )}

                    {/* Right section */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                {/* User badge */}
                                <div className="hidden sm:flex user-badge">
                                    <div className="avatar-ring">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span style={{ fontSize: 13, color: 'rgba(212,212,216,1)', fontWeight: 500 }}>
                                        {user?.name}
                                    </span>
                                </div>

                                {/* Logout */}
                                <button onClick={LogoutUser} className="logout-btn">
                                    <LogOutIcon size={13} />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/app?state=login" className="nav-link" style={{ padding: '8px 4px' }}>
                                    Login
                                </Link>
                                <Link to="/app?state=register" className="get-started-btn">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Animated gradient border */}
                <div className="nav-border" />
            </div>
        </>
=======
        <div className="sticky top-0 z-50 bg-[#0F0D1A]/90 backdrop-blur-md border-b border-violet-500/15">
            <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3.5 text-white">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src="/Rlogo.png" alt="logo" className="w-auto h-11" />
                </Link>

                {/* Center nav links (public only) */}
                {!user && (
                    <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
                        <a href="#features" className="hover:text-white transition">Features</a>
                        <a href="#templates" className="hover:text-white transition">Templates</a>
                        <a href="#contact" className="hover:text-white transition">Contact</a>
                    </div>
                )}

                {/* Right section */}
                <div className="flex items-center gap-4 text-sm">
                    {user ? (
                        <>
                            <p className="hidden sm:block text-zinc-400">
                                Hi, <span className="font-medium text-white">{user?.name}</span>
                            </p>
                            <button
                                onClick={LogoutUser}
                                className="px-5 py-2 rounded-lg border border-zinc-700 bg-zinc-800/50
                  text-zinc-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/40
                  active:scale-95 transition-all duration-200 text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/app?state=login"
                                className="text-zinc-400 hover:text-white transition text-sm"
                            >
                                Login
                            </Link>
                            <Link
                                to="/app?state=register"
                                className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-[0_0_16px_rgba(139,92,246,0.35)] hover:-translate-y-0.5"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b
    );
};

export default Navbar;