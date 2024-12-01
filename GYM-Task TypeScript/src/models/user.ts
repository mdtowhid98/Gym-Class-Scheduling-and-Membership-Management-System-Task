import { Schema, model, Document } from 'mongoose';
import { UserDocument } from '../types';

const userSchema = new Schema<UserDocument>({
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

export const User = model<UserDocument>('User', userSchema);