import { createUser, findUserByEmail } from '../repository/user.repository.js';
import asyncHandler from '../utils/asyncHandler.js';
import { signupSchema, loginSchema } from '../validations/auth.validation.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.utility.js';
import { generateToken } from '../utils/jwt.utility.js';

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
    .cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
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

  const token = generateToken(user);

  const { password: _, ...userData } = user.toObject();
  return res.status(200)
    .cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    .json({
      success: true,
      message: 'Logged in successfully',
      user: userData,
      token
    });
});
