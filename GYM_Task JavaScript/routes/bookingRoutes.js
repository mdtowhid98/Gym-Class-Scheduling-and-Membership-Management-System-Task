const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { isTrainee } = require('../middlewares/roleMiddleware');
const bookingController = require('../controllers/bookingController');

router.post('/', protect, isTrainee, bookingController.createBooking);
router.get('/trainee', protect, isTrainee, bookingController.getBookingsByTrainee);
router.get('/class/:classId', protect, bookingController.getBookingsByClass);
router.delete('/:bookingId', protect, isTrainee, bookingController.cancelBooking);

module.exports = router;