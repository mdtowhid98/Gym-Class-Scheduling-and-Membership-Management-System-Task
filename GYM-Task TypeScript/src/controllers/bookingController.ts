import { Response, NextFunction } from 'express';
import { Booking } from '../models/booking';
import { Class } from '../models/class';
import { BookingLimitError, ValidationError } from '../utils/errors';
import {AuthRequest} from "../middlewares/authMiddleware";

export const createBooking = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { classId } = req.body;
        const traineeId = req.user?._id;

        const classData = await Class.findById(classId);
        if (!classData) {
            throw new ValidationError('Class not found');
        }

        if (classData.trainees.length >= 10) {
            throw new BookingLimitError('Class is already full');
        }

        const existingBooking = await Booking.findOne({
            class: classId,
            trainee: traineeId
        });

        if (existingBooking) {
            throw new ValidationError('You have already booked this class');
        }

        const booking = new Booking({
            class: classId,
            trainee: traineeId
        });

        await booking.save();
        classData.trainees.push(traineeId);
        await classData.save();

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: booking
        });
    } catch (error) {
        next(error);
    }
};

export const getBookingsByTrainee = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const traineeId = req.user?._id;
        const bookings = await Booking.find({ trainee: traineeId })
            .populate('class')
            .populate('trainee', '-password');

        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        next(error);
    }
};

export const getBookingsByClass = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { classId } = req.params;
        const bookings = await Booking.find({ class: classId })
            .populate('trainee', '-password');

        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        next(error);
    }
};

export const cancelBooking = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { bookingId } = req.params;
        const traineeId = req.user?._id;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            throw new ValidationError('Booking not found');
        }

        if (booking.trainee.toString() !== traineeId?.toString()) {
            throw new ValidationError('Not authorized to cancel this booking');
        }

        const classData = await Class.findById(booking.class);
        if (classData) {
            classData.trainees = classData.trainees.filter(
                id => id.toString() !== traineeId?.toString()
            );
            await classData.save();
        }

        await Booking.findByIdAndDelete(bookingId);

        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully'
        });
    } catch (error) {
        next(error);
    }
};