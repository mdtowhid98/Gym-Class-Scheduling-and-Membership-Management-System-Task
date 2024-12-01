const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/jwtUtils');

// Register a new user (Trainee only)
const registerUser = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, fullName, role: 'trainee' });

    await user.save();
    const token = generateToken(user._id);

    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

module.exports = { registerUser, loginUser };

