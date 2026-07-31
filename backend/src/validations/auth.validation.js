import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('Invalid email address').trim().toLowerCase(),
  username: z.string().min(3, 'Username must be at least 3 characters').trim().toLowerCase(),
  firstname: z.string().min(1, 'First name is required').trim(),
  lastname: z.string().min(1, 'Last name is required').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').trim().toLowerCase(),
  password: z.string().min(1, 'Password is required')
});
