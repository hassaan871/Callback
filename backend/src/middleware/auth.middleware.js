import jwt from 'jsonwebtoken';
import { findUserById } from '../repository/user.repository.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Middleware to authenticate requests by verifying JWT tokens.
 * Extracts the raw token from request headers (no Bearer prefix required)
 * and verifies that the user is active (not blocked).
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization || req.headers.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Access token is missing'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    const user = await findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User no longer exists'
      });
    }

    if (user.is_blocked) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Your account has been blocked'
      });
    }

    if (user.deleted_on) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: This account has been deleted'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Access token is invalid or expired'
    });
  }
});
