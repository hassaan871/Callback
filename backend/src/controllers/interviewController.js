import crypto from 'crypto';
import asyncHandler from '../utils/asyncHandler.js';
import { generateFirstQuestion, generateFollowUpOrDebrief } from '../services/geminiService.js';

// In-memory database store for interview sessions
const interviews = {};

// @desc    Start a mock interview session
// @route   POST /api/interviews
// @access  Public
export const createSession = asyncHandler(async (req, res) => {
  const { track } = req.body;

  if (!track) {
    res.status(400);
    throw new Error('Please select an interview track');
  }

  const id = crypto.randomUUID();

  // Create new in-memory interview session object
  const interview = {
    _id: id,
    track,
    status: 'in-progress',
    transcript: [],
    debrief: null,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Call Gemini service to prompt the starting question
  const firstQuestionText = await generateFirstQuestion(track);

  // Append initial question to transcript
  interview.transcript.push({
    role: 'ai',
    text: firstQuestionText,
    timestamp: new Date()
  });

  // Save in memory
  interviews[id] = interview;

  res.status(201).json(interview);
});

// @desc    Submit an answer and get subsequent question or final debrief
// @route   POST /api/interviews/:id/answer
// @access  Public
export const submitAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;

  if (!answer) {
    res.status(400);
    throw new Error('Answer content is required');
  }

  const interview = interviews[id];

  if (!interview) {
    res.status(404);
    throw new Error('Interview session not found');
  }

  if (interview.status === 'completed') {
    res.status(400);
    throw new Error('This interview session is already completed');
  }

  // Save the user's answer
  interview.transcript.push({
    role: 'user',
    text: answer,
    timestamp: new Date()
  });

  // Evaluate next state using Gemini Service
  const serviceResponse = await generateFollowUpOrDebrief(interview.track, interview.transcript);

  if (serviceResponse.shouldComplete) {
    // End the interview and save debrief analysis
    interview.status = 'completed';
    interview.debrief = {
      pace: serviceResponse.debrief.pace || 0,
      fillers: serviceResponse.debrief.fillers || 0,
      structure: serviceResponse.debrief.structure || 'N/A',
      depth: serviceResponse.debrief.depth || 'N/A',
      score: serviceResponse.debrief.score || 0
    };
  } else {
    // Save AI's subsequent follow-up question
    interview.transcript.push({
      role: 'ai',
      text: serviceResponse.nextQuestion,
      timestamp: new Date()
    });
  }

  interview.updatedAt = new Date();
  interviews[id] = interview;

  res.status(200).json(interview);
});

// @desc    Get completed interview debrief
// @route   GET /api/interviews/:id/debrief
// @access  Public
export const getDebrief = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const interview = interviews[id];

  if (!interview) {
    res.status(404);
    throw new Error('Interview session not found');
  }

  if (interview.status !== 'completed') {
    res.status(400);
    throw new Error('Debrief sheet is not ready. The session is still in progress.');
  }

  res.status(200).json({
    track: interview.track,
    debrief: interview.debrief,
    transcript: interview.transcript
  });
});
