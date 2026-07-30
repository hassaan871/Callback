import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['ai', 'user'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const DebriefSchema = new mongoose.Schema({
  pace: {
    type: Number, // Words per minute
    default: 0
  },
  fillers: {
    type: Number, // Count of filler words
    default: 0
  },
  structure: {
    type: String, // e.g., 'STAR ✓', 'Non-STAR'
    default: ''
  },
  depth: {
    type: String, // e.g., 'deep', 'shallow'
    default: ''
  },
  score: {
    type: Number, // Out of 100 or 10
    default: 0
  }
});

const InterviewSchema = new mongoose.Schema({
  track: {
    type: String,
    required: [true, 'Interview track is required'],
    enum: ['Backend', 'Frontend', 'DevOps / SRE', 'Data Engineering', 'ML / AI', 'System Design', 'Behavioral']
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed'],
    default: 'in-progress'
  },
  transcript: [MessageSchema],
  debrief: DebriefSchema
}, {
  timestamps: true
});

const Interview = mongoose.model('Interview', InterviewSchema);

export default Interview;
