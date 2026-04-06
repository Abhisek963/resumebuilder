import React from "react";
import { Lock, Mail, User2, ArrowLeft, KeyRound, ShieldCheck } from "lucide-react";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = React.useState(urlState || "login");
  const [formData, setFormData] = React.useState({ name: "", email: "", password: "" });

  // Forgot password states
  const [forgotStep, setForgotStep] = React.useState(null); // null | "email" | "otp"
  const [forgotEmail, setForgotEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [forgotLoading, setForgotLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/${state}`, formData);
      dispatch(login(data));
      localStorage.setItem("token", data.token);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendResetOtp = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    try {
      const { data } = await api.post("/api/users/forgot-password", { email: forgotEmail });
      toast.success(data.message || "OTP sent to your email!");
      setForgotStep("otp");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setForgotLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    try {
      const { data } = await api.post("/api/users/reset-password", {
        email: forgotEmail,
        otp,
        newPassword,
      });
      toast.success(data.message || "Password reset successfully!");
      setForgotStep(null);
      setForgotEmail("");
      setOtp("");
      setNewPassword("");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        .login-root * { font-family: 'Poppins', sans-serif; }

        .login-bg {
          min-height: 100vh;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(135,79,248,0.25) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 80%, rgba(56,11,96,0.3) 0%, transparent 50%),
            linear-gradient(135deg, #0f0d1a 0%, #1a0f2e 50%, #0d0d1a 100%);
          position: relative;
          overflow: hidden;
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: floatOrb 8s ease-in-out infinite;
          pointer-events: none;
        }
        .orb-1 { width:350px;height:350px;background:rgba(135,79,248,0.15);top:-80px;left:-80px;animation-delay:0s; }
        .orb-2 { width:280px;height:280px;background:rgba(99,102,241,0.12);bottom:-60px;right:-60px;animation-delay:-3s; }
        .orb-3 { width:200px;height:200px;background:rgba(236,72,153,0.08);top:40%;left:60%;animation-delay:-5s; }
        .login-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(135,79,248,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(135,79,248,0.04) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }
        @keyframes floatOrb {
          0%,100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        .login-card {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        .login-input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          font-family: 'Poppins', sans-serif;
        }
        .login-input-plain {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          font-family: 'Poppins', sans-serif;
        }
        .login-input::placeholder, .login-input-plain::placeholder { color: rgba(255,255,255,0.3); }
        .login-input:focus, .login-input-plain:focus {
          border-color: rgba(135,79,248,0.6);
          background: rgba(135,79,248,0.08);
          box-shadow: 0 0 0 3px rgba(135,79,248,0.15);
        }
        .submit-btn {
          width: 100%; padding: 13px; border-radius: 12px; border: none;
          background: linear-gradient(135deg, #874ff8, #5b21b6);
          color: white; font-size: 14px; font-weight: 600; cursor: pointer;
          transition: all 0.2s ease; font-family: 'Poppins', sans-serif;
          box-shadow: 0 8px 24px rgba(135,79,248,0.35);
          position: relative; overflow: hidden;
        }
        .submit-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0; transition: opacity 0.2s;
        }
        .submit-btn:hover::before { opacity: 1; }
        .submit-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 32px rgba(135,79,248,0.45); }
        .submit-btn:active { transform: scale(0.98); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .logo-badge {
          width:48px;height:48px;border-radius:14px;
          background:linear-gradient(135deg,#874ff8,#380B60);
          display:flex;align-items:center;justify-content:center;
          margin:0 auto 20px;
          box-shadow:0 8px 20px rgba(135,79,248,0.4);
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .otp-input {
          width: 100%; padding: 14px 16px; text-align: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; color: white; font-size: 22px;
          font-weight: 600; letter-spacing: 0.4em; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: 'Poppins', sans-serif;
        }
        .otp-input:focus {
          border-color: rgba(135,79,248,0.6);
          box-shadow: 0 0 0 3px rgba(135,79,248,0.15);
        }
        .otp-input::placeholder { letter-spacing: 0.2em; font-size: 14px; color: rgba(255,255,255,0.3); }
      `}</style>

      <div className="login-root login-bg flex items-center justify-center px-4">
        <div className="login-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="login-card fade-up relative w-full max-w-md rounded-3xl p-10 z-10">

          {/* ── FORGOT PASSWORD: Step 1 — Enter Email ── */}
          {forgotStep === "email" && (
            <>
              <button type="button" onClick={() => setForgotStep(null)}
                className="flex items-center gap-1.5 text-xs mb-6 transition-colors"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseOver={e => e.currentTarget.style.color="#874ff8"}
                onMouseOut={e => e.currentTarget.style.color="rgba(255,255,255,0.4)"}>
                <ArrowLeft className="size-3.5" /> Back to login
              </button>
              <div className="logo-badge">
                <KeyRound className="size-5 text-white" />
              </div>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-white">Forgot Password</h1>
                <p className="text-sm mt-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Enter your email and we'll send you a reset OTP
                </p>
              </div>
              <form onSubmit={sendResetOtp} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                  <input type="email" placeholder="Your email address"
                    value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                    required className="login-input" />
                </div>
                <button type="submit" disabled={forgotLoading} className="submit-btn">
                  {forgotLoading ? "Sending OTP..." : "Send Reset OTP"}
                </button>
              </form>
            </>
          )}

          {/* ── FORGOT PASSWORD: Step 2 — OTP + New Password ── */}
          {forgotStep === "otp" && (
            <>
              <button type="button" onClick={() => setForgotStep("email")}
                className="flex items-center gap-1.5 text-xs mb-6 transition-colors"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseOver={e => e.currentTarget.style.color="#874ff8"}
                onMouseOut={e => e.currentTarget.style.color="rgba(255,255,255,0.4)"}>
                <ArrowLeft className="size-3.5" /> Back
              </button>
              <div className="logo-badge">
                <ShieldCheck className="size-5 text-white" />
              </div>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-white">Check your email</h1>
                <p className="text-sm mt-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  We sent a 6-digit OTP to
                </p>
                <p className="text-sm font-medium mt-1" style={{ color: "#874ff8" }}>{forgotEmail}</p>
              </div>
              <form onSubmit={resetPassword} className="space-y-4">
                <div>
                  <label className="text-xs mb-2 block" style={{ color: "rgba(255,255,255,0.4)" }}>Enter OTP</label>
                  <input type="text" placeholder="• • • • • •" maxLength={6}
                    value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                    required className="otp-input" />
                </div>
                <div>
                  <label className="text-xs mb-2 block" style={{ color: "rgba(255,255,255,0.4)" }}>New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                    <input type="password" placeholder="Enter new password"
                      value={newPassword} onChange={e => setNewPassword(e.target.value)}
                      required minLength={6} className="login-input" />
                  </div>
                </div>
                <button type="submit" disabled={forgotLoading} className="submit-btn">
                  {forgotLoading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
              <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                Didn't receive the email?{" "}
                <button type="button" onClick={sendResetOtp}
                  className="transition-colors" style={{ color: "#874ff8" }}
                  onMouseOver={e => e.target.style.color="#a78bfa"}
                  onMouseOut={e => e.target.style.color="#874ff8"}>
                  Resend OTP
                </button>
              </p>
            </>
          )}

          {/* ── NORMAL LOGIN / REGISTER ── */}
          {!forgotStep && (
            <>
              <div className="logo-badge">
                <img src="logo.png" alt="logo" className="h-7 w-auto" onError={e => { e.target.style.display="none" }} />
              </div>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-white">
                  {state === "login" ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-sm mt-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {state === "login" ? "Login to continue building your resume" : "Sign up to start building resumes"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {state !== "login" && (
                  <div className="relative">
                    <User2 className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                    <input type="text" name="name" placeholder="Full Name"
                      value={formData.name} onChange={handleChange} required className="login-input" />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                  <input type="email" name="email" placeholder="Email Address"
                    value={formData.email} onChange={handleChange} required className="login-input" />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                  <input type="password" name="password" placeholder="Password"
                    value={formData.password} onChange={handleChange} required className="login-input" />
                </div>

                {state === "login" && (
                  <div className="text-right">
                    <button type="button" onClick={() => setForgotStep("email")}
                      className="text-xs transition-colors"
                      style={{ color: "rgba(135,79,248,0.8)" }}
                      onMouseOver={e => e.target.style.color="#874ff8"}
                      onMouseOut={e => e.target.style.color="rgba(135,79,248,0.8)"}>
                      Forgot password?
                    </button>
                  </div>
                )}

                <button type="submit" className="submit-btn">
                  {state === "login" ? "Login" : "Create Account"}
                </button>
              </form>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>or</span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
              </div>

              <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                {state === "login" ? "Don't have an account?" : "Already have an account?"}
                <button onClick={() => setState(prev => prev === "login" ? "register" : "login")}
                  className="ml-1.5 font-medium transition-colors"
                  style={{ color: "#874ff8" }}
                  onMouseOver={e => e.target.style.color="#a78bfa"}
                  onMouseOut={e => e.target.style.color="#874ff8"}>
                  {state === "login" ? "Sign up" : "Login"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;