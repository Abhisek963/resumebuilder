import User from "../models/User.js";
import Resume from "../models/Resume.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const generateToken = (userID) => {
  return jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email and password" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(newUser._id);
    return res.status(201).json({
      message: "User registered successfully",
      user: { _id: newUser._id, name: newUser.name, email: newUser.email },
      token
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist with this email" });
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = generateToken(existingUser._id);
    return res.status(200).json({
      message: "User logged in successfully",
      user: { _id: existingUser._id, name: existingUser.name, email: existingUser.email },
      token
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const foundUser = await User.findById(req.userID).select("-password");
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User details fetched successfully", user: foundUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userID });
    return res.status(200).json({ message: "User resume fetched successfully", resumes });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: "If this email exists, an OTP has been sent." });
    }
    const otp = crypto.randomInt(100000, 999999).toString();
    user.resetOtp = otp;
    user.resetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    await resend.emails.send({
      from: 'Resume Builder <onboarding@resend.dev>',
      to: email,
      subject: "Your Password Reset OTP",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f9fafb;border-radius:12px;">
          <h2 style="color:#111;margin-bottom:8px;">Reset Your Password</h2>
          <p style="color:#555;margin-bottom:24px;">Use the OTP below to reset your password. It expires in <strong>10 minutes</strong>.</p>
          <div style="background:#874ff8;color:white;font-size:32px;font-weight:700;letter-spacing:0.3em;text-align:center;padding:20px;border-radius:10px;margin-bottom:24px;">
            ${otp}
          </div>
          <p style="color:#888;font-size:13px;">If you did not request this, you can safely ignore this email.</p>
        </div>
      `
    });
    return res.status(200).json({ message: "OTP sent to your email!" });
  } catch (error) {
    console.error("forgotPassword error:", error);
    return res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user || !user.resetOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }
    if (new Date() > user.resetOtpExpiry) {
      user.resetOtp = null;
      user.resetOtpExpiry = null;
      await user.save();
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = null;
    user.resetOtpExpiry = null;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully! You can now log in." });
  } catch (error) {
    console.error("resetPassword error:", error);
    return res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};