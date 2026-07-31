import express from 'express';
import { getProfile } from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @openapi
 * /api/v1/user/me:
 *   get:
 *     summary: Retrieve current user profile
 *     description: Returns authenticated user document excluding the password hashed credentials.
 *     tags:
 *       - User Profile
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT authentication token
 *     responses:
 *       200:
 *         description: Profile successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: dev@example.com
 *                     username:
 *                       type: string
 *                       example: dev123
 *                     firstname:
 *                       type: string
 *                       example: Alice
 *                     lastname:
 *                       type: string
 *                       example: Smith
 *                     is_blocked:
 *                       type: boolean
 *                       example: false
 *       401:
 *         description: Unauthorized token missing or invalid
 *       403:
 *         description: Account is blocked
 */
router.get('/me', verifyJWT, getProfile);

export default router;
