import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { createUser, findUserByEmail } from '../repository/user.repository.js';
import User from '../models/user.model.js';
import Token from '../models/token.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { signupSchema, loginSchema, resetPasswordSchema, activateAccountSchema, resendActivationSchema } from '../validations/auth.validation.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.utility.js';
import { generateToken } from '../utils/jwt.utility.js';
import { sendActivationEmail } from '../utils/mailer.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 12 * 60 * 60 * 1000 // 12 hours to match JWT expiry
};

const COOLDOWN_MS = 60 * 1000; // 60 seconds cooldown for generation requests

/**
 * Checks if email has requested a token within the cooldown period.
 */
const checkTokenCooldown = async (email) => {
  const existingRecord = await Token.findOne({ email });
  if (existingRecord) {
    const timeSinceLastRequest = Date.now() - new Date(existingRecord.createdAt).getTime();
    if (timeSinceLastRequest < COOLDOWN_MS) {
      const secondsLeft = Math.ceil((COOLDOWN_MS - timeSinceLastRequest) / 1000);
      return { isRateLimited: true, secondsLeft };
    }
  }
  return { isRateLimited: false };
};

/**
 * Generates secure token, hashes it, upserts the record, and triggers Nodemailer template email dispatch.
 */
const generateAndSendActivation = async (email) => {
  const token = crypto.randomBytes(32).toString('hex');
  const salt = await bcrypt.genSalt(10);
  const tokenHash = await bcrypt.hash(token, salt);

  await Token.findOneAndUpdate(
    { email },
    { tokenHash, createdAt: new Date() },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await sendActivationEmail(email, token);
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

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    if (!existingUser.is_active) {
      const rateLimitStatus = await checkTokenCooldown(email);
      if (rateLimitStatus.isRateLimited) {
        return res.status(429).json({
          success: false,
          message: `An activation link was already sent. Please wait ${rateLimitStatus.secondsLeft} seconds before requesting a new one.`,
          requiresVerification: true,
          email
        });
      }

      await generateAndSendActivation(email);
      return res.status(200).json({
        success: true,
        message: 'A new activation link has been sent to your email.',
        requiresVerification: true,
        email
      });
    }

    return res.status(400).json({
      success: false,
      message: 'A user with this email already exists.'
    });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await createUser({
    email,
    username,
    firstname,
    lastname,
    password: hashedPassword,
    role: 'user',
    is_active: false
  });

  await generateAndSendActivation(email);

  return res.status(201).json({
    success: true,
    message: 'User registered successfully. Please check your email for the activation link.',
    email: newUser.email,
    requiresVerification: true
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

  // Verify activation status
  if (!user.is_active) {
    const cooldownStatus = await checkTokenCooldown(user.email);
    if (!cooldownStatus.isRateLimited) {
      await generateAndSendActivation(user.email);
    }

    return res.status(403).json({
      success: false,
      message: 'Account is not activated. An activation link has been sent to your email.',
      requiresVerification: true,
      email: user.email
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

export const activateAccount = asyncHandler(async (req, res) => {
  const validation = activateAccountSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validation.error.errors
    });
  }

  const { email, token } = validation.data;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  if (user.is_active) {
    return res.status(400).json({ success: false, message: 'Account is already activated' });
  }

  const tokenRecord = await Token.findOne({ email });
  if (!tokenRecord) {
    return res.status(400).json({
      success: false,
      message: 'Activation link has expired or is invalid. Please request a new one.'
    });
  }

  const isMatch = await bcrypt.compare(token, tokenRecord.tokenHash);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired activation link. Please request a new one.'
    });
  }

  await Token.deleteOne({ email });
  user.is_active = true;
  await user.save();

  const sessionToken = generateToken(user);
  const { password: _, ...userData } = user.toObject();

  return res.status(200)
    .cookie('token', sessionToken, COOKIE_OPTIONS)
    .json({
      success: true,
      message: 'Email verified and account activated successfully.',
      user: userData,
      token: sessionToken
    });
});

export const resendActivation = asyncHandler(async (req, res) => {
  const validation = resendActivationSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validation.error.errors
    });
  }

  const { email } = validation.data;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  if (user.is_active) {
    return res.status(400).json({ success: false, message: 'Account is already activated' });
  }

  const rateLimitStatus = await checkTokenCooldown(email);
  if (rateLimitStatus.isRateLimited) {
    return res.status(429).json({
      success: false,
      message: `Please wait ${rateLimitStatus.secondsLeft} seconds before requesting a new activation link.`
    });
  }

  await generateAndSendActivation(email);

  return res.status(200).json({
    success: true,
    message: 'A new activation link has been sent to your email.'
  });
});
