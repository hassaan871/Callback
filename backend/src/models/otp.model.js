import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  otpHash: {
    type: String,
    required: true
  },
  attempts: {
    type: Number,
    default: 0,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900 // 15 minutes TTL
  }
}, { timestamps: false });

const OTP = mongoose.model('OTP', otpSchema);
export default OTP;
