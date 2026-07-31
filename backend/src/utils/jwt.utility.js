import jwt from 'jsonwebtoken';

/**
 * Encrypts and signs a new JSON Web Token (JWT) representing user authentication state.
 * @param {Object} user - The user object containing _id and role.
 * @returns {string} The signed JWT string.
 */
export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'fallback_secret_key',
    { expiresIn: '12h' }
  );
};
