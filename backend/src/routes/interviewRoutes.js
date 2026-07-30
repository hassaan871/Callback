import express from 'express';
import { createSession, submitAnswer, getDebrief } from '../controllers/interviewController.js';

const router = express.Router();

// Route map

/**
 * @openapi
 * /api/interviews:
 *   post:
 *     summary: Start a new mock interview session
 *     description: Creates an interview session for the chosen role track, and requests the starting question from the Gemini AI service.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - track
 *             properties:
 *               track:
 *                 type: string
 *                 enum: [Backend, Frontend, DevOps / SRE, Data Engineering, ML / AI, System Design, Behavioral]
 *                 example: Backend
 *     responses:
 *       201:
 *         description: Session initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 64b3ef8e1329c2ab87dc4612
 *                 track:
 *                   type: string
 *                   example: Backend
 *                 status:
 *                   type: string
 *                   example: in-progress
 *                 transcript:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       role:
 *                         type: string
 *                         example: ai
 *                       text:
 *                         type: string
 *                         example: Walk me through a production database incident you faced...
 */
router.post('/', createSession);

/**
 * @openapi
 * /api/interviews/{id}/answer:
 *   post:
 *     summary: Submit a user answer and get next step
 *     description: Submits the user's response to the active mock question. The Gemini AI service decides whether to follow up with a subsequent question or to finalize the session and compute the debrief scorecard.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The interview session MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answer
 *             properties:
 *               answer:
 *                 type: string
 *                 example: I analyzed the slow query log and identified a missing index on user_id, then created it online.
 *     responses:
 *       200:
 *         description: Answer processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 status:
 *                   type: string
 *                   enum: [in-progress, completed]
 *                 transcript:
 *                   type: array
 *                   items:
 *                     type: object
 *                 debrief:
 *                   type: object
 */
router.post('/:id/answer', submitAnswer);

/**
 * @openapi
 * /api/interviews/{id}/debrief:
 *   get:
 *     summary: Fetch completed mock interview scorecard analysis
 *     description: Returns the full structured metrics (PACE wpm, STAR method verification, filler words counts, depth analysis, and score rating) for a completed interview.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The interview session MongoDB ID
 *     responses:
 *       200:
 *         description: Debrief analysis retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 track:
 *                   type: string
 *                 debrief:
 *                   type: object
 *                 transcript:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/:id/debrief', getDebrief);

export default router;
