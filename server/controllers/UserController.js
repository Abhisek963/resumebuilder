import User from "../models/User.js";
import Resume from "../models/Resume.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendOtpEmail } from "../configs/mailer.js";

// ── Helpers ───────────────────────────────────────────────────────────────────

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());

const generateToken = (userID) =>
  jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: "7d" });

const safeUser = (u) => ({ _id: u._id, name: u.name, email: u.email });

// ── Register ──────────────────────────────────────────────────────────────────

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate inputs
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: "Please provide name, email and password." });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);
    return res.status(201).json({
      message: "Account created successfully!",
      user: safeUser(newUser),
      token,
    });
  } catch (error) {
    console.error("[registerUser]", error);
    return res.status(500).json({ message: "Registration failed. Please try again." });
  }
};

// ── Login ─────────────────────────────────────────────────────────────────────

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({ message: "Please provide email and password." });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }

    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (!existingUser) {
      // Generic message prevents email enumeration
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = generateToken(existingUser._id);
    return res.status(200).json({
      message: "Logged in successfully!",
      user: safeUser(existingUser),
      token,
    });
  } catch (error) {
    console.error("[loginUser]", error);
    return res.status(500).json({ message: "Login failed. Please try again." });
  }
};

// ── Get user by ID ────────────────────────────────────────────────────────────

export const getUserById = async (req, res) => {
  try {
    const foundUser = await User.findById(req.userID).select("-password -resetOtp -resetOtpExpiry -otpAttempts");
    if (!foundUser) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({ message: "User data fetched.", user: foundUser });
  } catch (error) {
    console.error("[getUserById]", error);
    return res.status(500).json({ message: "Failed to fetch user data." });
  }
};

// ── Get user's resumes ────────────────────────────────────────────────────────

export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userID }).sort({ updatedAt: -1 });
    return res.status(200).json({ message: "Resumes fetched.", resumes });
  } catch (error) {
    console.error("[getUserResumes]", error);
    return res.status(500).json({ message: "Failed to fetch resumes." });
  }
};

// ── Forgot Password ───────────────────────────────────────────────────────────

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email?.trim()) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    // Always return 200 — don't reveal whether the email exists (prevents enumeration)
    if (!user) {
      return res.status(200).json({ message: "If this email is registered, an OTP has been sent." });
    }

    // Generate a cryptographically secure 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Invalidate any previous OTP and start fresh
    user.resetOtp = otp;
    user.resetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.otpAttempts = 0;
    await user.save();

    // Send email
    // Send OTP email via Nodemailer (Gmail)
    try {
      await sendOtpEmail(email.trim(), otp);
    } catch (emailErr) {
      // Rollback OTP if email fails so user can try again cleanly
      user.clearOtp();
      await user.save();
      console.error("[forgotPassword] Email send failed:", emailErr.message);
      return res.status(500).json({
        message: "Failed to send OTP email. Please check your email address and try again.",
      });
    }

    return res.status(200).json({ message: "OTP sent to your email!" });
  } catch (error) {
    console.error("[forgotPassword]", error);
    return res.status(500).json({ message: "Failed to send OTP. Please try again." });
  }
};

// ── Reset Password ────────────────────────────────────────────────────────────

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email?.trim() || !otp?.trim() || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user || !user.resetOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP. Please request a new one." });
    }

    // Check expiry first (don't reveal the OTP is correct when expired)
    if (new Date() > user.resetOtpExpiry) {
      user.clearOtp();
      await user.save();
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // Track brute-force attempts
    if ((user.otpAttempts ?? 0) >= 5) {
      user.clearOtp();
      await user.save();
      return res.status(429).json({ message: "Too many failed attempts. Please request a new OTP." });
    }

    // Timing-safe OTP comparison
    const otpBuffer      = Buffer.from(otp.trim().padEnd(6), "utf8");
    const storedBuffer   = Buffer.from(user.resetOtp.padEnd(6), "utf8");
    const match          = crypto.timingSafeEqual(otpBuffer, storedBuffer);

    if (!match) {
      user.otpAttempts = (user.otpAttempts ?? 0) + 1;
      await user.save();
      const remaining = 5 - user.otpAttempts;
      return res.status(400).json({
        message: remaining > 0
          ? `Incorrect OTP. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`
          : "Too many failed attempts. Please request a new OTP.",
      });
    }

    // ── All checks passed — reset password ──────────────────────────────────
    user.password = await bcrypt.hash(newPassword, 12);
    user.clearOtp(); // Invalidate the OTP so it can't be reused
    await user.save();

    return res.status(200).json({ message: "Password reset successfully! You can now log in." });
  } catch (error) {
    console.error("[resetPassword]", error);
    return res.status(500).json({ message: "Password reset failed. Please try again." });
  }
};