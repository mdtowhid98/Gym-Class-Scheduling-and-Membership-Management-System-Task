import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware';
import { isTrainee } from '../middlewares/roleMiddleware';
import {
    createBooking,
    getBookingsByTrainee,
    getBookingsByClass,
    cancelBooking
} from '../controllers/bookingController';

const router = Router();

router.post('/', protect, isTrainee, createBooking);
router.get('/trainee', protect, isTrainee, getBookingsByTrainee);
router.get('/class/:classId', protect, getBookingsByClass);
router.delete('/:bookingId', protect, isTrainee, cancelBooking);

export default router;