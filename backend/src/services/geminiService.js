import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI client if API Key is available
const getGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('Warning: GEMINI_API_KEY is not configured. Running in Mock fallback mode.');
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// Simple helper to count words in transcript messages
const analyzeResponsePace = (transcript) => {
  const userMessages = transcript.filter(m => m.role === 'user');
  if (!userMessages.length) return 130; // Default WPM
  
  const totalWords = userMessages.reduce((sum, msg) => sum + msg.text.split(/\s+/).length, 0);
  // Simulating WPM calculations (in real usage, you'd calculate against speech timestamps)
  return Math.floor(Math.max(90, Math.min(160, totalWords * 0.85 + Math.random() * 20)));
};

// Simple helper to count typical filler words (e.g., um, like, uh, basically)
const countFillerWords = (transcript) => {
  const userMessages = transcript.filter(m => m.role === 'user');
  if (!userMessages.length) return 0;
  
  const text = userMessages.map(m => m.text.toLowerCase()).join(' ');
  const fillers = ['um', 'like', 'uh', 'basically', 'actually', 'sort of'];
  let count = 0;
  fillers.forEach(filler => {
    const regex = new RegExp(`\\b${filler}\\b`, 'g');
    const matches = text.match(regex);
    if (matches) count += matches.length;
  });
  return count;
};

/**
 * Generates the first technical question based on the selected role/track
 */
export const generateFirstQuestion = async (track) => {
  const aiClient = getGenAIClient();
  
  if (!aiClient) {
    // Offline/Fallback Mock starting questions
    const mockQuestions = {
      'Backend': 'Walk me through a production database incident you faced. How did you diagnose it, and what was your fix?',
      'Frontend': 'How do you optimize render performance in a large-scale React SPA where a deep node in the tree triggers state changes?',
      'DevOps / SRE': 'Walk me through a production cascading failure you handled. What was the root cause and how did you restore service?',
      'Data Engineering': 'Explain how you design a pipeline to handle late-arriving data in an hourly streaming partition framework.',
      'ML / AI': 'How do you handle feature drift in a production recommendation engine, and how do you retrain without downtime?',
      'System Design': 'How would you design a distributed, real-time rate limiter for a public API that supports 100k requests/sec?',
      'Behavioral': 'Tell me about a time you had a strong technical disagreement with a team lead. How did you resolve it, and what was the outcome?'
    };
    return mockQuestions[track] || 'Tell me about your background and a challenging project you owned recently.';
  }

  try {
    const prompt = `You are a senior tech lead mock interviewer. Ask one challenging, realistic first question for the following track: "${track}". The question must test real production scenarios, ownership, or deep architecture. Keep it to one or two clear sentences. Do not add conversational intro text.`;
    
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error('Gemini starting question generation error:', error);
    return 'Walk me through a production incident you were paged for. What did you own, and what would you change now?';
  }
};

/**
 * Handles generating either a challenging follow-up question or a final debrief scorecard.
 */
export const generateFollowUpOrDebrief = async (track, transcript) => {
  // Count how many user responses we have processed
  const userAnswersCount = transcript.filter(m => m.role === 'user').length;
  const maxAnswers = 3; // Number of response iterations before completing the interview

  if (userAnswersCount >= maxAnswers) {
    // Generate final evaluation
    const debrief = await generateScorecard(track, transcript);
    return {
      shouldComplete: true,
      debrief
    };
  }

  // Otherwise, ask a follow-up question
  const nextQuestion = await generateFollowUpQuestion(track, transcript);
  return {
    shouldComplete: false,
    nextQuestion
  };
};

/**
 * Prompt Gemini to push back on vague answers or dig deeper into technical choices
 */
const generateFollowUpQuestion = async (track, transcript) => {
  const aiClient = getGenAIClient();
  const conversationHistory = transcript.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n');

  if (!aiClient) {
    return `That sounds interesting. But before we move forward, how did you verify that was the root cause and not just a symptom under heavy load?`;
  }

  try {
    const prompt = `You are a senior tech lead running a mock interview for the track: "${track}". 
Here is the conversation history so far:
${conversationHistory}

Based on the user's latest response, ask a sharp follow-up question.
Rules:
- If the user's answer was vague, call out the ambiguity and push back (e.g., "how did you measure that?", "what other alternatives did you evaluate?").
- If their answer was solid, proceed to the next logical stage of their incident/design (e.g., "what happens if that component fails?").
- Ask ONLY one follow-up question. Max 2 sentences. No extra chitchat.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error('Gemini follow-up generation error:', error);
    return 'Before the rollback — how did you confirm that action was the cause, and not a concurrent database locking spike?';
  }
};

/**
 * Prompt Gemini to perform a final structured analysis of the transcript
 */
const generateScorecard = async (track, transcript) => {
  const aiClient = getGenAIClient();
  
  // Calculate raw metrics locally
  const pace = analyzeResponsePace(transcript);
  const fillers = countFillerWords(transcript);

  if (!aiClient) {
    // Offline Mock Debrief Scorecard
    return {
      pace,
      fillers,
      structure: 'STAR ✓',
      depth: 'deep',
      score: 82
    };
  }

  try {
    const conversationHistory = transcript.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n');
    const prompt = `You are a senior hiring panel evaluator. Analyze this mock interview transcript for the "${track}" track:
${conversationHistory}

Evaluate the user's performance along these lines:
1. "structure": Was it structured logically (like the STAR method: Situation, Task, Action, Result)? Respond with "STAR ✓" or "No-STAR".
2. "depth": Did the answers contain real engineering depth (specific metrics, API naming, configuration properties), or stayed surface-level? Respond with "deep" or "shallow".
3. "score": An integer score out of 100 representing the clarity, depth, and communication skill.

Return your evaluation as a JSON object inside a single markdown code block with fields: "structure", "depth", "score".
Do not write explanations, return ONLY the JSON block.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    // Extract JSON block from output
    const jsonMatch = response.text.match(/\{[\s\S]*?\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        pace,
        fillers,
        structure: parsed.structure || 'STAR ✓',
        depth: parsed.depth || 'deep',
        score: Number(parsed.score) || 75
      };
    }
    
    return { pace, fillers, structure: 'STAR ✓', depth: 'deep', score: 75 };
  } catch (error) {
    console.error('Gemini scorecard analysis error:', error);
    return { pace, fillers, structure: 'STAR ✓', depth: 'shallow', score: 70 };
  }
};
