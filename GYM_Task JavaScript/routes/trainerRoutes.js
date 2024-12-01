const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');

// All trainer routes should be protected and accessible only by admin
router.get('/', protect, trainerController.getTrainers);
router.post('/', protect, isAdmin, trainerController.addTrainer);
router.get('/:id', protect, trainerController.getTrainerById);
router.put('/:id', protect, isAdmin, trainerController.updateTrainer);
router.delete('/:id', protect, isAdmin, trainerController.deleteTrainer);

module.exports = router;