import jwt from 'jsonwebtoken';
import { config } from '../config';
import { JwtPayload } from 'index';

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwtSecret) as JwtPayload;
};