import { z } from 'zod';

// Shared password validator matching strict security requirements
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  );

export const signupSchema = z.object({
  email: z.string().email('Invalid email address').trim().toLowerCase(),
  username: z.string().min(3, 'Username must be at least 3 characters').trim().toLowerCase(),
  firstname: z.string().min(1, 'First name is required').trim(),
  lastname: z.string().min(1, 'Last name is required').trim(),
  password: passwordSchema
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').trim().toLowerCase(),
  password: z.string().min(1, 'Password is required')
});

export const resetPasswordSchema = z.object({
  newPassword: passwordSchema
});

export const verifyOtpSchema = z.object({
  email: z.string().email('Invalid email address').trim().toLowerCase(),
  otp: z.string().length(6, 'OTP must be exactly 6 digits').regex(/^\d+$/, 'OTP must be numeric')
});

export const resendOtpSchema = z.object({
  email: z.string().email('Invalid email address').trim().toLowerCase()
});
