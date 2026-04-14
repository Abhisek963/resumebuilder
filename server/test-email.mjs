import nodemailer from 'nodemailer';
import 'dotenv/config';

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? `${process.env.EMAIL_PASS.slice(0,4)}****` : 'NOT SET');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

try {
  await transporter.verify();
  console.log('\n✅ Gmail SMTP connection SUCCESS — emails will work!\n');
} catch (err) {
  console.error('\n❌ Gmail SMTP FAILED:', err.message);
  console.log('\nFix:');
  console.log('  1. Go to https://myaccount.google.com/apppasswords');
  console.log('  2. Create an App Password for "Mail"');
  console.log('  3. Update EMAIL_PASS in server/.env with the 16-char password (no spaces)');
  console.log('  4. Make sure 2-Step Verification is ON for the Gmail account\n');
}
