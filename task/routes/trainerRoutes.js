const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');

// Route for getting all trainers
router.get('/', trainerController.getTrainers);

// Route for creating a new trainer
router.post('/', trainerController.addTrainer);

// Route for getting a specific trainer by ID
router.get('/:id', trainerController.getTrainerById);

// Route for updating a trainer's details
router.put('/:id', trainerController.updateTrainer);

// Route for deleting a trainer by ID
router.delete('/:id', trainerController.deleteTrainer);

module.exports = router;
