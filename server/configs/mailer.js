import nodemailer from "nodemailer";

/**
 * Reusable Nodemailer transporter using Gmail.
 *
 * Prerequisites (already done for this project):
 *  1. Gmail → Security → Enable 2-Step Verification
 *  2. Gmail → Security → App Passwords → generate one
 *  3. Put the 16-char app password in EMAIL_PASS (no spaces)
 *
 * .env required:
 *   EMAIL_USER=youraddress@gmail.com
 *   EMAIL_PASS=your16charapppassword
 */
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(
      "EMAIL_USER and EMAIL_PASS must be set in .env to send emails."
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password (not your real password)
    },
  });
};

/**
 * sendOtpEmail(to, otp)
 * Sends the 6-digit OTP reset email.
 */
export const sendOtpEmail = async (to, otp) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Resume Builder" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Password Reset OTP — Resume Builder",
    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 480px;
        margin: 0 auto;
        padding: 32px;
        background: #f9fafb;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
      ">
        <div style="text-align:center;margin-bottom:24px;">
          <div style="
            display:inline-flex;align-items:center;justify-content:center;
            width:52px;height:52px;border-radius:14px;
            background:linear-gradient(135deg,#874ff8,#5b21b6);
            margin-bottom:16px;
          ">
            <span style="font-size:24px;">🔐</span>
          </div>
          <h2 style="color:#111;margin:0 0 8px;">Reset Your Password</h2>
          <p style="color:#6b7280;font-size:14px;margin:0;">
            Use the OTP below to reset your Resume Builder password.
          </p>
        </div>

        <div style="
          background: linear-gradient(135deg, #874ff8, #5b21b6);
          border-radius: 12px;
          padding: 28px 16px;
          text-align: center;
          margin: 24px 0;
        ">
          <p style="color:rgba(255,255,255,0.7);font-size:12px;margin:0 0 8px;letter-spacing:0.1em;text-transform:uppercase;">
            One-Time Password
          </p>
          <div style="
            color: white;
            font-size: 40px;
            font-weight: 700;
            letter-spacing: 0.4em;
            line-height: 1;
          ">${otp}</div>
          <p style="color:rgba(255,255,255,0.6);font-size:12px;margin:12px 0 0;">
            Expires in <strong style="color:white;">10 minutes</strong>
          </p>
        </div>

        <div style="
          background: #fef3c7;
          border: 1px solid #fcd34d;
          border-radius: 8px;
          padding: 12px 16px;
          margin-bottom: 24px;
        ">
          <p style="color:#92400e;font-size:13px;margin:0;">
            ⚠️ Never share this OTP with anyone.
            Resume Builder will never ask for your OTP.
          </p>
        </div>

        <p style="color:#9ca3af;font-size:12px;text-align:center;margin:0;">
          If you did not request a password reset, you can safely ignore this email.
          Your password will not change.
        </p>
      </div>
    `,
  };

  // Verify connection before sending (helps surface config errors early)
  await transporter.verify();
  const info = await transporter.sendMail(mailOptions);
  return info;
};
