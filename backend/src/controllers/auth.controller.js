import { createUser, findUserByEmail } from '../repository/user.repository.js';
import asyncHandler from '../utils/asyncHandler.js';
import { signupSchema, loginSchema, resetPasswordSchema } from '../validations/auth.validation.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.utility.js';
import { generateToken } from '../utils/jwt.utility.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 12 * 60 * 60 * 1000 // 12 hours to match JWT expiry
};

/**
 * Handles the registration of a new user.
 * Validates request payload, hashes credentials, and persists user record.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<import('express').Response>}
 */
export const signup = asyncHandler(async (req, res) => {
  const { username, email, firstname, lastname, password } = req.body;

  const validation = signupSchema.safeParse({ username, email, firstname, lastname, password });
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validation.error.errors.map(err => ({
        field: err.path[0],
        message: err.message
      }))
    });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await createUser({
    email,
    username,
    firstname,
    lastname,
    password: hashedPassword,
    role: 'user'
  });

  const token = generateToken(newUser);

  const { password: _, ...userData } = newUser.toObject();
  return res.status(201)
    .cookie('token', token, COOKIE_OPTIONS)
    .json({
      success: true,
      message: 'User registered successfully',
      user: userData,
      token
    });
});

/**
 * Authenticates user credentials (email and password) and returns session token.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<import('express').Response>}
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const validation = loginSchema.safeParse({ email, password });
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validation.error.errors.map(err => ({
        field: err.path[0],
        message: err.message
      }))
    });
  }

  const { email: validatedEmail } = validation.data;

  const user = await findUserByEmail(validatedEmail);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  // Verify account status after password match succeeds to prevent information leak
  if (user.is_blocked) {
    return res.status(403).json({
      success: false,
      message: 'Your account has been blocked'
    });
  }

  if (user.deleted_on) {
    return res.status(401).json({
      success: false,
      message: 'This account has been deleted'
    });
  }

  const token = generateToken(user);

  const { password: _, ...userData } = user.toObject();
  return res.status(200)
    .cookie('token', token, COOKIE_OPTIONS)
    .json({
      success: true,
      message: 'Logged in successfully',
      user: userData,
      token
    });
});

/**
 * Resets the user's password.
 * Secured by verifyJWT middleware, meaning the user is already resolved and attached to req.user.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<import('express').Response>}
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;

  // Validate using strict resetPasswordSchema Zod validator
  const validation = resetPasswordSchema.safeParse({ newPassword });
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validation.error.errors.map(err => ({
        message: err.message
      }))
    });
  }

  // Hash new password using the local hashPassword utility
  req.user.password = await hashPassword(newPassword);
  await req.user.save();

  return res.status(200).json({
    success: true,
    message: 'Password has been reset successfully'
  });
});

/**
 * Logs out user by incrementing user's session_version in the DB (revoking token)
 * and clearing the HTTP-Only cookie.
 */
export const logout = asyncHandler(async (req, res) => {
  if (req.user) {
    req.user.session_version = (req.user.session_version || 0) + 1;
    await req.user.save();
  }

  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});
