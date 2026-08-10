import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  port: parseInt(process.env.SMTP_PORT || '2525'),
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

/**
 * Renders the email template and sends the verification code.
 * @param {string} email
 * @param {string} otp
 */
export const sendOTPEmail = async (email, otp) => {
  const templatePath = path.join(__dirname, '../../views/otp-email.ejs');
  const html = await ejs.renderFile(templatePath, { otp });

  return transporter.sendMail({
    from: process.env.SMTP_FROM || '"Callback" <noreply@callback.com>',
    to: email,
    subject: 'Activate Your Callback Account',
    html
  });
};
