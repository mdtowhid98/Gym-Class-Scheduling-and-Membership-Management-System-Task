import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import {verifyToken} from "../utils/jwtUtils";

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access.' });
  }

  token = token.replace('Bearer ', '');

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized access.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized access.' });
  }
};