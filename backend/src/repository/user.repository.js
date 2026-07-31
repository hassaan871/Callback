import User from '../models/user.model.js';

/**
 * Creates a new user record in the database.
 * @param {Object} userData - The fields representing the user.
 * @returns {Promise<Object>} The saved database document.
 */
export const createUser = async (userData) => {
  return await User.create(userData);
};

/**
 * Finds a user by their email address.
 * @param {string} email - The email to search for.
 * @returns {Promise<Object|null>} The database user document or null if not found.
 */
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

/**
 * Finds a user by their database ID.
 * @param {string} id - The MongoDB ObjectId.
 * @returns {Promise<Object|null>} The database user document (excluding password) or null.
 */
export const findUserById = async (id) => {
  return await User.findById(id).select('-password');
};
