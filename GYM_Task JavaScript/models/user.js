const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['trainee', 'trainer', 'admin'],
    default: 'trainee',
  },
});

// Create and export the user model
const User = mongoose.model('User', userSchema);
module.exports = User;



