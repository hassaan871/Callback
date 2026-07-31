import asyncHandler from '../utils/asyncHandler.js';

/**
 * Retrieves the current authenticated user's profile.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<import('express').Response>}
 */
export const getProfile = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
});
