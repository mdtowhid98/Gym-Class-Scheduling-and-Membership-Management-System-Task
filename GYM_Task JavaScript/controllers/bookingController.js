const Booking = require('../models/booking');
const Class = require('../models/class');
const { BookingLimitError, ValidationError } = require('../utils/errors');

const createBooking = async (req, res, next) => {
    try {
        const { classId } = req.body;
        const traineeId = req.user._id;

        const classData = await Class.findById(classId);
        if (!classData) {
            throw new ValidationError('Class not found');
        }

        if (classData.trainees.length >= 10) {
            throw new BookingLimitError('Class is already full');
        }

        // Check if trainee is already booked
        const existingBooking = await Booking.findOne({
            class: classId,
            trainee: traineeId
        });

        if (existingBooking) {
            throw new ValidationError('You have already booked this class');
        }

        // Create booking and update class
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

const getBookingsByTrainee = async (req, res, next) => {
    try {
        const traineeId = req.user._id;
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

const getBookingsByClass = async (req, res, next) => {
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

const cancelBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const traineeId = req.user._id;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            throw new ValidationError('Booking not found');
        }

        if (booking.trainee.toString() !== traineeId.toString()) {
            throw new ValidationError('Not authorized to cancel this booking');
        }

        // Remove trainee from class
        const classData = await Class.findById(booking.class);
        classData.trainees = classData.trainees.filter(
            id => id.toString() !== traineeId.toString()
        );
        await classData.save();

        await booking.remove();

        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBooking,
    getBookingsByTrainee,
    getBookingsByClass,
    cancelBooking
};