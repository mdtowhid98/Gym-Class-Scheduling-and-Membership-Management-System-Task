import { Schema, model } from 'mongoose';
import { BookingDocument } from '../types';

const bookingSchema = new Schema<BookingDocument>({
  class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  trainee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Booking = model<BookingDocument>('Booking', bookingSchema);