import { Schema, model } from 'mongoose';
import { TrainerDocument } from '../types';

const trainerSchema = new Schema<TrainerDocument>({
  name: { type: String, required: true },
  experience: { type: Number, required: true },
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
});

export const Trainer = model<TrainerDocument>('Trainer', trainerSchema);