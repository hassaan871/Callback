import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  tokenHash: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900 // 15 minutes TTL
  }
}, { timestamps: false });

const Token = mongoose.model('Token', tokenSchema);
export default Token;
