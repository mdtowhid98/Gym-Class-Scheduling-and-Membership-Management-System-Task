import { Schema, model } from 'mongoose';
import { ClassDocument } from '../types';

const classSchema = new Schema<ClassDocument>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  duration: {
    type: Number,
    default: 120,
    validate: {
      validator: (value: number) => value === 120,
      message: 'Class duration must be exactly 2 hours (120 minutes)',
    },
  },
  trainer: { type: Schema.Types.ObjectId, ref: 'Trainer', required: true },
  trainees: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: function(this: ClassDocument) {
        return this.trainees.length <= 10;
      },
      message: 'Class cannot have more than 10 trainees',
    },
  }],
}, {
  timestamps: true,
});

export const Class = model<ClassDocument>('Class', classSchema);