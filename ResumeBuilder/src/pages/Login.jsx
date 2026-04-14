import React, { useState, useEffect } from "react";
import {
  Lock, Mail, User2, ArrowLeft, KeyRound,
  ShieldCheck, Eye, EyeOff, Loader2, CheckCircle2
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";
import * as resumeService from "../services/resumeService";
import api from "../configs/api";

// ── Tiny helpers ──────────────────────────────────────────────────────────────
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// ── FieldError ────────────────────────────────────────────────────────────────
const FieldError = ({ msg }) =>
  msg ? (
    <p className="text-xs mt-1.5" style={{ color: "#f87171" }}>
      {msg}
    </p>
  ) : null;

// ── PasswordInput ─────────────────────────────────────────────────────────────
const PasswordInput = ({ value, onChange, placeholder, name, autoComplete, className, minLen }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Lock
        className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4"
        style={{ color: "rgba(255,255,255,0.3)" }}
      />
      <input
        type={show ? "text" : "password"}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        minLength={minLen || 6}
        className={className}
        style={{ paddingRight: 44 }}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShow((s) => !s)}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
        style={{ color: "rgba(255,255,255,0.3)" }}
        onMouseOver={(e) => (e.currentTarget.style.color = "#874ff8")}
        onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/app";

  // ── View: "login" | "register" | "forgot-email" | "forgot-otp"
  const [view, setView] = useState("login");

  // ── Login / Register form
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // ── Forgot password flow
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // ── Load remembered email on mount
  useEffect(() => {
    const saved = localStorage.getItem("rb_remember_email");
    if (saved) {
      setFormData((p) => ({ ...p, email: saved }));
      setRememberMe(true);
    }
  }, []);

  // ── Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  // ── Validate login/register
  const validate = () => {
    const e = {};
    if (view === "register" && !formData.name.trim()) e.name = "Full name is required.";
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(formData.email)) e.email = "Enter a valid email address.";
    if (!formData.password) e.password = "Password is required.";
    else if (formData.password.length < 6) e.password = "Password must be at least 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  // ── Submit login / register
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const { data } = await api.post(`/api/users/${view}`, {
        name: formData.name,
        email: formData.email.trim(),
        password: formData.password,
      });

      // Remember Me — store email, never password
      if (rememberMe) {
        localStorage.setItem("rb_remember_email", formData.email.trim());
      } else {
        localStorage.removeItem("rb_remember_email");
      }

      localStorage.setItem("token", data.token);
      dispatch(login(data));
      toast.success(data.message || (view === "login" ? "Welcome back!" : "Account created!"));
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Something went wrong.";
      toast.error(msg);
      // Map backend messages to field errors
      if (msg.toLowerCase().includes("email")) setErrors((p) => ({ ...p, email: msg }));
      else if (msg.toLowerCase().includes("password")) setErrors((p) => ({ ...p, password: msg }));
    } finally {
      setSubmitting(false);
    }
  };

  // ── Send OTP
  const sendResetOtp = async (e) => {
    if (e) e.preventDefault();
    if (!forgotEmail.trim()) return toast.error("Please enter your email.");
    if (!isValidEmail(forgotEmail)) return toast.error("Enter a valid email address.");
    setForgotLoading(true);
    try {
      const { data } = await api.post("/api/users/forgot-password", { email: forgotEmail.trim() });
      toast.success(data.message || "OTP sent to your email!");
      setView("forgot-otp");
      setResendCooldown(60);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP. Try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  // ── Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) return toast.error("Enter the 6-digit OTP.");
    if (!newPassword || newPassword.length < 6) return toast.error("Password must be at least 6 characters.");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match.");
    setForgotLoading(true);
    try {
      const { data } = await api.post("/api/users/reset-password", {
        email: forgotEmail.trim(),
        otp: otp.trim(),
        newPassword,
      });
      toast.success(data.message || "Password reset successfully!");
      setResetSuccess(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset failed. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  // ── CSS vars shared across views
  const inputCls = `login-input`;
  const inputPlainCls = `login-input-plain`;

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
          position: relative; overflow: hidden;
        }
        .orb {
          position: absolute; border-radius: 50%; filter: blur(80px);
          animation: floatOrb 8s ease-in-out infinite; pointer-events: none;
        }
        .orb-1 { width:350px;height:350px;background:rgba(135,79,248,0.15);top:-80px;left:-80px;animation-delay:0s;}
        .orb-2 { width:280px;height:280px;background:rgba(99,102,241,0.12);bottom:-60px;right:-60px;animation-delay:-3s;}
        .orb-3 { width:200px;height:200px;background:rgba(236,72,153,0.08);top:40%;left:60%;animation-delay:-5s;}
        .login-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(135,79,248,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(135,79,248,0.04) 1px, transparent 1px);
          background-size: 50px 50px; pointer-events: none;
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
          width: 100%; padding: 12px 16px 12px 44px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; color: white; font-size: 14px;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          font-family: 'Poppins', sans-serif;
        }
        .login-input-plain {
          width: 100%; padding: 12px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; color: white; font-size: 14px;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          font-family: 'Poppins', sans-serif;
        }
        .login-input::placeholder,.login-input-plain::placeholder { color: rgba(255,255,255,0.3); }
        .login-input:focus,.login-input-plain:focus {
          border-color: rgba(135,79,248,0.6);
          background: rgba(135,79,248,0.08);
          box-shadow: 0 0 0 3px rgba(135,79,248,0.15);
        }
        .input-error {
          border-color: rgba(248,113,113,0.6) !important;
          box-shadow: 0 0 0 3px rgba(248,113,113,0.12) !important;
        }
        .submit-btn {
          width: 100%; padding: 13px; border-radius: 12px; border: none;
          background: linear-gradient(135deg, #874ff8, #5b21b6);
          color: white; font-size: 14px; font-weight: 600; cursor: pointer;
          transition: all 0.2s ease; font-family: 'Poppins', sans-serif;
          box-shadow: 0 8px 24px rgba(135,79,248,0.35);
          position: relative; overflow: hidden; display: flex;
          align-items: center; justify-content: center; gap: 8px;
        }
        .submit-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 32px rgba(135,79,248,0.45); }
        .submit-btn:active { transform: scale(0.98); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
        .logo-badge {
          width:48px;height:48px;border-radius:14px;
          background:linear-gradient(135deg,#874ff8,#380B60);
          display:flex;align-items:center;justify-content:center;
          margin:0 auto 20px;
          box-shadow:0 8px 20px rgba(135,79,248,0.4);
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up { animation: fadeUp 0.45s ease forwards; }
        .otp-input {
          width:100%;padding:14px 16px;text-align:center;
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:12px;color:white;font-size:22px;
          font-weight:600;letter-spacing:0.4em;outline:none;
          transition:border-color 0.2s,box-shadow 0.2s;
          font-family:'Poppins',sans-serif;
        }
        .otp-input:focus {
          border-color:rgba(135,79,248,0.6);
          box-shadow:0 0 0 3px rgba(135,79,248,0.15);
        }
        .otp-input::placeholder { letter-spacing:0.2em;font-size:14px;color:rgba(255,255,255,0.3); }
        .remember-check {
          width:16px;height:16px;accent-color:#874ff8;cursor:pointer;border-radius:4px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }

        /* Strength bar */
        .strength-bar { height: 3px; border-radius: 999px; transition: width 0.3s, background 0.3s; }
      `}</style>

      <div className="login-root login-bg flex items-center justify-center px-4 py-10">
        <div className="login-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="login-card fade-up relative w-full max-w-md rounded-3xl p-10 z-10">

          {/* ══════════════════════════════════════════════════
              FORGOT PASSWORD — Step 1: Email
          ══════════════════════════════════════════════════ */}
          {view === "forgot-email" && (
            <>
              <BackBtn onClick={() => setView("login")} />
              <div className="logo-badge"><KeyRound className="size-5 text-white" /></div>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-white">Forgot Password</h1>
                <p className="text-sm mt-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  We'll send a 6-digit OTP to your email
                </p>
              </div>
              <form onSubmit={sendResetOtp} className="space-y-4" noValidate>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                  <input
                    type="email"
                    name="forgot-email"
                    autoComplete="email"
                    placeholder="Your email address"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    className={inputCls}
                  />
                </div>
                <button type="submit" disabled={forgotLoading} className="submit-btn">
                  {forgotLoading && <Loader2 className="size-4 spin" />}
                  {forgotLoading ? "Sending OTP…" : "Send Reset OTP"}
                </button>
              </form>
            </>
          )}

          {/* ══════════════════════════════════════════════════
              FORGOT PASSWORD — Step 2: OTP + New Password
          ══════════════════════════════════════════════════ */}
          {view === "forgot-otp" && !resetSuccess && (
            <>
              <BackBtn onClick={() => setView("forgot-email")} />
              <div className="logo-badge"><ShieldCheck className="size-5 text-white" /></div>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-white">Check your email</h1>
                <p className="text-sm mt-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  We sent a 6-digit OTP to
                </p>
                <p className="text-sm font-medium mt-1" style={{ color: "#874ff8" }}>{forgotEmail}</p>
              </div>
              <form onSubmit={handleResetPassword} className="space-y-4" noValidate>
                <div>
                  <label className="text-xs mb-2 block" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="• • • • • •"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    required
                    className="otp-input"
                  />
                </div>
                <div>
                  <label className="text-xs mb-2 block" style={{ color: "rgba(255,255,255,0.4)" }}>
                    New Password
                  </label>
                  <PasswordInput
                    name="new-password"
                    autoComplete="new-password"
                    placeholder="Enter new password (min 6 chars)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={inputCls}
                    minLen={6}
                  />
                  <PasswordStrength password={newPassword} />
                </div>
                <div>
                  <label className="text-xs mb-2 block" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Confirm Password
                  </label>
                  <PasswordInput
                    name="confirm-password"
                    autoComplete="new-password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`${inputCls} ${confirmPassword && confirmPassword !== newPassword ? "input-error" : ""}`}
                    minLen={6}
                  />
                  {confirmPassword && confirmPassword !== newPassword && (
                    <FieldError msg="Passwords do not match." />
                  )}
                </div>
                <button type="submit" disabled={forgotLoading} className="submit-btn">
                  {forgotLoading && <Loader2 className="size-4 spin" />}
                  {forgotLoading ? "Resetting…" : "Reset Password"}
                </button>
              </form>
              <p className="text-center text-xs mt-5" style={{ color: "rgba(255,255,255,0.3)" }}>
                Didn't receive it?{" "}
                {resendCooldown > 0 ? (
                  <span style={{ color: "rgba(255,255,255,0.25)" }}>Resend in {resendCooldown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={sendResetOtp}
                    disabled={forgotLoading}
                    className="transition-colors"
                    style={{ color: "#874ff8" }}
                    onMouseOver={(e) => (e.target.style.color = "#a78bfa")}
                    onMouseOut={(e) => (e.target.style.color = "#874ff8")}
                  >
                    Resend OTP
                  </button>
                )}
              </p>
            </>
          )}

          {/* ══════════════════════════════════════════════════
              RESET SUCCESS
          ══════════════════════════════════════════════════ */}
          {view === "forgot-otp" && resetSuccess && (
            <div className="text-center py-4 fade-up">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{
                  background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.15))",
                  border: "1px solid rgba(16,185,129,0.3)",
                  boxShadow: "0 0 30px rgba(16,185,129,0.2)",
                }}
              >
                <CheckCircle2 className="size-8" style={{ color: "#34d399" }} />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Password Reset!</h2>
              <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                Your password has been updated. You can now log in with your new password.
              </p>
              <button
                onClick={() => { setView("login"); setResetSuccess(false); setOtp(""); setNewPassword(""); setConfirmPassword(""); }}
                className="submit-btn"
              >
                Back to Login
              </button>
            </div>
          )}

          {/* ══════════════════════════════════════════════════
              LOGIN / REGISTER
          ══════════════════════════════════════════════════ */}
          {(view === "login" || view === "register") && (
            <>
              <div className="logo-badge">
                <img src="/logo.png" alt="logo" className="h-7 w-auto" onError={(e) => { e.target.style.display = "none"; }} />
              </div>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-white">
                  {view === "login" ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-sm mt-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {view === "login"
                    ? "Login to continue building your resume"
                    : "Sign up to start building your resume"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate autoComplete="on">

                {/* Name — register only */}
                {view === "register" && (
                  <div>
                    <div className="relative">
                      <User2 className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`${inputCls} ${errors.name ? "input-error" : ""}`}
                      />
                    </div>
                    <FieldError msg={errors.name} />
                  </div>
                )}

                {/* Email */}
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`${inputCls} ${errors.email ? "input-error" : ""}`}
                    />
                  </div>
                  <FieldError msg={errors.email} />
                </div>

                {/* Password */}
                <div>
                  <PasswordInput
                    name="password"
                    autoComplete={view === "login" ? "current-password" : "new-password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${inputCls} ${errors.password ? "input-error" : ""}`}
                  />
                  <FieldError msg={errors.password} />
                  {view === "register" && <PasswordStrength password={formData.password} />}
                </div>

                {/* Remember Me + Forgot Password row */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="remember-check"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      Remember me
                    </span>
                  </label>
                  {view === "login" && (
                    <button
                      type="button"
                      onClick={() => { setForgotEmail(formData.email); setView("forgot-email"); }}
                      className="text-xs transition-colors"
                      style={{ color: "rgba(135,79,248,0.85)" }}
                      onMouseOver={(e) => (e.target.style.color = "#874ff8")}
                      onMouseOut={(e) => (e.target.style.color = "rgba(135,79,248,0.85)")}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                {/* Submit */}
                <button type="submit" disabled={submitting} className="submit-btn">
                  {submitting && <Loader2 className="size-4 spin" />}
                  {submitting
                    ? view === "login" ? "Logging in…" : "Creating account…"
                    : view === "login" ? "Login" : "Create Account"}
                </button>
              </form>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>or</span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
              </div>

              <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                {view === "login" ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => { setView((v) => (v === "login" ? "register" : "login")); setErrors({}); }}
                  className="ml-1.5 font-medium transition-colors"
                  style={{ color: "#874ff8" }}
                  onMouseOver={(e) => (e.target.style.color = "#a78bfa")}
                  onMouseOut={(e) => (e.target.style.color = "#874ff8")}
                >
                  {view === "login" ? "Sign up" : "Login"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

// ── Sub-components ────────────────────────────────────────────────────────────

const BackBtn = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-1.5 text-xs mb-6 transition-colors"
    style={{ color: "rgba(255,255,255,0.4)" }}
    onMouseOver={(e) => (e.currentTarget.style.color = "#874ff8")}
    onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
  >
    <ArrowLeft className="size-3.5" /> Back
  </button>
);

const PasswordStrength = ({ password }) => {
  if (!password) return null;
  const score =
    (password.length >= 8 ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 1 : 0);
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#ef4444", "#f59e0b", "#3b82f6", "#10b981"];
  const widths = ["0%", "25%", "50%", "75%", "100%"];
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: score >= i ? colors[score] : "rgba(255,255,255,0.1)" }}
          />
        ))}
      </div>
      {score > 0 && (
        <p className="text-xs" style={{ color: colors[score] }}>
          {labels[score]}
        </p>
      )}
    </div>
  );
};

export default Login;