import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    // ── OTP-based reset (used by the frontend flow) ────────────────────────
    resetOtp: {
      type: String,
      default: null,
    },
    resetOtpExpiry: {
      type: Date,
      default: null,
    },
    // ── Track failed OTP attempts to prevent brute-force ──────────────────
    otpAttempts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ── Instance method: compare plain password with hashed ──────────────────────
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// ── Instance method: clear OTP fields after use or expiry ────────────────────
UserSchema.methods.clearOtp = function () {
  this.resetOtp = null;
  this.resetOtpExpiry = null;
  this.otpAttempts = 0;
};

const User = mongoose.model("User", UserSchema);

export default User;