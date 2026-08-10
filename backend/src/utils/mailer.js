import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE || undefined,
  host: process.env.SMTP_SERVICE ? undefined : (process.env.SMTP_HOST || 'smtp.mailtrap.io'),
  port: process.env.SMTP_SERVICE ? undefined : parseInt(process.env.SMTP_PORT || '2525'),
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

/**
 * Renders the email template and sends the verification code.
 * @param {string} email
 * @param {string} token
 */
export const sendActivationEmail = async (email, token) => {
  const templatePath = path.join(__dirname, '../../views/activation-email.ejs');

  // Construct dynamic activation URL pointing to the React frontend route
  const activationUrl = `http://localhost:5173/activate?token=${token}&email=${encodeURIComponent(email)}`;

  const html = await ejs.renderFile(templatePath, { activationUrl });

  return transporter.sendMail({
    from: process.env.SMTP_FROM || '"Callback" <noreply@callback.com>',
    to: email,
    subject: 'Activate Your Callback Account',
    html
  });
};
