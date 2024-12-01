import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import {generateToken} from "../utils/jwtUtils";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, fullName } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, fullName, role: 'trainee' });

    await user.save();
    const token = generateToken(user._id.toString());

    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  const { email, password, fullName } = req.body;

  try {
    const adminExists = await User.findOne({ email });
    if (adminExists) {
      res.status(400).json({ message: 'Admin user already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      email,
      password: hashedPassword,
      fullName,
      role: 'admin'
    });

    await admin.save();
    const token = generateToken(admin._id.toString());

    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin user' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    const token = generateToken(user._id.toString());
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};