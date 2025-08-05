const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'doctor', 'nurse', 'patient'],
    required: true,
    default: 'patient'
  },
  // Add these two fields for forgot password feature
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpire: {
    type: Date,
    default: null
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
